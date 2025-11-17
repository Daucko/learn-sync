// components/dashboard/student/StudentSidebar.tsx
'use client';

import { Sidebar } from '../tutor/Sidebar';
import { Home, GraduationCap, ClipboardCheck, Users } from 'lucide-react';

const schoolAdminNavigation = [
  { name: 'Dashboard', href: '/school-admin', icon: Home },
  {
    name: 'Manage Tutors',
    href: '/school-admin/manage-tutors',
    icon: GraduationCap,
  },
  {
    name: 'Manage Students',
    href: '/school-admin/manage-students',
    icon: Users,
  },
  {
    name: 'Pending Requests',
    href: '/school-admin/pending-requests',
    icon: ClipboardCheck,
  },
];

export function SchoolAdminSidebar() {
  return <Sidebar navigation={schoolAdminNavigation} />;
}
