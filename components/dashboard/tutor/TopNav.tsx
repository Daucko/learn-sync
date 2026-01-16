import { Search, Bell } from 'lucide-react';
import Image from 'next/image';
import { ThemeToggle } from '../../theme-toggle';
import { Input } from '@/components/ui/input';

interface TopNavProps {
  user?: {
    name: string;
    role: string;
    avatar?: string;
    initials?: string;
  };
  showSearch?: boolean;
  showNotifications?: boolean;
  showThemeToggle?: boolean;
  searchPlaceholder?: string;
}

const defaultUser = {
  name: 'Sarah Jenkins',
  role: 'Tutor',
  initials: 'SJ',
};

export function TopNav({
  user = defaultUser,
  showSearch = true,
  showNotifications = true,
  showThemeToggle = true,
  searchPlaceholder = 'Search for subjects, assignments...',
}: TopNavProps) {
  return (
    <header className="h-16 shrink-0 border-b border-sidebar-border bg-sidebar px-8 sticky top-0 z-10">
      <div className="flex h-full items-center justify-between">
        <div className="flex flex-1 items-center gap-8">
          {showSearch && (
            <div className="relative flex min-w-40 max-w-sm flex-col">
              <div className="flex w-full flex-1 items-stretch">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sidebar-foreground/40" />
                <Input
                  className="w-full pl-10 bg-sidebar border-sidebar-border placeholder:text-sidebar-foreground/50 text-sidebar-foreground"
                  placeholder={searchPlaceholder}
                  type="text"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {showThemeToggle && <ThemeToggle />}

          {showNotifications && (
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Bell className="h-5 w-5" />
            </button>
          )}

          <div className="flex gap-4 items-center p-2 rounded-lg">
            <div className="w-10 h-10 bg-sidebar-accent rounded-full flex items-center justify-center">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <span className="text-sm font-medium">
                  {user.initials ||
                    user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <h1 className="text-sidebar-foreground text-sm font-medium">{user.name}</h1>
              <p className="text-sidebar-foreground/50 text-xs">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
