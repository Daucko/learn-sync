import type { Metadata } from 'next';
import { Sidebar } from '@/components/dashboard/tutor/Sidebar';
import { TopNav } from '@/components/dashboard/tutor/TopNav';
import { SchoolAdminSidebar } from '@/components/dashboard/school-admin/SchoolAdminSidebar';

export const metadata: Metadata = {
  title: 'School Admin Dashboard - LearnSync',
  description: 'Manage organization, tutors, students, and pending requests',
};

interface SchoolAdminLayoutProps {
  children: React.ReactNode;
}

export default function TutorLayout({ children }: SchoolAdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background font-display">
      <div className="flex min-h-screen">
        <SchoolAdminSidebar />

        <main className="flex-1 ml-64 flex flex-col min-h-screen">
          <TopNav />

          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
