import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth-utils';
import z, { zodErrorMessage } from '@/lib/validators';
import { UserRole } from '@prisma/client';
import { sendVerificationEmail } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const schema = z.object({
            email: z.string().email(),
            password: z.string().min(8),
            fullName: z.string().min(1),
            role: z.string(),
            organizationName: z.string().optional(),
            organizationEmail: z.string().optional(),
            organizationPhone: z.string().optional(),
            organizationAddress: z.string().optional(),
            organizationId: z.string().optional(),
        });

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: zodErrorMessage(parsed.error) },
                { status: 400 }
            );
        }

        const {
            email,
            password,
            fullName,
            role,
            organizationName,
            organizationEmail,
            organizationPhone,
            organizationAddress,
            organizationId: providedOrgId,
        } = parsed.data;

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

        let organizationId = providedOrgId;

        if (normalizedRole === 'SCHOOL_ADMIN' && organizationName) {
            const org = await prisma.organization.create({
                data: {
                    name: organizationName,
                    email: organizationEmail,
                    phone: organizationPhone,
                    address: organizationAddress,
                },
            });
            organizationId = org.id;
        }

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                fullName,
                role: normalizedRole,
                verificationCode,
                verificationExpires,
                organizationId,
            },
        });

        // Send verification email
        await sendVerificationEmail(email, verificationCode, fullName);

        return NextResponse.json({
            message: 'Registration successful. Please verify your email.',
            email,
        });
    } catch (err) {
        console.error('Registration error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
