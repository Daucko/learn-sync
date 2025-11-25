// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Create route matchers
const isPublicRoute = createRouteMatcher([
  '/signup(.*)',
  '/login(.*)',
  '/verify-email(.*)',
  '/api/webhook/clerk(.*)',
]);

const isProtectedRoute = createRouteMatcher([
  '/student(.*)',
  '/tutor(.*)',
  '/school-admin(.*)',
  '/api/protected(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If the user isn't signed in and the route is protected, redirect to sign-in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // If the user is signed in and on a public route, redirect to student dashboard
  // We can't fetch user data in middleware, so redirect to a default location
  if (userId && isPublicRoute(req)) {
    return Response.redirect(new URL('/student/dashboard', req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
