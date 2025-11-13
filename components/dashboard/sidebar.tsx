'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  LibraryBig,
  GraduationCap,
  Bell,
  Settings,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Dashboard',
    href: '/student',
    icon: LayoutDashboard,
  },
  {
    name: 'My Courses',
    href: '/student/my-courses',
    icon: LibraryBig,
  },
  {
    name: 'Grades',
    href: '/student/grades',
    icon: GraduationCap,
  },
  {
    name: 'Notifications',
    href: '/student/notifications',
    icon: Bell,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 px-3">
          <div className="bg-secondary/20 text-secondary flex items-center justify-center rounded-lg size-10">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">LearnSync</h1>
            <p className="text-sm text-muted-foreground">Fall 2024</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-secondary/20 text-secondary'
                    : 'text-muted-foreground hover:bg-accent/10 hover:text-muted-foreground/70'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname === '/settings'
              ? 'bg-secondary/20 text-secondary'
              : 'text-muted-foreground hover:bg-accent/10 hover:text-accent'
          )}
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </div>
    </div>
  );
}
