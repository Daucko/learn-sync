"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, GraduationCap, Building2, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Organization {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  users: any[];
}

interface User {
  id: string;
  fullName: string | null;
  email: string;
  role: string;
  organization: Organization | null;
}

export default function SuperAdminDashboard() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orgRes, userRes] = await Promise.all([
          fetch('/api/organization'),
          fetch('/api/user')
        ]);

        const orgData = await orgRes.json();
        const userData = await userRes.json();

        if (orgData.success) setOrganizations(orgData.data);
        if (userData.success) setUsers(userData.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const tutors = users.filter(u => u.role === 'TUTOR');
  const students = users.filter(u => u.role === 'STUDENT');

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
              Here's a high-level overview of your system-wide metrics and controls.
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
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Total Organizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold leading-tight">{organizations.length}</p>
              <p className="text-muted-foreground text-sm mt-1">Platform-wide</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary" />
                Active Tutors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold leading-tight">{tutors.length}</p>
              <p className="text-muted-foreground text-sm mt-1">Educational experts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-500" />
                Active Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold leading-tight">{students.length}</p>
              <p className="text-muted-foreground text-sm mt-1">Enrolled learners</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-orange-500" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <p className="text-xl font-bold leading-tight">Operational</p>
              </div>
              <p className="text-muted-foreground text-sm font-medium mt-2">
                All systems running.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <div className="pt-10">
          <Tabs defaultValue="organizations" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold leading-tight">Platform Data</h2>
              <TabsList>
                <TabsTrigger value="organizations">Organizations</TabsTrigger>
                <TabsTrigger value="tutors">Tutors</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="organizations">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50/50 dark:bg-gray-800/50">
                          <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Users</th>
                        </tr>
                      </thead>
                      <tbody>
                        {organizations.map((org) => (
                          <tr key={org.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-6 py-4 text-sm font-medium">{org.name}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{org.email || 'N/A'}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{org.phone || 'N/A'}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{org.users?.length || 0}</td>
                          </tr>
                        ))}
                        {organizations.length === 0 && !isLoading && (
                          <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground italic">
                              No organizations found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tutors">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50/50 dark:bg-gray-800/50">
                          <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Organization</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tutors.map((tutor) => (
                          <tr key={tutor.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-6 py-4 text-sm font-medium">{tutor.fullName}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{tutor.email}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{tutor.organization?.name || 'Independent'}</td>
                          </tr>
                        ))}
                        {tutors.length === 0 && !isLoading && (
                          <tr>
                            <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground italic">
                              No tutors found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50/50 dark:bg-gray-800/50">
                          <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Organization</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-6 py-4 text-sm font-medium">{student.fullName}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{student.email}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{student.organization?.name || 'Independent'}</td>
                          </tr>
                        ))}
                        {students.length === 0 && !isLoading && (
                          <tr>
                            <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground italic">
                              No students found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
