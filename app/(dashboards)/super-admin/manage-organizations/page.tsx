// app/super-admin/manage-organizations/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function ManageOrganizations() {
  const organizations = [
    {
      name: 'Innovate Inc.',
      admin: 'alex@innovate.com',
      contact: 'info@innovate.com',
      phone: '(555) 123-4567',
      plan: 'Pro',
      status: 'Active',
    },
    {
      name: 'QuantumLeap',
      admin: 'sara@quantum.com',
      contact: 'contact@quantum.com',
      phone: '(555) 987-6543',
      plan: 'Enterprise',
      status: 'Active',
    },
    {
      name: 'TechSolutions',
      admin: 'mark@tech.io',
      contact: 'support@tech.io',
      phone: '(555) 222-3333',
      plan: 'Basic',
      status: 'Suspended',
    },
    {
      name: 'GlobalConnect',
      admin: 'emily@global.net',
      contact: 'admin@global.net',
      phone: '(555) 444-5555',
      plan: 'Enterprise',
      status: 'Active',
    },
  ];

  return (
    <div className="p-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl font-black leading-tight tracking-tight">
            Manage Organizations
          </h1>
          <Button className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Create New Organization</span>
          </Button>
        </header>

        {/* Toolbar */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or admin..."
                className="pl-10"
              />
            </div>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              Filter by Status
              <ChevronRight className="w-4 h-4 rotate-90" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              Filter by Plan
              <ChevronRight className="w-4 h-4 rotate-90" />
            </Button>
          </div>
        </div>

        {/* Organizations Table */}
        <Card className="mt-6">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-6 py-3 font-medium uppercase tracking-wider">
                      Organization Name
                    </th>
                    <th className="px-6 py-3 font-medium uppercase tracking-wider">
                      Admin User
                    </th>
                    <th className="px-6 py-3 font-medium uppercase tracking-wider">
                      Primary Contact
                    </th>
                    <th className="px-6 py-3 font-medium uppercase tracking-wider">
                      Subscription Plan
                    </th>
                    <th className="px-6 py-3 font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {organizations.map((org, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted rounded-lg size-8"></div>
                          <p className="font-medium">{org.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">
                        {org.admin}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="text-muted-foreground">{org.contact}</p>
                        <p className="text-sm text-muted-foreground/70">
                          {org.phone}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">
                        {org.plan}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            org.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {org.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">4</span> of{' '}
            <span className="font-medium">42</span> results
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="default" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <span className="text-muted-foreground">...</span>
            <Button variant="outline" size="sm">
              11
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
