// components/dashboard/student/StudentSidebar.tsx
'use client';

import { Sidebar } from '../tutor/Sidebar';
import { Home, Building2, FileChartColumn, ShieldUser } from 'lucide-react';

const schoolAdminNavigation = [
  { name: 'Dashboard', href: '/super-admin', icon: Home },
  {
    name: 'Manage Organizations',
    href: '/super-admin/manage-organizations',
    icon: Building2,
  },
  {
    name: 'Manage Admins',
    href: '/super-admin/manage-admins',
    icon: ShieldUser,
  },
  {
    name: 'Reports',
    href: '/super-admin/reports',
    icon: FileChartColumn,
  },
];

export function SuperAdminSidebar() {
  return <Sidebar navigation={schoolAdminNavigation} />;
}
