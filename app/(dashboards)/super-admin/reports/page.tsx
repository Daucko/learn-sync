// app/super-admin/reports/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Calendar, ArrowUp } from 'lucide-react';

export default function Reports() {
  const stats = [
    { title: 'Total Users', value: '1,428', change: '+5.4%' },
    { title: 'Active Tutors', value: '150', change: '+1.2%' },
    { title: 'Active Students', value: '1,278', change: '+8.1%' },
    { title: 'Content Uploaded', value: '5,602', change: '+12.5%' },
  ];

  const tabs = [
    'Overview',
    'User Activity',
    'Content Engagement',
    'Organization Performance',
  ];

  return (
    <div className="p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-6">
          <div className="flex min-w-72 flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground text-base font-normal leading-normal">
              View platform analytics and user data at a glance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="30">
              <SelectTrigger className="w-[180px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Last 30 Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
                <SelectItem value="90">Last 90 Days</SelectItem>
                <SelectItem value="365">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              <span>Download Report</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="pt-6">
          <div className="flex border-b gap-8">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-3 ${
                  index === 0
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <p className="text-sm font-bold leading-normal">{tab}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="text-green-600 text-sm font-medium flex items-center gap-1 mt-2">
                  <ArrowUp className="w-3 h-3" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-8">
          {/* Platform Growth Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-extrabold">
                Platform Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-80 flex items-center justify-center bg-muted rounded-lg">
                <div className="text-center text-muted-foreground">
                  <p>Platform Growth Chart</p>
                  <p className="text-sm">
                    Line chart showing user registration trends
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Breakdown Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-extrabold">
                User Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-80 flex items-center justify-center bg-muted rounded-lg">
                <div className="text-center text-muted-foreground">
                  <p>User Breakdown Chart</p>
                  <p className="text-sm">
                    Donut chart showing tutor/student ratio
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
