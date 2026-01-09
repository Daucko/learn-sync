import { NextRequest, NextResponse } from 'next/server';
import { googleOAuthClient } from '@/lib/google-auth';
import { prisma } from '@/lib/prisma';
import { signToken, setSessionCookie } from '@/lib/auth-utils';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');
    const stateBase64 = searchParams.get('state');

    if (!code || !stateBase64) {
        return NextResponse.redirect(new URL('/login?error=Invalid oauth response', req.url));
    }

    try {
        const state = JSON.parse(Buffer.from(stateBase64, 'base64').toString());
        const { tokens } = await googleOAuthClient.getToken(code);
        googleOAuthClient.setCredentials(tokens);

        // Get user info from Google
        const ticket = await googleOAuthClient.verifyIdToken({
            idToken: tokens.id_token!,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            throw new Error('Invalid Google response');
        }

        const email = payload.email;
        const googleId = payload.sub;
        const fullName = payload.name || null;
        const avatarUrl = payload.picture || null;

        // Find or create user
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    { googleId },
                    { email },
                ],
            },
        });

        if (user) {
            // Update existing user with Google info if not already present
            user = await prisma.user.update({
                where: { id: user.id },
                data: {
                    googleId,
                    avatarUrl: user.avatarUrl || avatarUrl,
                    emailVerified: true,
                    fullName: user.fullName || fullName,
                },
            });
        } else {
            // New user - use role and organizationId from state
            const role = state.role || 'STUDENT';
            const organizationId = state.organizationId || null;

            user = await prisma.user.create({
                data: {
                    email,
                    googleId,
                    fullName,
                    avatarUrl,
                    role,
                    organizationId,
                    emailVerified: true,
                },
            });
        }

        // Generate and set session token
        const token = await signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        await setSessionCookie(token);

        // Redirect to dashboard
        const roleSlug = user.role.toLowerCase().replace(/_/g, '-');
        return NextResponse.redirect(new URL(`/dashboards/${roleSlug}`, req.url));

    } catch (err) {
        console.error('Google OAuth error:', err);
        return NextResponse.redirect(new URL('/login?error=Google authentication failed', req.url));
    }
}
