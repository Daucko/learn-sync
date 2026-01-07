import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.userId as string },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                emailVerified: true,
            },
        });

        if (!user) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        return NextResponse.json({ user });
    } catch (err) {
        console.error('Auth check error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
