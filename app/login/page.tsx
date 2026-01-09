"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import LearnSync from '@/components/assets/LearnSync-logo (2).png';
import Link from 'next/link';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams?.get('error');
  const expectedParam = searchParams?.get('expected');

  const tabs = [
    { id: 'student', label: 'Student' },
    { id: 'tutor', label: 'Tutor' },
    { id: 'school-admin', label: 'School Admin' },
    { id: 'super-admin', label: 'Super Admin' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ email, password });
    } catch (err: any) {
      if (err.message === 'EMAIL_NOT_VERIFIED') {
        sessionStorage.setItem('pendingVerification', JSON.stringify({ email }));
        router.push('/verify-email');
      } else {
        alert(err.message || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="relative flex w-full flex-col lg:flex-row items-center justify-center bg-white dark:bg-background-dark overflow-x-hidden pt-20">
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
                    className={`flex-1 py-2 px-4 text-center rounded-md font-medium transition-all duration-200 ${activeTab === tab.id
                      ? 'text-text-primary dark:text-gray-300 bg-white dark:bg-gray-700 shadow-sm'
                      : 'text-text-secondary dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Custom Login Form */}
              <div className="mt-4 w-full">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password
                    </label>
                    <Input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      variant="outline"
                      className="w-full h-10 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => window.location.href = '/api/auth/google'}
                    >
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Google
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
