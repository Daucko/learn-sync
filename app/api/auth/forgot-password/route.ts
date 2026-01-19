import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/mail';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = forgotPasswordSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        const { email } = validatedData.data;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // If user not found, strictly we shouldn't reveal it, but standard UX practice often does.
        // However, to prevent enumeration, we can return success even if user not found, 
        // or just say "If an account exists, an email has been sent."
        if (!user) {
            // Return 200 to prevent email enumeration
            return NextResponse.json({
                message: 'If an account exists with this email, a password reset link has been sent.'
            }, { status: 200 });
        }

        // Generate token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash token for storage
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Set expiry (e.g., 1 hour)
        const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

        // Update user
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken,
                resetPasswordExpires,
            },
        });

        // Send email with the RAW token (not hashed)
        // The link will be /reset-password?token=RAW_TOKEN
        await sendPasswordResetEmail(email, resetToken, user.fullName || 'User');

        return NextResponse.json({
            message: 'If an account exists with this email, a password reset link has been sent.'
        }, { status: 200 });

    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}
