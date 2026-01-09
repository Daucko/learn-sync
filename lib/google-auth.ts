import { OAuth2Client } from 'google-auth-library';

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectURI = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/google/callback`;

export const googleOAuthClient = new OAuth2Client(
    clientID,
    clientSecret,
    redirectURI
);
