// components/dashboard/student/StudentSidebar.tsx
'use client';

import { Sidebar } from '../tutor/Sidebar';
import { LayoutDashboard, BookOpen, Award, BellDot } from 'lucide-react';

const studentNavigation = [
  { name: 'Dashboard', href: '/student', icon: LayoutDashboard },
  { name: 'My Courses', href: '/student/my-courses', icon: BookOpen },
  { name: 'Grades', href: '/student/grades', icon: Award },
  { name: 'Notifications', href: '/student/notifications', icon: BellDot },
];

export function StudentSidebar() {
  return <Sidebar navigation={studentNavigation} />;
}
