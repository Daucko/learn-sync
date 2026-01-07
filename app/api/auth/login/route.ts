import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePasswords, signToken, setSessionCookie } from '@/lib/auth-utils';
import z, { zodErrorMessage } from '@/lib/validators';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const schema = z.object({
            email: z.string().email(),
            password: z.string(),
        });

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: zodErrorMessage(parsed.error) },
                { status: 400 }
            );
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        const isPasswordValid = await comparePasswords(password, user.passwordHash);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        if (!user.emailVerified) {
            return NextResponse.json(
                { error: 'Please verify your email first', emailVerified: false },
                { status: 403 }
            );
        }

        const token = await signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        await setSessionCookie(token);

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
            },
        });
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
