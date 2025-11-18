// app/manage-students/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Mail,
  UserX,
  UserCheck,
  Archive,
  Download,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
// import router from 'next/router';
import { useRouter } from 'next/navigation';

interface Student {
  id: number;
  name: string;
  email: string;
  grade: string;
  parent: string;
  status: 'active' | 'pending' | 'suspended';
  enrollmentDate: string;
}

// Mock data
const initialStudents: Student[] = [
  {
    id: 1,
    name: 'Olivia Chen',
    email: 'olivia.chen@email.com',
    grade: 'Grade 5',
    parent: 'David Chen',
    status: 'active',
    enrollmentDate: '2023-08-15',
  },
  {
    id: 2,
    name: 'Benjamin Carter',
    email: 'ben.carter@email.com',
    grade: 'Grade 4',
    parent: 'Sarah Carter',
    status: 'active',
    enrollmentDate: '2023-09-01',
  },
  {
    id: 3,
    name: 'Sophia Rodriguez',
    email: 'sophia.r@email.com',
    grade: 'Grade 5',
    parent: 'Maria Rodriguez',
    status: 'pending',
    enrollmentDate: '2023-10-20',
  },
  {
    id: 4,
    name: 'Liam Goldberg',
    email: 'liam.g@email.com',
    grade: 'Grade 3',
    parent: 'Rachel Goldberg',
    status: 'active',
    enrollmentDate: '2023-08-22',
  },
  {
    id: 5,
    name: 'Ava Nguyen',
    email: 'ava.nguyen@email.com',
    grade: 'Grade 4',
    parent: 'Thomas Nguyen',
    status: 'suspended',
    enrollmentDate: '2023-09-10',
  },
];

export default function ManageStudents() {
  const router = useRouter();
  const [students, setStudents] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    'suspend' | 'activate' | 'delete' | ''
  >('');

  // Action handlers
  const handleViewProfile = (student: any) => {
    router.push(`/school-admin/manage-students/${student.id}`);
  };

  const handleEditStudent = (student: any) => {
    // Open edit modal or navigate to edit page
    alert(`Editing student: ${student.name}`);
    // setEditStudent(student)
    // setIsEditModalOpen(true)
  };

  const handleSendEmail = (student: any) => {
    // Open email composer or send automated email
    window.location.href = `mailto:${student.email}?subject=LearnSync Communication`;
  };

  const handleContactParent = (student: any) => {
    // Open parent contact modal or initiate contact
    alert(`Contacting parent: ${student.parent} for ${student.name}`);
  };

  const handleSuspendStudent = (student: any) => {
    setSelectedStudent(student);
    setDialogType('suspend');
    setIsDialogOpen(true);
  };

  const handleActivateStudent = (student: any) => {
    setSelectedStudent(student);
    setDialogType('activate');
    setIsDialogOpen(true);
  };

  const handleDeleteStudent = (student: any) => {
    setSelectedStudent(student);
    setDialogType('delete');
    setIsDialogOpen(true);
  };

  const handleExportData = (student: any) => {
    // Export student data as CSV/PDF
    const data = `Student Data:\nName: ${student.name}\nEmail: ${student.email}\nGrade: ${student.grade}\nParent: ${student.parent}\nStatus: ${student.status}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${student.name}_data.txt`;
    a.click();
  };

  // Confirm action handlers
  const confirmAction = () => {
    if (!selectedStudent) return;

    switch (dialogType) {
      case 'suspend':
        setStudents((prev) =>
          prev.map((student) =>
            student.id === selectedStudent.id
              ? { ...student, status: 'suspended' }
              : student
          )
        );
        break;
      case 'activate':
        setStudents((prev) =>
          prev.map((student) =>
            student.id === selectedStudent.id
              ? { ...student, status: 'active' }
              : student
          )
        );
        break;
      case 'delete':
        setStudents((prev) =>
          prev.filter((student) => student.id !== selectedStudent.id)
        );
        break;
    }

    setIsDialogOpen(false);
    setSelectedStudent(null);
    setDialogType('');
  };

  // Get dialog content based on type
  const getDialogContent = () => {
    if (!selectedStudent) return { title: '', description: '' };

    switch (dialogType) {
      case 'suspend':
        return {
          title: 'Suspend Student',
          description: `Are you sure you want to suspend ${selectedStudent.name}? They will lose access to the platform until reactivated.`,
        };
      case 'activate':
        return {
          title: 'Activate Student',
          description: `Are you sure you want to activate ${selectedStudent.name}? They will regain access to the platform.`,
        };
      case 'delete':
        return {
          title: 'Delete Student',
          description: `Are you sure you want to permanently delete ${selectedStudent.name}? This action cannot be undone and all their data will be lost.`,
        };
      default:
        return { title: '', description: '' };
    }
  };

  const dialogContent = getDialogContent();

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-4xl font-black">Manage Students</h1>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Student
        </Button>
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, email..."
                className="pl-10 w-full"
              />
            </div>
            <div className="flex w-full md:w-auto items-center gap-4">
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="grade1">Grade 1</SelectItem>
                  <SelectItem value="grade2">Grade 2</SelectItem>
                  <SelectItem value="grade3">Grade 3</SelectItem>
                  <SelectItem value="grade4">Grade 4</SelectItem>
                  <SelectItem value="grade5">Grade 5</SelectItem>
                </SelectContent>
              </Select>
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
                  <th className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold">
                    Grade Level
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold">
                    Parent Contact
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="relative py-3.5 pl-3 pr-6 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-muted/50">
                    <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium">
                      {student.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                      {student.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                      {student.grade}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                      {student.parent}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <Badge
                        variant={
                          student.status === 'active'
                            ? 'default'
                            : student.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {student.status.charAt(0).toUpperCase() +
                          student.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => handleViewProfile(student)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditStudent(student)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Student
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSendEmail(student)}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleContactParent(student)}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Contact Parent
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {student.status === 'active' ? (
                            <DropdownMenuItem
                              onClick={() => handleSuspendStudent(student)}
                              className="text-amber-600"
                            >
                              <UserX className="w-4 h-4 mr-2" />
                              Suspend Student
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleActivateStudent(student)}
                              className="text-green-600"
                            >
                              <UserCheck className="w-4 h-4 mr-2" />
                              Activate Student
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleExportData(student)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Export Data
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteStudent(student)}
                            className="text-red-600"
                          >
                            <Archive className="w-4 h-4 mr-2" />
                            Delete Student
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1">
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
        <span className="px-2 text-sm">...</span>
        <Button variant="outline" size="sm">
          8
        </Button>
        <Button variant="outline" size="sm">
          9
        </Button>
        <Button variant="outline" size="sm">
          10
        </Button>
        <Button variant="outline" size="sm">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>{dialogContent.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={dialogType === 'delete' ? 'destructive' : 'default'}
              onClick={confirmAction}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
