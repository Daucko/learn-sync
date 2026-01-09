// app/tutor/student-submissions/page.tsx
'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GradeAssignment } from '@/components/dashboard/tutor/GradeAssignmentModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Download, Search } from 'lucide-react';
import { SubmissionTable } from '@/components/dashboard/tutor/SubmissionTable';

const filterButtons = [
  { label: 'All', active: true },
  { label: 'Pending', active: false },
  { label: 'Graded', active: false },
  { label: 'Late', active: false },
];

function StudentSubmissionsContent() {
  const searchParams = useSearchParams();
  const assignmentId = searchParams.get('assignmentId');
  const assignmentTitle =
    searchParams.get('assignmentTitle') || 'UX Design Principles';

  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<{
    studentName: string;
    assignmentTitle: string;
  } | null>(null);

  const handleGradeClick = (submission: {
    studentName: string;
    assignmentTitle: string;
  }) => {
    setSelectedSubmission(submission);
    setIsGradeDialogOpen(true);
  };

  const handleCloseGradeDialog = () => {
    setIsGradeDialogOpen(false);
    setSelectedSubmission(null);
  };

  return (
    <div className="flex-1 overflow-auto p-8">
      <main className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <Breadcrumb className="pb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/tutor/manage-assignments"
                className="text-muted-foreground hover:text-primary"
              >
                Assignments
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-foreground">{assignmentTitle}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Heading */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
          <div className="flex min-w-72 flex-col gap-1">
            <h1 className="text-foreground text-3xl font-bold leading-tight">
              Submissions: {assignmentTitle}
            </h1>
            <p className="text-gray-500 text-base font-normal leading-normal">
              25 of 30 students have submitted their work. 15 are pending
              grading.
            </p>
          </div>
          <Button className="h-10 px-4 bg-primary text-sm font-bold">
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
                className="pl-10 h-11 border-gray-300 bg-white rounded focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Search by student name..."
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {filterButtons.map((filter, index) => (
              <Button
                key={index}
                variant={filter.active ? 'default' : 'outline'}
                className={`h-10 px-4 text-sm font-bold ${filter.active
                    ? 'bg-primary/20 text-primary hover:bg-primary/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Submissions Table - Using SubmissionTable instead of SubmissionsTable */}
        <SubmissionTable onGradeClick={handleGradeClick} />
      </main>

      {/* Grade Assignment Modal */}
      <GradeAssignment
        isOpen={isGradeDialogOpen}
        onClose={handleCloseGradeDialog}
        studentName={selectedSubmission?.studentName || ''}
        assignmentTitle={assignmentTitle}
      />
    </div>
  );
}

export default function StudentSubmissionsPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <StudentSubmissionsContent />
    </Suspense>
  );
}
