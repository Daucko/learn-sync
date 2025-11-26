import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/signup(.*)',
  '/verify-email(.*)',
  '/oauth-callback(.*)',
  '/complete-signup(.*)',
  '/api/auth/ensure(.*)',
  '/api/webhooks(.*)',
]);

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();
  const pathname = req.nextUrl.pathname;

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  if (!userId) {
    const signInUrl = new URL('/login', req.url);
    signInUrl.searchParams.set('redirect_url', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Handle dashboard routes with role-based access control
  if (pathname.startsWith('/dashboards')) {
    // Get user role from Clerk public metadata
    const publicMetadata = sessionClaims?.publicMetadata as
      | { role?: string }
      | undefined;
    const userRole = publicMetadata?.role;

    // Extract the role from the dashboard path
    const dashboardRole = pathname.split('/dashboards/')[1]?.split('/')[0];

    // If user doesn't have a role yet, redirect to complete signup
    if (!userRole) {
      return NextResponse.redirect(new URL('/complete-signup', req.url));
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
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
