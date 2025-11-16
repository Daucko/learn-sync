// components/dashboard/tutor/SubmissionTable.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, History, FileText } from 'lucide-react';
import { GradeAssignment } from '@/components/dashboard/tutor/GradeAssignmentModal';

interface Submission {
  id: number;
  studentName: string;
  avatar: string;
  assignment: string;
  submitted: string;
  status: 'Pending' | 'Graded' | 'Late';
  statusVariant: 'secondary' | 'default' | 'destructive';
}

// Define the interface for the onGradeClick parameter
interface GradeClickParams {
  studentName: string;
  assignmentTitle: string;
}

interface SubmissionTableProps {
  onGradeClick?: (submission: GradeClickParams) => void;
}

const submissions: Submission[] = [
  {
    id: 1,
    studentName: 'Alex Johnson',
    avatar: 'AJ',
    assignment: 'Calculus Worksheet #3',
    submitted: 'Oct 26, 2023, 10:15 AM',
    status: 'Pending',
    statusVariant: 'secondary',
  },
  {
    id: 2,
    studentName: 'Maria Garcia',
    avatar: 'MG',
    assignment: 'Physics Lab Report',
    submitted: 'Oct 25, 2023, 08:30 PM',
    status: 'Graded',
    statusVariant: 'default',
  },
  {
    id: 3,
    studentName: 'James Smith',
    avatar: 'JS',
    assignment: 'Programming Project 1',
    submitted: 'Oct 24, 2023, 11:59 PM',
    status: 'Late',
    statusVariant: 'destructive',
  },
];

export function SubmissionTable({ onGradeClick }: SubmissionTableProps) {
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);

  const handleGradeClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsGradeDialogOpen(true);

    // Also call the parent handler if provided
    if (onGradeClick) {
      onGradeClick({
        studentName: submission.studentName,
        assignmentTitle: submission.assignment,
      });
    }
  };

  const handleCloseGradeDialog = () => {
    setIsGradeDialogOpen(false);
    setSelectedSubmission(null);
  };

  const getAvatarFallback = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-300">
            Recent Submissions
          </h2>
          <Link
            href="/tutor/student-submissions"
            className="text-sm font-semibold text-secondary hover:underline"
          >
            View All Submissions
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 ">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-accent">
              <TableRow className="hover:bg-gray-50">
                <TableHead className="p-4 text-sm font-semibold text-gray-600">
                  Student Name
                </TableHead>
                <TableHead className="p-4 text-sm font-semibold text-gray-600">
                  Assignment
                </TableHead>
                <TableHead className="p-4 text-sm font-semibold text-gray-600">
                  Submitted
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
                  className="border-t border-gray-200 hover:bg-gray-50/70"
                >
                  <TableCell className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-gray-100 text-gray-700 text-sm font-medium">
                          {getAvatarFallback(submission.studentName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-900 dark:text-gray-300 text-sm font-medium">
                        {submission.studentName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="p-4 text-gray-600 text-sm align-middle">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      {submission.assignment}
                    </div>
                  </TableCell>
                  <TableCell className="p-4 text-gray-600 text-sm align-middle">
                    {submission.submitted}
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
                        className="h-9 w-9 text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        title="View Submission"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        title="View History"
                      >
                        <History className="h-4 w-4" />
                      </Button>
                      <Button
                        className="h-9 px-4 bg-primary text-white text-sm font-bold hover:opacity-90 cursor-pointer"
                        onClick={() => handleGradeClick(submission)}
                      >
                        Grade Now
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Grade Assignment Modal */}
      <GradeAssignment
        isOpen={isGradeDialogOpen}
        onClose={handleCloseGradeDialog}
        studentName={selectedSubmission?.studentName || ''}
        assignmentTitle={selectedSubmission?.assignment || ''}
      />
    </>
  );
}
