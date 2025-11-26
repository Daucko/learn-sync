import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { BookOpen, GraduationCap, Menu } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LearnSync from '@/components/assets/LearnSync-logo (2).png';
import Image from 'next/image';

export default function Header() {
  return (
    <nav className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
        {/* Logo */}
        <Image
          src={LearnSync}
          alt="LearnSync Logo"
          width={150}
          height={50}
          className="object-cover"
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Pricing
          </a>
        </div>

        {/* Desktop Header Actions - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-3 ">
          <ThemeToggle />
          <Button
            variant="ghost"
            className="text-gray-600 dark:text-gray-300 pointer-events-none"
            asChild
          >
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            className="bg-primary hover:bg-primary/80 pointer-events-none"
            asChild
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu - Show on small screens */}
        <div className="sm:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-60 sm:w-[340px]">
              <div className="flex flex-col gap-6 mt-8">
                <a
                  href="#features"
                  className="text-foreground hover:text-secondary transition-colors"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-foreground hover:text-secondary transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#pricing"
                  className="text-foreground hover:text-secondary transition-colors"
                >
                  Pricing
                </a>
                <div className="border-t pt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 dark:text-gray-300"
                    asChild
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button
                    className="w-full justify-start bg-secondary hover:bg-secondary/80 mt-2"
                    asChild
                  >
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
