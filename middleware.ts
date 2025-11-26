import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
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

// Define role-based dashboard routes
const isDashboardRoute = createRouteMatcher([
  '/dashboards/student(.*)',
  '/dashboards/tutor(.*)',
  '/dashboards/school-admin(.*)',
  '/dashboards/super-admin(.*)',
]);

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();
  const pathname = req.nextUrl.pathname;

  // Allow public routes to pass through
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
  if (isDashboardRoute(req)) {
    // Get user role from Clerk public metadata
    const userRole = (sessionClaims?.publicMetadata as { role?: string })?.role;

    // Extract the role from the dashboard path
    const dashboardRole = pathname.split('/dashboards/')[1]?.split('/')[0];

    // If user doesn't have a role yet, redirect to complete signup
    if (!userRole) {
      const completeSignupUrl = new URL('/complete-signup', req.url);
      return NextResponse.redirect(completeSignupUrl);
    }

    // Normalize roles for comparison (handle both formats: 'student' and 'STUDENT')
    const normalizedUserRole = userRole.toLowerCase().replace(/_/g, '-');
    const normalizedDashboardRole = dashboardRole
      ?.toLowerCase()
      .replace(/_/g, '-');

    // Check if user is accessing the correct dashboard for their role
    if (normalizedUserRole !== normalizedDashboardRole) {
      // Redirect to the correct dashboard based on user role
      const correctDashboard = `/dashboards/${normalizedUserRole}`;
      return NextResponse.redirect(new URL(correctDashboard, req.url));
    }
  }

  // Default: allow request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
