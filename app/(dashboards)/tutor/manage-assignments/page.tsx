import { Sidebar } from '@/components/dashboard/tutor/Sidebar';
import { TopNav } from '@/components/dashboard/tutor/TopNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  ChevronDown,
  Edit,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react';
import Link from 'next/link';

const assignments = [
  {
    id: 1,
    title: 'Algebra Basics: Problem Set 1',
    subject: 'Mathematics',
    dueDate: 'October 26, 2024',
    status: 'Published',
    statusVariant: 'default' as const,
    submissions: '15 / 25',
  },
  {
    id: 2,
    title: 'History of Ancient Rome',
    subject: 'History',
    dueDate: 'October 22, 2024',
    status: 'Past Due',
    statusVariant: 'destructive' as const,
    submissions: '25 / 25',
  },
  {
    id: 3,
    title: 'Introduction to Physics',
    subject: 'Science',
    dueDate: 'November 5, 2024',
    status: 'Published',
    statusVariant: 'default' as const,
    submissions: '10 / 22',
  },
];

export default function ManageAssignmentsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-gray-50/50 ml-64 flex flex-col min-h-screen">
        <TopNav />

        <div className="flex-1 overflow-auto p-8">
          <div className="w-full max-w-7xl mx-auto">
            {/* Page Heading */}
            <header className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h1 className="text-gray-900 text-4xl font-bold leading-tight tracking-tight min-w-72">
                Manage Assignments
              </h1>
              <Button className="h-11 px-6 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold">
                <Plus className="h-5 w-5 mr-2" />
                Create New Assignment
              </Button>
            </header>

            {/* Toolbar & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 mb-6">
              <div className="relative w-full md:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10 h-10 bg-gray-50 border-gray-200 placeholder:text-gray-500"
                  placeholder="Search by assignment title..."
                />
              </div>
              <div className="flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-10 gap-2 bg-gray-50 border-gray-200"
                    >
                      Subject
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Mathematics</DropdownMenuItem>
                    <DropdownMenuItem>Science</DropdownMenuItem>
                    <DropdownMenuItem>History</DropdownMenuItem>
                    <DropdownMenuItem>English</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-10 gap-2 bg-gray-50 border-gray-200"
                    >
                      Status
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Published</DropdownMenuItem>
                    <DropdownMenuItem>Draft</DropdownMenuItem>
                    <DropdownMenuItem>Past Due</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-gray-600 font-medium uppercase tracking-wider">
                      Assignment Title
                    </TableHead>
                    <TableHead className="text-gray-600 font-medium uppercase tracking-wider">
                      Due Date
                    </TableHead>
                    <TableHead className="text-gray-600 font-medium uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="text-gray-600 font-medium uppercase tracking-wider">
                      Submissions
                    </TableHead>
                    <TableHead className="text-gray-600 font-medium uppercase tracking-wider text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow
                      key={assignment.id}
                      className="hover:bg-gray-50/50 transition-colors border-t border-gray-200"
                    >
                      <TableCell className="whitespace-nowrap">
                        <Link
                          href={`/tutor/manage-assignments/${assignment.id}`}
                          className="hover:underline"
                        >
                          <div className="text-sm font-semibold text-gray-900">
                            {assignment.title}
                          </div>
                          <div className="text-xs text-gray-600">
                            {assignment.subject}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-gray-700">
                        {assignment.dueDate}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant={assignment.statusVariant}>
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-gray-700">
                        {assignment.submissions}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              View Submissions
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 px-2">
              <p className="text-sm text-gray-600">
                Showing 1 to {assignments.length} of 20 results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-gray-200 text-gray-600 hover:bg-gray-50"
                  disabled
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
