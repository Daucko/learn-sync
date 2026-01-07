import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth-utils';
import z, { zodErrorMessage } from '@/lib/validators';
import { UserRole } from '@prisma/client';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const schema = z.object({
            email: z.string().email(),
            password: z.string().min(8),
            fullName: z.string().min(1),
            role: z.string(),
        });

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: zodErrorMessage(parsed.error) },
                { status: 400 }
            );
        }

        const { email, password, fullName, role } = parsed.data;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        const passwordHash = await hashPassword(password);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        const normalizedRole = role.replace(/-/g, '_').toUpperCase() as UserRole;

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                fullName,
                role: normalizedRole,
                verificationCode,
                verificationExpires,
            },
        });

        // In a real app, send email here. For now, we'll just log it.
        console.log(`Verification code for ${email}: ${verificationCode}`);

        return NextResponse.json({
            message: 'Registration successful. Please verify your email.',
            email,
        });
    } catch (err) {
        console.error('Registration error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
