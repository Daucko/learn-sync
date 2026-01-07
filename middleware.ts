import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-for-development-replace-in-production'
);

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/signup',
  '/verify-email',
  '/oauth-callback',
  '/complete-signup',
];

const PUBLIC_API_ROUTES = [
  '/api/auth/register',
  '/api/auth/login',
  '/api/auth/verify',
  '/api/auth/me',
  '/api/auth/logout',
  '/api/auth/ensure',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow file requests and _next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.includes('favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Allow public routes
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));
  const isPublicApiRoute = PUBLIC_API_ROUTES.some((route) => pathname.startsWith(route));

  if (isPublicRoute || isPublicApiRoute) {
    return NextResponse.next();
  }

  const token = req.cookies.get('session')?.value;

  if (!token) {
    const url = new URL('/login', req.url);
    url.searchParams.set('returnBackUrl', pathname);
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userRole = payload.role as string;

    // Handle dashboard routes with role-based access control
    if (pathname.startsWith('/dashboards')) {
      const dashboardRole = pathname.split('/dashboards/')[1]?.split('/')[0];

      if (!userRole) {
        return NextResponse.redirect(new URL('/signup', req.url));
      }

      // Normalize roles for comparison
      const normalizedUserRole = userRole.toLowerCase().replace(/_/g, '-');
      const normalizedDashboardRole = dashboardRole
        ?.toLowerCase()
        .replace(/_/g, '-');

      // Redirect if user is accessing wrong dashboard
      if (normalizedUserRole !== normalizedDashboardRole) {
        const correctDashboard = `/dashboards/${normalizedUserRole}`;
        return NextResponse.redirect(new URL(correctDashboard, req.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    const url = new URL('/login', req.url);
    url.searchParams.set('returnBackUrl', pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
