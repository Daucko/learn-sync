'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import LearnSync from '@/components/assets/LearnSync-logo (2).png';

import Link from 'next/link';
import { SignIn, SignInButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('student');

  const { isSignedIn, user } = useUser();

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
          let body: any = null;
          try {
            body = await res.json();
          } catch (_) {
            /* ignore */
          }
          // If role mismatch, send user back to the sign-in page
          if (body?.error === 'ROLE_MISMATCH') {
            // clear preferred role and redirect to sign-in
            sessionStorage.removeItem('preferredRole');
            window.location.href = '/login';
            return;
          }
          console.error('Failed to ensure app user', body);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [isSignedIn, user]);

  return (
    <div className="relative flex h-screen w-full flex-col lg:flex-row items-center justify-center bg-white dark:bg-background-dark overflow-x-hidden">
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
          <header className="absolute top-0 left-0 right-0 z-10 p-6 md:px-10 md:py-5">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              {/* <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                <div className="size-6 text-secondary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                  LearnSync
                </h2>
              </div> */}

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
          <div className="flex flex-col items-center pb-8 mt-10">
            {/* <LearnSyncLogo /> */}
            <h1 className="text-text-primary dark:text-white text-3xl font-bold leading-tight text-center mt-4">
              Login to LearnSync
            </h1>
          </div>

          {/* Login Form */}
          <div className="flex flex-col w-full gap-6">
            {/* Role Selection Tabs */}
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
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
            <div className="mt-4 w-full">
              <SignIn routing="path" path="/login" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// function LearnSyncLogo() {
//   return (
//     <svg
//       className="h-10 w-auto text-text-primary dark:text-white"
//       fill="none"
//       viewBox="0 0 148 32"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M24.8732 3.168V31.5H19.5092V8.064L14.7172 10.44V5.688L24.3152 1.32H24.8732V3.168Z"
//         fill="currentColor"
//       ></path>
//       <path
//         d="M42.4841 31.5H30.8201V26.616H36.3241V1.32H42.4841V31.5Z"
//         fill="currentColor"
//       ></path>
//       <path
//         d="M57.9448 31.5H46.2808V1.32H57.9448V6.264H52.4408V13.392H57.3848V18.144H52.4408V26.616H57.9448V31.5Z"
//         fill="currentColor"
//       ></path>
//       <path
//         d="M78.6828 22.848C78.6828 26.064 77.4108 28.536 74.9548 30.144C72.4988 31.752 69.4268 32.556 65.8268 32.556C62.2268 32.556 59.1948 31.752 56.7788 30.144C54.3628 28.536 53.1548 26.064 53.1548 22.848V1.32H59.3148V22.296C59.3148 23.952 59.8348 25.128 60.8748 25.824C61.9148 26.496 63.4508 26.832 65.4788 26.832C69.5108 26.832 72.5028 25.2 72.5028 21.936V1.32H78.6828V22.848Z"
//         fill="currentColor"
//       ></path>
//       <path
//         d="M96.7905 31.5H85.1265V1.32H96.7905V6.264H91.2865V13.392H96.2305V18.144H91.2865V26.616H96.7905V31.5Z"
//         fill="currentColor"
//       ></path>
//       <path
//         d="M110.121 16.416L116.105 1.32H123.017L114.245 22.128L114.725 23.328L124.649 31.5H117.221L110.477 22.248L103.733 31.5H96.305L106.229 23.328L106.709 22.128L97.937 1.32H104.849L110.121 16.416Z"
//         fill="currentColor"
//       ></path>
//       <path
//         d="M141.597 19.344C139.797 19.344 138.393 18.792 137.385 17.688C136.377 16.56 135.873 15.048 135.873 13.152C135.873 11.232 136.377 9.72 137.385 8.616C138.393 7.512 139.797 6.96 141.597 6.96C143.397 6.96 144.792 7.512 145.8 8.616C146.808 9.72 147.312 11.232 147.312 13.152C147.312 15.048 146.808 16.56 145.8 17.688C144.792 18.792 143.397 19.344 141.597 19.344C141.597 31.5C138.597 31.5 136.065 30.876 134.001 29.628C131.937 28.38 130.401 26.664 129.393 24.48L134.781 22.296C135.333 23.808 136.353 25.02 137.841 25.932C139.329 26.82 140.757 27.264 142.125 27.264C144.661 27.264 146.541 26.472 147.765 24.888C148.989 23.304 149.601 21.096 149.601 18.264V17.064C148.497 18.432 146.949 19.344 145.029 19.8C143.109 20.256 141.069 20.484 138.909 20.484C135.309 20.484 132.277 19.668 129.813 18.036C127.349 16.404 126.117 13.992 126.117 10.8C126.117 7.584 127.349 5.148 129.813 3.492C132.277 1.836 135.309 1 138.909 1C142.221 1 144.933 1.776 147.045 3.336C149.157 4.872 150.213 6.96 150.213 9.6H144.229C144.229 8.232 143.697 7.2 142.633 6.504C141.569 5.808 140.141 5.46 138.341 5.46C135.925 5.46 134.125 6.3 132.941 7.98C131.757 9.636 131.165 11.784 131.165 14.424V14.736C131.165 17.568 131.909 19.728 133.397 21.216C134.885 22.704 137.133 23.448 140.141 23.448C142.253 23.448 144.053 22.956 145.541 21.972C147.029 20.988 148.073 19.656 148.685 17.976H141.597V12.792H153.285V31.5H147.921L147.312 28.704C146.208 30.072 144.661 31.02 142.677 31.548C140.693 32.076 138.561 32.34 136.281 32.34C136.281 32.34 141.597 31.5 141.597 31.5Z"
//         fill="#F39C12"
//       ></path>
//     </svg>
//   );
// }
