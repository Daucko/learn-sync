// app/verify-email/page.tsx
'use client';

import { useSignUp, useSession } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function VerifyEmail() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { session } = useSession();
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is already signed in
    if (session) {
      redirectToRoleDashboard(session.user.unsafeMetadata?.role as string);
      return;
    }

    // Check if there's a pending verification
    const pendingVerification = sessionStorage.getItem('pendingVerification');
    if (!pendingVerification || !isLoaded) {
      router.push('/');
    }
  }, [router, isLoaded, session]);

  // Function to redirect based on user role
  const redirectToRoleDashboard = (role: string) => {
    const basePath = `/${role}`;
    console.log('Redirecting to:', basePath);
    router.push(basePath);
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsVerifying(true);
    setError('');

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === 'complete') {
        // Set the active session
        await setActive({ session: result.createdSessionId });

        // Get the role from pending verification data
        const pendingVerification = sessionStorage.getItem(
          'pendingVerification'
        );
        let userRole = 'student'; // default fallback

        if (pendingVerification) {
          const data = JSON.parse(pendingVerification);
          userRole = data.role || 'student';
        } else {
          // Fallback: try to get role from the sign-up result
          userRole = result.createdUserId ? 'student' : 'student';
        }

        // Clear the pending verification
        sessionStorage.removeItem('pendingVerification');

        // Redirect to role-specific dashboard
        redirectToRoleDashboard(userRole);
      } else {
        setError('Verification failed. Please try again.');
        console.log('Verification incomplete:', result);
      }
    } catch (err: any) {
      console.error('Error verifying email:', err);
      if (err.errors) {
        setError(err.errors[0]?.message || 'Invalid verification code');
      } else {
        setError('An error occurred during verification');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      alert('Verification code sent!');
    } catch (err) {
      console.error('Error resending code:', err);
      alert('Failed to resend code. Please try again.');
    }
  };

  // Get the pending email for display
  const getPendingEmail = () => {
    if (typeof window === 'undefined') return '';
    const pendingVerification = sessionStorage.getItem('pendingVerification');
    if (pendingVerification) {
      const data = JSON.parse(pendingVerification);
      return data.email || '';
    }
    return '';
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
            {getPendingEmail()}
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
            disabled={!isLoaded || isVerifying || code.length < 6}
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
