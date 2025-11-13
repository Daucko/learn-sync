'use client';

import { useState } from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '../theme-toggle';

export function Header() {
  const [isDark, setIsDark] = useState(false);

  return (
    <header className="flex h-20 items-center justify-between border-b px-8 py-4">
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, assignments..."
            className="pl-10"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)}>
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button> */}
        <ThemeToggle />
        <div className="w-10 h-10 rounded-full bg-muted" />
      </div>
    </header>
  );
}
