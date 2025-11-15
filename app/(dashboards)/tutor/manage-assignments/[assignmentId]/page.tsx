import { Sidebar } from '@/components/dashboard/tutor/Sidebar';
import { TopNav } from '@/components/dashboard/tutor/TopNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Download,
  Search,
  Eye,
  History,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const submissions = [
  {
    id: 1,
    studentName: 'Alex Johnson',
    avatar: 'AJ',
    submissionDate: 'Oct 26, 2023, 10:15 AM',
    status: 'Pending',
    statusVariant: 'secondary' as const,
  },
  {
    id: 2,
    studentName: 'Maria Garcia',
    avatar: 'MG',
    submissionDate: 'Oct 25, 2023, 08:30 PM',
    status: 'Graded',
    statusVariant: 'default' as const,
  },
  {
    id: 3,
    studentName: 'David Smith',
    avatar: 'DS',
    submissionDate: 'Oct 27, 2023, 11:00 AM',
    status: 'Pending',
    statusVariant: 'secondary' as const,
    late: true,
  },
];

const filterButtons = [
  { label: 'All', active: true },
  { label: 'Pending', active: false },
  { label: 'Graded', active: false },
  { label: 'Late', active: false },
];

export default function StudentSubmissionsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-gray-50/50 ml-64 flex flex-col min-h-screen">
        <TopNav />

        <div className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumbs */}
            <Breadcrumb className="pb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    className="text-gray-500 hover:text-primary"
                  >
                    LearnSync
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    className="text-gray-500 hover:text-primary"
                  >
                    Assignments
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="text-gray-900">UX Design Principles</span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Page Heading */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
              <div className="flex min-w-72 flex-col gap-1">
                <h1 className="text-gray-900 text-3xl font-bold leading-tight">
                  Submissions: UX Design Principles
                </h1>
                <p className="text-gray-500 text-base font-normal leading-normal">
                  25 of 30 students have submitted their work. 15 are pending
                  grading.
                </p>
              </div>
              <Button className="h-10 px-4 bg-primary text-white text-sm font-bold">
                <Download className="h-4 w-4 mr-2" />
                Bulk Download
              </Button>
            </div>

            {/* Toolbar and Search */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4">
              <div className="w-full md:max-w-xs">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    className="pl-10 h-11 border-gray-300 bg-white rounded-l-none border-l-0"
                    placeholder="Search by student name..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                {filterButtons.map((filter, index) => (
                  <Button
                    key={index}
                    variant={filter.active ? 'default' : 'outline'}
                    className={`h-10 px-4 text-sm font-bold ${
                      filter.active
                        ? 'bg-primary/20 text-primary hover:bg-primary/30'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Submissions Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow className="hover:bg-gray-50">
                    <TableHead className="p-4 text-sm font-semibold text-gray-600">
                      Student Name
                    </TableHead>
                    <TableHead className="p-4 text-sm font-semibold text-gray-600">
                      Submission Date
                    </TableHead>
                    <TableHead className="p-4 text-sm font-semibold text-gray-600">
                      Status
                    </TableHead>
                    <TableHead className="p-4 text-sm font-semibold text-gray-600 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow
                      key={submission.id}
                      className="border-t border-gray-200"
                    >
                      <TableCell className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-gray-300 text-gray-700">
                              {submission.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-gray-900 text-sm font-medium">
                            {submission.studentName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 text-gray-600 text-sm align-middle">
                        {submission.late ? (
                          <div className="flex flex-col">
                            <span>{submission.submissionDate}</span>
                            <span className="text-red-600 text-xs">Late</span>
                          </div>
                        ) : (
                          submission.submissionDate
                        )}
                      </TableCell>
                      <TableCell className="p-4 align-middle">
                        <Badge variant={submission.statusVariant}>
                          {submission.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4 text-right align-middle">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          >
                            <History className="h-4 w-4" />
                          </Button>
                          <Button className="h-9 px-4 bg-primary text-white text-sm font-bold hover:opacity-90">
                            Grade
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between border-t border-gray-200 p-4">
                <span className="text-sm text-gray-600">
                  Showing 1-{submissions.length} of 25 submissions
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-600 hover:bg-gray-100"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-600 hover:bg-gray-100"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
