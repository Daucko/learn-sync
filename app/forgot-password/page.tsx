"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import LearnSync from '@/components/assets/LearnSync-logo (2).png';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                throw new Error('Failed to send request');
            }

            setIsSubmitted(true);
        } catch (err) {
            console.error(err);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

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
                        <Link href="/login">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-9"
                            >
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-white dark:bg-background-dark p-4">
                <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            Forgot password?
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            No worries, we'll send you reset instructions.
                        </p>
                    </div>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-primary/90"
                            >
                                {isLoading ? 'Sending link...' : 'Send reset link'}
                            </Button>

                            <div className="text-center text-sm">
                                <Link href="/login" className="font-semibold text-primary hover:text-primary/80">
                                    <span aria-hidden="true">&larr;</span> Back to log in
                                </Link>
                            </div>
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
                                            Check your email
                                        </h3>
                                        <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                                            <p>
                                                We sent a password reset link to <span className="font-bold">{email}</span>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center text-sm">
                                <p className="text-gray-600 dark:text-gray-400">
                                    Didn't receive the email?{' '}
                                    <button onClick={() => setIsSubmitted(false)} className="font-semibold text-primary hover:text-primary/80">
                                        Click to resend
                                    </button>
                                </p>
                            </div>
                            <div className="text-center text-sm mt-4">
                                <Link href="/login" className="font-semibold text-primary hover:text-primary/80">
                                    <span aria-hidden="true">&larr;</span> Back to log in
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
