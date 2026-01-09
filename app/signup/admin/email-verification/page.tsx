// components/email-verification.tsx
import Link from 'next/link';
import { MailCheck, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function EmailVerification() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="text-secondary size-7">
            <BookOpen className="w-7 h-7" />
          </div>
          <h2 className="text-foreground text-xl font-bold tracking-tight">
            LearnSync
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 justify-center items-center py-10 px-4">
        <Card className="w-full max-w-lg border shadow-sm">
          <CardContent className="p-8 sm:p-12 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center size-20 rounded-full bg-secondary/10">
                <MailCheck className="text-secondary w-12 h-12" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-foreground text-3xl font-bold tracking-tight leading-tight mb-3">
              Check your inbox
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-base font-normal leading-relaxed mb-8">
              We've sent a verification email to{' '}
              <strong className="text-foreground font-medium">
                admin@school.edu
              </strong>
              . Please click the link in the email to complete your
              registration. If you don't see it, be sure to check your spam
              folder.
            </p>

            {/* Resend Link */}
            <p className="text-muted-foreground text-sm font-normal leading-normal">
              Didn't receive the email?{' '}
              <Button
                variant="link"
                className="p-0 h-auto text-orange-500 hover:text-orange-400 font-medium cursor-pointer"
              >
                Resend
              </Button>
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-border my-8" />

            {/* Return to Login */}
            <p className="text-muted-foreground text-sm font-normal leading-normal">
              <Link href="#" className="hover:underline text-foreground">
                Return to Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
