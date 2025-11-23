import { NextResponse } from 'next/server';

// Clerk will redirect SSO/OAuth providers back to a callback path under
// the sign-in route (e.g. `/login/sso-callback`). If Next returns 404 for
// that path the SSO flow fails. This route simply redirects back to the
// ` /login` page so the client-side Clerk SDK can finish processing.

export async function GET(req: Request) {
  return NextResponse.redirect(new URL('/login', req.url));
}

export async function POST(req: Request) {
  return NextResponse.redirect(new URL('/login', req.url));
}
