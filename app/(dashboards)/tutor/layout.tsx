import type { Metadata } from 'next';
import { Sidebar } from '@/components/dashboard/tutor/Sidebar';
import { TopNav } from '@/components/dashboard/tutor/TopNav';

export const metadata: Metadata = {
  title: 'Tutor Dashboard - LearnSync',
  description: 'Manage your subjects, assignments, and student submissions',
};

interface TutorLayoutProps {
  children: React.ReactNode;
}

export default function TutorLayout({ children }: TutorLayoutProps) {
  return (
    <div className="min-h-screen bg-background font-display">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 ml-64 flex flex-col min-h-screen">
          <TopNav />

          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
