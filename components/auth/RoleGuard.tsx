// components/auth/RoleGuard.tsx
'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackPath?: string;
}

export function RoleGuard({
  children,
  allowedRoles,
  fallbackPath,
}: RoleGuardProps) {
  const { isLoaded, userId } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isUserLoaded && userId) {
      const userRole = user?.publicMetadata?.role as string;

      if (!userRole || !allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard based on actual role
        const redirectPath =
          getRoleBasedRedirect(userRole) || fallbackPath || '/unauthorized';
        router.push(redirectPath);
      }
    }
  }, [
    isLoaded,
    isUserLoaded,
    userId,
    user,
    allowedRoles,
    router,
    fallbackPath,
  ]);

  if (!isLoaded || !isUserLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!userId) {
    return null;
  }

  const userRole = user?.publicMetadata?.role as string;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function getRoleBasedRedirect(role: string): string {
  switch (role) {
    case 'student':
      return '/student/dashboard';
    case 'tutor':
      return '/tutor/dashboard';
    case 'school-admin':
      return '/dashboard';
    case 'super-admin':
      return '/super-admin/dashboard';
    default:
      return '/student/dashboard';
  }
}
