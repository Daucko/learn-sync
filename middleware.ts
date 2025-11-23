// middleware.js
import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from '@clerk/nextjs/server';

// Create route matchers
const isPublicRoute = createRouteMatcher([
  // Don't include root `/` here — allow signed-in users to view homepage
  '/signup',
  '/login',
  '/verify-email',
  '/api/webhook/clerk',
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

  // If the user is signed in and on a public route, redirect to their role dashboard
  if (userId && isPublicRoute(req)) {
    try {
      const user = await clerkClient.users.getUser(userId);
      const role =
        (user.publicMetadata?.role as string | undefined) ||
        (user.privateMetadata?.role as string | undefined) ||
        (user.unsafeMetadata?.role as string | undefined);

      const target =
        role === 'tutor'
          ? '/tutor'
          : role === 'school-admin'
          ? '/school-admin'
          : role === 'super-admin'
          ? '/super-admin'
          : '/student';

      return Response.redirect(new URL(target, req.url));
    } catch {
      // Fallback if user fetch fails
      return Response.redirect(new URL('/student', req.url));
    }
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
