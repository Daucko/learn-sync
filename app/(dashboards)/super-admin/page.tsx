// app/super-admin/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, PlusCircle, Activity } from 'lucide-react';

export default function SuperAdminDashboard() {
  return (
    <div className="p-8">
      <div className="flex flex-col max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-center gap-4 pb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold leading-tight tracking-tight">
              Welcome, Admin!
            </h1>
            <p className="text-muted-foreground text-base font-normal leading-normal">
              Here&apos;s a high-level overview of your system-wide metrics and
              controls.
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            <span>Add New Organization</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Total Organizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold leading-tight">128</p>
              <div className="flex items-center gap-1 text-green-600 mt-2">
                <TrendingUp className="w-4 h-4" />
                <p className="text-sm font-medium">+5 this month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Active Tutors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold leading-tight">1,450</p>
              <div className="flex items-center gap-1 text-green-600 mt-2">
                <TrendingUp className="w-4 h-4" />
                <p className="text-sm font-medium">+2.1%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Active Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold leading-tight">23,670</p>
              <div className="flex items-center gap-1 text-green-600 mt-2">
                <TrendingUp className="w-4 h-4" />
                <p className="text-sm font-medium">+8.3%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <p className="text-xl font-bold leading-tight">Operational</p>
              </div>
              <p className="text-muted-foreground text-sm font-medium mt-2">
                All systems are running smoothly.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <h2 className="text-2xl font-bold leading-tight pt-10 pb-4">
          Recent Platform Activity
        </h2>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-6 py-4 text-left text-sm font-semibold w-1/3">
                      Event
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold w-1/3">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold w-1/6">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold w-1/6">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      event: 'New Organization Added',
                      description: 'Academy X has been successfully onboarded.',
                      category: 'Onboarding',
                      categoryColor: 'bg-green-100 text-green-800',
                      timestamp: '2 minutes ago',
                    },
                    {
                      event: 'System Settings Updated',
                      description:
                        'Assignment submission deadline policy was changed.',
                      category: 'Settings',
                      categoryColor: 'bg-orange-100 text-orange-800',
                      timestamp: '1 hour ago',
                    },
                    {
                      event: 'New Super Admin',
                      description: 'Jane Doe was promoted to Super Admin.',
                      category: 'Users',
                      categoryColor: 'bg-blue-100 text-blue-800',
                      timestamp: '5 hours ago',
                    },
                    {
                      event: 'Report Generated',
                      description:
                        'Monthly student activity report was generated.',
                      category: 'Reports',
                      categoryColor: 'bg-purple-100 text-purple-800',
                      timestamp: 'Yesterday',
                    },
                  ].map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-4 text-sm font-normal">
                        {item.event}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {item.description}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${item.categoryColor}`}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {item.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
