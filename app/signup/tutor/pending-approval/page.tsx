'use client';

import { Button } from '@/components/ui/button';
import { BookOpen, Hourglass, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function PendingApproval() {
  return (
    <div className="min-h-screen bg-white dark:bg-background-dark font-display">
      <div className="flex min-h-screen w-full flex-col items-center">
        <div className="flex h-full grow flex-col w-full max-w-7xl">
          {/* Header */}
          <header className="flex w-full items-center justify-between whitespace-nowrap px-6 py-4 md:px-10">
            <div className="flex items-center gap-3 text-gray-900 dark:text-white">
              <div className="size-6 text-green-500">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold leading-tight tracking-tight">
                LearnSync
              </h2>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex flex-1 items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-lg flex-col items-center">
              <div className="flex flex-col items-center gap-6 text-center">
                {/* Icon */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <Hourglass className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Your Request is Pending Approval
                  </h1>
                  <p className="max-w-md text-base font-normal text-gray-600 dark:text-gray-300">
                    Your request to join [Organization Name] has been sent to
                    the School Administrator for review. You will receive an
                    email notification once your account is approved. Until
                    then, you will not be able to log in.
                  </p>
                </div>

                {/* Back to Home Button */}
                <Link href="/" className="w-full max-w-xs">
                  <Button className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white text-base font-bold shadow-sm">
                    Back to Homepage
                  </Button>
                </Link>
              </div>

              {/* Support Link */}
              <Link
                href="/support"
                className="mt-8 flex items-center gap-2 text-sm font-normal text-gray-600 dark:text-gray-400 underline transition-colors hover:text-green-600 dark:hover:text-green-400"
              >
                <HelpCircle className="h-4 w-4" />
                Having trouble? Contact Support.
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
