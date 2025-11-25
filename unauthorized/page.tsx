// app/unauthorized/page.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UnauthorizedPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      const userRole = user.publicMetadata?.role as string;
      // Redirect to appropriate dashboard after a delay
      const timer = setTimeout(() => {
        switch (userRole) {
          case 'student':
            router.push('/student/dashboard');
            break;
          case 'tutor':
            router.push('/tutor/dashboard');
            break;
          case 'school-admin':
            router.push('/dashboard');
            break;
          case 'super-admin':
            router.push('/super-admin/dashboard');
            break;
          default:
            router.push('/student/dashboard');
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <p className="text-muted-foreground mt-2">
          Redirecting you to your dashboard...
        </p>
      </div>
    </div>
  );
}
