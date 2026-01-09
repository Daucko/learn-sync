// app/verify-email/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers/auth-provider';

export default function VerifyEmail() {
  const { verify, user } = useAuth();
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    // If user is already verified and logged in, redirect
    if (user && user.emailVerified) {
      const roleSlug = user.role.toLowerCase().replace(/_/g, '-');
      router.push(`/${roleSlug}`);
      return;
    }

    // Get email from sessionStorage
    const pendingVerification = sessionStorage.getItem('pendingVerification');
    if (pendingVerification) {
      const data = JSON.parse(pendingVerification);
      setEmail(data.email || '');
    } else if (!user) {
      // If no pending verification and no user, go home
      router.push('/');
    }
  }, [user, router]);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError('');

    try {
      await verify({ email, code });
      sessionStorage.removeItem('pendingVerification');
    } catch (err: unknown) {
      console.error('Error verifying email:', err);
      const errorMessage = err instanceof Error ? err.message : 'Invalid verification code';
      setError(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    alert('Resend functionality not yet implemented in custom auth.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark py-24 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Verify your email
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            We sent a verification code to
          </p>
          <p className="mt-1 font-medium text-gray-900 dark:text-white">
            {email}
          </p>
        </div>

        <form onSubmit={handleVerification} className="space-y-6">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Verification Code
            </label>
            <Input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="w-full text-center text-lg font-mono"
              required
              disabled={isVerifying}
              maxLength={6}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isVerifying || code.length < 6}
            className="w-full bg-primary cursor-pointer h-11 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Verifying...
              </div>
            ) : (
              'Verify Email'
            )}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <button
            onClick={handleResendCode}
            className="text-primary hover:underline text-sm block w-full"
            disabled={isVerifying}
          >
            Didn't receive a code? Resend
          </button>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            Check your spam folder if you don't see the email
          </div>
        </div>
      </div>
    </div>
  );
}
