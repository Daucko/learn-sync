// app/(dashboards)/student/layout.tsx
import type { Metadata } from 'next';
import { StudentSidebar } from '@/components/dashboard/student/StudentSidebar';
import { TopNav } from '@/components/dashboard/tutor/TopNav';

export const metadata: Metadata = {
  title: 'Student Dashboard - LearnSync',
  description: 'Student learning dashboard',
};

interface StudentLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className="min-h-screen bg-background font-display">
      <div className="flex min-h-screen">
        <StudentSidebar />

        <main className="flex-1 ml-64 flex flex-col">
          <TopNav
            user={{
              name: 'Alex Johnson',
              role: 'Student',
              initials: 'AJ',
            }}
            searchPlaceholder="Search for courses, materials..."
          />

          <div className="flex-1 overflow-auto p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

// import { Sidebar } from '@/components/dashboard/tutor/Sidebar';
// import { Header } from '@/components/dashboard/student/header';
// import {} from 'lucide-react';
// import { TopNav } from '../../../components/dashboard/tutor/TopNav';

// const studentNavigation = [
//   {
//     name: 'Dashboard',
//     href: '/student',
//     icon: 'LayoutDashboard',
//   },
//   {
//     name: 'My Courses',
//     href: '/student/my-courses',
//     icon: 'LibraryBig',
//   },
//   {
//     name: 'Grades',
//     href: '/student/grades',
//     icon: 'GraduationCap',
//   },
//   {
//     name: 'Notifications',
//     href: '/student/notifications',
//     icon: 'Bell',
//   },
// ];

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex min-h-screen">
//       <Sidebar navigation={studentNavigation} />
//       <div className="flex-1 flex flex-col ml-64">
//         {' '}
//         {/* Added ml-64 to account for sidebar width */}
//         <TopNav
//           user={{
//             name: 'Alex Johnson',
//             role: 'Student',
//             initials: 'AJ',
//           }}
//           searchPlaceholder="Search for courses, materials..."
//         />
//         <main className="flex-1 p-8 overflow-auto">{children}</main>{' '}
//         {/* Added overflow-auto */}
//       </div>
//     </div>
//   );
// }
