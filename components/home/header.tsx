import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm px-4 sm:px-10 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 text-secondary">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">LearnSync</h2>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-sm font-medium hover:text-secondary transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-secondary transition-colors"
            >
              For Tutors
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-secondary transition-colors"
            >
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
                asChild
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
