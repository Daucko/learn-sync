import { Sidebar } from '@/components/dashboard/student/sidebar';
import { Header } from '@/components/dashboard/student/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        {' '}
        {/* Added ml-64 to account for sidebar width */}
        <Header />
        <main className="flex-1 p-8 overflow-auto">{children}</main>{' '}
        {/* Added overflow-auto */}
      </div>
    </div>
  );
}
