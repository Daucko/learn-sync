// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Create route matchers
const isPublicRoute = createRouteMatcher([
  '/signup(.*)',
  '/login(.*)',
  '/verify-email(.*)',
  '/api/webhook/clerk(.*)',
  '/unauthorized',
]);

const isProtectedRoute = createRouteMatcher([
  '/student(.*)',
  '/tutor(.*)',
  '/school-admin(.*)',
  '/super-admin(.*)',
  '/dashboard(.*)',
  '/api/protected(.*)',
]);

// Role-based route matchers
const isStudentRoute = createRouteMatcher(['/student(.*)']);
const isTutorRoute = createRouteMatcher(['/tutor(.*)']);
const isSchoolAdminRoute = createRouteMatcher([
  '/school-admin(.*)',
  '/dashboard(.*)',
]);
const isSuperAdminRoute = createRouteMatcher(['/super-admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If the user isn't signed in and the route is protected, redirect to sign-in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // If the user is signed in and on a public route, redirect based on role
  if (userId && isPublicRoute(req)) {
    // We can't access user metadata in middleware, so redirect to a role detection page
    // or the default student dashboard
    return Response.redirect(new URL('/detect-role', req.url));
  }

  // For protected routes, we'll handle role-based access in the client components
  // since middleware doesn't have easy access to user metadata
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
