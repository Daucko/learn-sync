import { NextRequest, NextResponse } from 'next/server';
import { googleOAuthClient } from '@/lib/google-auth';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const role = searchParams.get('role') || 'STUDENT';
    const organizationId = searchParams.get('organizationId');

    // State will contain the role and organizationId to maintain context after callback
    const state = JSON.stringify({
        role,
        organizationId,
    });

    const authorizeUrl = googleOAuthClient.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ],
        state: Buffer.from(state).toString('base64'),
    });

    return NextResponse.redirect(authorizeUrl);
}
