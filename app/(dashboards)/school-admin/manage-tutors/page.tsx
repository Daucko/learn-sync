// app/manage-tutors/page.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Plus,
  Eye,
  Edit,
  PauseCircle,
  PlayCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

const tutors = [
  {
    name: 'Olivia Chen',
    email: 'olivia.chen@email.com',
    specialization: 'Mathematics',
    status: 'active',
    avatar: '/avatars/olivia.jpg',
  },
  {
    name: 'Ben Carter',
    email: 'ben.carter@email.com',
    specialization: 'Science',
    status: 'pending',
    avatar: '/avatars/ben.jpg',
  },
  {
    name: 'Aisha Khan',
    email: 'aisha.khan@email.com',
    specialization: 'History',
    status: 'active',
    avatar: '/avatars/aisha.jpg',
  },
  {
    name: 'Liam Rodriguez',
    email: 'liam.rodriguez@email.com',
    specialization: 'English',
    status: 'suspended',
    avatar: '/avatars/liam.jpg',
  },
];

export default function ManageTutors() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-black">Manage Tutors</h1>
          <p className="text-muted-foreground">
            View, edit, and manage all tutor profiles within your organization.
          </p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Tutor
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name or email..."
                className="pl-12"
              />
            </div>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline">
                Status: All
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline">
                Specialization: All
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-muted-foreground">
                    Tutor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-muted-foreground">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-muted-foreground">
                    Specialization
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {tutors.map((tutor, index) => (
                  <tr key={index} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {tutor.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          {tutor.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                      {tutor.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                      {tutor.specialization}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          tutor.status === 'active'
                            ? 'default'
                            : tutor.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {tutor.status.charAt(0).toUpperCase() +
                          tutor.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <Button variant="ghost" size="sm" title="View Profile">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {tutor.status === 'active' ? (
                          <Button variant="ghost" size="sm" title="Suspend">
                            <PauseCircle className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" title="Activate">
                            <PlayCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1</span> to{' '}
          <span className="font-medium">4</span> of{' '}
          <span className="font-medium">20</span> results
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
            5
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
