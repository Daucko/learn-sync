import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signToken, setSessionCookie } from '@/lib/auth-utils';
import z, { zodErrorMessage } from '@/lib/validators';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const schema = z.object({
            email: z.string().email(),
            code: z.string().length(6),
        });

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: zodErrorMessage(parsed.error) },
                { status: 400 }
            );
        }

        const { email, code } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (user.verificationCode !== code) {
            return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
        }

        if (user.verificationExpires && user.verificationExpires < new Date()) {
            return NextResponse.json({ error: 'Verification code expired' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                emailVerified: true,
                verificationCode: null,
                verificationExpires: null,
            },
        });

        const token = await signToken({
            userId: updatedUser.id,
            email: updatedUser.email,
            role: updatedUser.role,
        });

        await setSessionCookie(token);

        return NextResponse.json({
            message: 'Email verified successfully',
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                fullName: updatedUser.fullName,
                role: updatedUser.role,
            },
        });
    } catch (err) {
        console.error('Verification error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
