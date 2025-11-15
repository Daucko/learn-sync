'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Upload,
  ClipboardList,
  FolderOpen,
  LogOut,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/tutor', icon: LayoutDashboard },
  { name: 'My Subjects', href: '/tutor/my-subjects', icon: BookOpen },
  { name: 'Upload Content', href: '/tutor/upload-content', icon: Upload },
  {
    name: 'Manage Assignments',
    href: '/tutor/manage-assignments',
    icon: ClipboardList,
  },
  //   {
  //     name: 'Student Submissions',
  //     href: '/tutor/student-submissions',
  //     icon: FolderOpen,
  //   },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white fixed left-0 top-0 h-screen overflow-y-auto">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="py-4 flex h-16 items-center gap-2 px-4 border-b border-gray-200">
          <BookOpen className="h-6 w-6 text-secondary" />
          <h2 className="text-gray-900 text-xl font-bold">LearnSync</h2>
        </div>

        {/* Navigation */}
        <div className="p-4  flex flex-1 flex-col justify-between pt-4">
          <div className="flex flex-col gap-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-secondary/20 text-secondary'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* User section */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center p-2 rounded-lg">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">SJ</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-gray-900 text-sm font-medium">
                  Sarah Jenkins
                </h1>
                <p className="text-gray-500 text-xs">Tutor</p>
              </div>
            </div>

            <Link
              href="/settings"
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                pathname === '/settings'
                  ? 'bg-text-secondary/20 text-text-secondary'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>

            <button className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-gray-600 hover:bg-gray-100 text-sm font-medium">
              <LogOut className="h-5 w-5" />
              Log out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
