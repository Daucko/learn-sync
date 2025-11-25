// app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  GraduationCap,
  UserCheck,
  Clock,
  Plus,
  TrendingUp,
  ArrowUpRight,
  Upload,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AddSubjectDialog } from '@/components/dashboard/school-admin/AddSubjectDialog';
import { RoleGuard } from '../../../components/auth/RoleGuard';

// Types
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'positive' | 'action';
  highlight?: boolean;
  clickable?: boolean;
  href?: string;
}

interface ActivityItem {
  icon: React.ComponentType<{ className?: string }> | string;
  title: string;
  time: string;
}

// Mock data for the chart
const enrollmentData = [
  { week: 'Week 1', enrollments: 45, fill: '#dcfce7' },
  { week: 'Week 2', enrollments: 78, fill: '#bbf7d0' },
  { week: 'Week 3', enrollments: 52, fill: '#dcfce7' },
  { week: 'Week 4', enrollments: 120, fill: '#22c55e' },
];

export default function Dashboard() {
  const router = useRouter();
  const [isAddSubjectDialogOpen, setIsAddSubjectDialogOpen] = useState(false);

  const stats: StatItem[] = [
    {
      title: 'Total Organizations',
      value: '12',
      change: '+2% this month',
      icon: Users,
      trend: 'positive',
    },
    {
      title: 'Active Tutors',
      value: '78',
      change: '+5% this month',
      icon: GraduationCap,
      trend: 'positive',
    },
    {
      title: 'Active Students',
      value: '1,245',
      change: '+10% this month',
      icon: UserCheck,
      trend: 'positive',
    },
    {
      title: 'Pending Requests',
      value: '5',
      change: 'View requests',
      icon: Clock,
      highlight: true,
      clickable: true,
      href: '/school-admin/pending-requests',
      trend: 'action',
    },
  ];

  const activities: ActivityItem[] = [
    {
      icon: UserCheck,
      title: 'New tutor Jane Doe was added.',
      time: '2 hours ago',
    },
    {
      icon: Upload,
      title: 'John Smith submitted an assignment.',
      time: '5 hours ago',
    },
    {
      icon: Users,
      title: 'Organization Bright Minds Academy was approved.',
      time: '1 day ago',
    },
    {
      icon: UserCheck,
      title: 'New student Emily White enrolled.',
      time: '2 days ago',
    },
    {
      icon: GraduationCap,
      title: 'Tutor Michael Brown uploaded a new tutorial.',
      time: '3 days ago',
    },
  ];

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-semibold">{`${label}`}</p>
          <p className="text-green-600">{`Enrollments: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const handleStatClick = (stat: StatItem) => {
    if (stat.clickable && stat.href) {
      router.push(stat.href);
    }
  };

  const renderActivityIcon = (activity: ActivityItem) => {
    if (typeof activity.icon === 'string') {
      return <div className="w-5 h-5">{activity.icon}</div>;
    }

    const IconComponent = activity.icon;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <RoleGuard allowedRoles={['school-admin']}>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">Welcome back, Admin!</h1>
            <p className="text-muted-foreground">
              Here&apos;s a high-level overview of your platform&apos;s
              activity.
            </p>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={() => setIsAddSubjectDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Subject
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={cn(
                'transition-all duration-200 cursor-pointer hover:shadow-md',
                stat.highlight &&
                  'border-orange-200 bg-orange-50 dark:bg-orange-950/20',
                stat.clickable && 'hover:border-orange-300 hover:scale-[1.02]'
              )}
              onClick={() => handleStatClick(stat)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <div
                      className={cn(
                        'text-sm font-medium flex items-center gap-1 transition-all duration-200',
                        stat.highlight && 'text-orange-600',
                        stat.trend === 'positive' && 'text-green-600',
                        stat.clickable && 'hover:underline hover:gap-2'
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (stat.clickable) {
                          handleStatClick(stat);
                        }
                      }}
                    >
                      {stat.change}
                      {stat.clickable && (
                        <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      )}
                    </div>
                  </div>
                  <div
                    className={cn(
                      'p-3 rounded-full transition-colors duration-200',
                      stat.highlight && 'bg-orange-100 text-orange-600',
                      stat.trend === 'positive' &&
                        'bg-green-100 text-green-600',
                      stat.clickable && 'group-hover:bg-orange-200'
                    )}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enrollment Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>New Enrollments</CardTitle>
              <p className="text-sm text-muted-foreground">
                Last 30 days performance
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-1 items-baseline mb-4">
                <p className="text-4xl font-bold">295</p>
                <p className="text-secondary text-base font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +15%
                </p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={enrollmentData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-30"
                    />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="enrollments" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600">
                    {renderActivityIcon(activity)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Add Subject Dialog */}
        <AddSubjectDialog
          open={isAddSubjectDialogOpen}
          onOpenChange={setIsAddSubjectDialogOpen}
        />
      </div>
    </RoleGuard>
  );
}
