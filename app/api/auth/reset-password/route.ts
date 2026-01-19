import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { hashPassword } from '@/lib/auth-utils';
import { z } from 'zod';

const resetPasswordSchema = z.object({
    token: z.string(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = resetPasswordSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json(
                { error: 'Invalid data provided' },
                { status: 400 }
            );
        }

        const { token, password } = validatedData.data;

        // Hash the token to compare with DB
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Find user with valid token and not expired
        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken,
                resetPasswordExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid or expired password reset token' },
                { status: 400 }
            );
        }

        // Hash new password
        const passwordHash = await hashPassword(password);

        // Update user
        await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordHash,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
        });

        return NextResponse.json({ message: 'Password has been reset successfully' });

    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}
