// app/tutor/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { GradeAssignment } from '@/components/dashboard/tutor/GradeAssignmentModal';
import { SubjectCard } from '@/components/dashboard/tutor/SubjectCard';
import { SubmissionTable } from '@/components/dashboard/tutor/SubmissionTable';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RoleGuard } from '@/components/auth/RoleGuard';

const subjects = [
  { title: 'Advanced Mathematics', studentCount: 32 },
  { title: 'Physics 101', studentCount: 28 },
  { title: 'Introduction to Programming', studentCount: 45 },
];

export default function DashboardPage() {
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
    <RoleGuard allowedRoles={['tutor']}>
      <div className="p-8">
        {/* Page Heading & Session Info */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-300">
              Dashboard
            </h1>
            <p className="text-base font-normal text-muted-foreground">
              Welcome back, Sarah!
            </p>
          </div>

          {/* <Card className="p-4">
            <CardContent className="p-0">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-cover bg-center">
                <p className="text-gray-600 text-sm font-normal">
                  Current Session:
                </p>
                <Badge variant="secondary" className="w-fit">
                  Fall 2024
                </Badge>
                <p className="text-gray-600 text-sm font-normal">
                  Active Term:
                </p>
                <Badge variant="default" className="w-fit">
                  Mid-Term
                </Badge>
              </div>
            </CardContent>
          </Card> */}
          <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Session:</span>
              <span className="font-semibold text-gray-900">Fall 2024</span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Term:</span>
              <span className="font-semibold text-gray-900">Mid-Term</span>
            </div>
          </div>
        </div>

        {/* My Subjects Section */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-300">
            My Subjects
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, index) => (
              <SubjectCard
                key={index}
                title={subject.title}
                studentCount={subject.studentCount}
              />
            ))}
          </div>
        </section>

        {/* Recent Submissions Section */}
        <SubmissionTable onGradeClick={handleGradeClick} />
      </div>

      {/* Grade Assignment Modal */}
      <GradeAssignment
        isOpen={isGradeDialogOpen}
        onClose={handleCloseGradeDialog}
        studentName={selectedSubmission?.studentName || ''}
        assignmentTitle={selectedSubmission?.assignmentTitle || ''}
      />
    </RoleGuard>
  );
}
