import { Search, Bell } from 'lucide-react';
import { ThemeToggle } from '../../theme-toggle';

export function TopNav() {
  return (
    <header className="h-16 shrink-0 border-b border-gray-200 bg-white px-8 sticky top-0 z-10">
      <div className="flex h-full items-center justify-between">
        <div className="flex flex-1 items-center gap-8">
          <div className="relative flex min-w-40 max-w-sm flex-col">
            <div className="flex w-full flex-1 items-stretch">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Search for subjects, assignments..."
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
          </button>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">SJ</span>
          </div>
        </div>
      </div>
    </header>
  );
}
