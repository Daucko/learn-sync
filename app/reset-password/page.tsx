"use client";

import { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import LearnSync from '@/components/assets/LearnSync-logo (2).png';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams?.get('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        if (!token) {
            setError('Missing reset token');
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to reset password');
            }

            setIsSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold text-red-600">Invalid Link</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    This password reset link is invalid or missing the token.
                </p>
                <Link href="/forgot-password" className="mt-4 inline-block text-primary hover:underline">
                    Request a new link
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm">
            <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Reset password
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Enter your new password below.
                </p>
            </div>

            {!isSuccess ? (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {error && (
                            <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-3 text-sm text-red-700 dark:text-red-200">
                                {error}
                            </div>
                        )}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                New Password
                            </label>
                            <div className="mt-1">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Confirm New Password
                            </label>
                            <div className="mt-1">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary/90"
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            ) : (
                <div className="mt-8 space-y-6">
                    <div className="rounded-md bg-green-50 dark:bg-green-900/30 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                                    Password reset successful
                                </h3>
                                <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                                    <p>
                                        Your password has been updated. Redirecting you to login...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-sm">
                        <Link href="/login" className="font-semibold text-primary hover:text-primary/80">
                            Click here if not redirected
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <main className="">
            <header className="p-6 md:px-10 md:py-5 border-b border-gray-200 dark:border-gray-800">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link href="/">
                        <Image
                            src={LearnSync}
                            alt="LearnSync Logo"
                            width={150}
                            height={50}
                            className="object-cover"
                        />
                    </Link>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-white dark:bg-background-dark p-4">
                <Suspense fallback={<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </main>
    );
}
