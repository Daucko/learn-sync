'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
// removed unused BookOpen import
import { ThemeToggle } from '@/components/theme-toggle';
import LearnSync from '@/components/assets/LearnSync-logo (2).png';

import Link from 'next/link';
import { SignIn, useUser } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('student');

  const { isSignedIn, user } = useUser();
  const searchParams = useSearchParams();
  const errorParam = searchParams?.get('error');
  const expectedParam = searchParams?.get('expected');

  const tabs = [
    { id: 'student', label: 'Student', redirect: '/dashboards/student' },
    { id: 'tutor', label: 'Tutor', redirect: '/dashboards/tutor' },
    {
      id: 'school-admin',
      label: 'School Admin',
      redirect: '/dashboards/school-admin',
    },
    {
      id: 'super-admin',
      label: 'Super Admin',
      redirect: '/dashboards/super-admin',
    },
  ];

  // persist preferred role so we can set it on the server after sign-in
  useEffect(() => {
    sessionStorage.setItem('preferredRole', activeTab);
  }, [activeTab]);

  // when user signs in, call backend to ensure app user exists and assign role if provided
  useEffect(() => {
    if (!isSignedIn || !user) return;

    const preferredRole = sessionStorage.getItem('preferredRole') || 'student';

    // call backend to ensure app user exists; backend will use Clerk auth to get clerkId
    (async () => {
      try {
        const res = await fetch('/api/auth/ensure', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: preferredRole }),
        });
        if (res.ok) {
          const data = await res.json();
          // redirect to role dashboard
          const role = data.user?.role || preferredRole;
          const mapping: Record<string, string> = {
            student: '/dashboards/student',
            tutor: '/dashboards/tutor',
            'school-admin': '/dashboards/school-admin',
            'super-admin': '/dashboards/super-admin',
          };
          // Normalize role coming from server: e.g. 'STUDENT' or 'SCHOOL_ADMIN'
          const normalizedRole = String(role).toLowerCase().replace(/_/g, '-');
          window.location.href = mapping[normalizedRole] ?? '/';
        } else {
          // try to get detailed error
          let body: unknown = null;
          try {
            body = await res.json();
          } catch (_) {
            /* ignore */
          }
          const bodyObj =
            body && typeof body === 'object' && body !== null
              ? (body as Record<string, unknown>)
              : null;
          // If role mismatch, send user back to the sign-in page with details
          if (bodyObj && bodyObj['error'] === 'ROLE_MISMATCH') {
            // clear preferred role and redirect to sign-in with error details
            sessionStorage.removeItem('preferredRole');
            const expectedSlug =
              (bodyObj['expectedSlug'] as string | undefined) ??
              String((bodyObj['expected'] as string | undefined) || '')
                .toLowerCase()
                .replace(/_/g, '-');
            window.location.href = `/login?error=role_mismatch&expected=${encodeURIComponent(
              expectedSlug
            )}`;
            return;
          }
          console.error('Failed to ensure app user', bodyObj);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [isSignedIn, user]);

  // Show role-mismatch message if redirected back to /login with error
  const [roleMismatchNotice, setRoleMismatchNotice] = useState<string | null>(
    null
  );
  useEffect(() => {
    if (errorParam === 'role_mismatch') {
      const expected = expectedParam ?? 'your original role';
      setRoleMismatchNotice(
        `This account is registered as ${expected.replace(
          /-/g,
          ' '
        )}. Please sign in with the correct role or sign up for a new account.`
      );
    }
  }, [errorParam, expectedParam]);

  return (
    <main className="">
      <header className="p-6 md:px-10 md:py-5 border border-red-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Image
            src={LearnSync}
            alt="LearnSync Logo"
            width={150}
            height={50}
            className="object-cover"
          />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="hidden text-sm text-gray-600 dark:text-gray-400 sm:inline">
              Don't have an account?
            </span>
            <Link href="/signup">
              <Button
                variant="outline"
                size="sm"
                className="h-9 bg-primary hover:bg-primary/90"
              >
                SignUp
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="relative flex w-full flex-col lg:flex-row items-center justify-center bg-white dark:bg-background-dark overflow-x-hidden">
        {/* Left Side - Brand Section */}
        <div className="hidden lg:flex flex-col items-center justify-center w-full lg:w-1/2 p-8 bg-background-light dark:bg-gray-900 h-full">
          <div className="max-w-md text-center">
            <h2 className="text-text-primary dark:text-white text-4xl font-bold leading-tight mb-4">
              Empowering Education, Connecting Futures.
            </h2>
            <p className="text-text-secondary dark:text-gray-300 text-lg leading-relaxed">
              LearnSync is dedicated to streamlining academic administration and
              enhancing the learning experience for students, tutors, and
              administrators alike. Join our community to unlock your potential.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 h-full dark:bg-gray-900 ">
          <div className="w-full max-w-sm flex flex-col items-center justify-center">
            {/* Logo */}

            {/* <div className="flex flex-col items-center pb-8 mt-10">
            <h1 className="text-text-primary dark:text-white text-3xl font-bold leading-tight text-center mt-4">
              Login to LearnSync
            </h1>
          </div> */}

            {/* Login Form */}
            <div className="flex flex-col w-full gap-6">
              {roleMismatchNotice && (
                <div className="mb-4 rounded-md border border-rose-400 bg-rose-50 p-3 text-sm text-rose-800">
                  {roleMismatchNotice}
                </div>
              )}
              {/* Role Selection Tabs */}
              <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm border border-red-500">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 px-4 text-center rounded-md font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'text-text-primary dark:text-gray-300 bg-white dark:bg-gray-700 shadow-sm'
                        : 'text-text-secondary dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Embedded Clerk SignIn */}
              <div className="mt-4 w-full border border-red-500">
                <SignIn routing="path" path="/login" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
