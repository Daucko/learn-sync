import { Twitter, Linkedin } from 'lucide-react';
import LearnSync from '@/components/assets/LearnSync-logo (2).png';
import Image from 'next/image';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <a
      href={href}
      className="text-sm text-muted-foreground hover:text-secondary transition-colors block"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-muted px-4 sm:px-10 py-16 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2 space-y-1">
            {/* Logo */}
            <Image
              src={LearnSync}
              alt="LearnSync Logo"
              width={100}
              height={30}
              className="object-cover"
            />

            <p className="text-sm text-muted-foreground max-w-md">
              Your learning journey, simplified and organized. The central hub
              for all your assignments, tutorials, and grades.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Company</h4>
            <div className="space-y-2">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Support</h4>
            <div className="space-y-2">
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Legal</h4>
            <div className="space-y-2">
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 dark:border-gray-700">
          <p className="text-sm text-muted-foreground">
            © 2024 LearnSync. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-secondary transition-colors"
              aria-label="Visit our Twitter profile"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-secondary transition-colors"
              aria-label="Visit our LinkedIn profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
