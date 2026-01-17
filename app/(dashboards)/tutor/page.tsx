// app/tutor/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { GradeAssignment } from '@/components/dashboard/tutor/GradeAssignmentModal';
import { SubmissionTable } from '@/components/dashboard/tutor/SubmissionTable';
import { SubjectCard } from '@/components/dashboard/tutor/SubjectCard';




interface DashboardSubject {
  title: string;
  studentCount: number;
}

import { Submission } from '@/components/dashboard/tutor/SubmissionTable';

export default function DashboardPage() {
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<{
    submissionId: string;
    studentName: string;
    assignmentTitle: string;
  } | null>(null);

  const [subjects, setSubjects] = useState<DashboardSubject[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, submissionsRes] = await Promise.all([
          fetch('/api/subject'),
          fetch('/api/submission'),
        ]);

        if (subjectsRes.ok) {
          const data = await subjectsRes.json();
          // Transform strict API data to UI format
          // data.data is the array
          const subData = data.data || [];
          const formattedSubjects = subData.map((s: { title: string; courses: { _count: { students: number } }[] }) => ({
            title: s.title,
            studentCount: s.courses.reduce((acc: number, curr: { _count: { students: number } }) => acc + curr._count.students, 0),
          }));
          setSubjects(formattedSubjects);
        }

        if (submissionsRes.ok) {
          const data = await submissionsRes.json();
          const subData = data.data || [];
          // Transform API data to SubmissionTable format
          const formattedSubmissions = subData.map((s: {
            id: string;
            student: { fullName: string; email: string; avatarUrl?: string };
            assignment: { title: string };
            submittedAt: string;
            status: string
          }) => ({
            id: s.id,
            studentName: s.student.fullName || s.student.email,
            assignment: s.assignment.title,
            submitted: new Date(s.submittedAt).toLocaleDateString(),
            status: s.status,
            statusVariant: s.status === 'GRADED' ? 'default' : s.status === 'LATE' ? 'destructive' : 'secondary',
            avatarUrl: s.student.avatarUrl,
            late: s.status === 'LATE' // or calculate based on dueDate
          }));
          setSubmissions(formattedSubmissions);
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGradeClick = (submission: {
    submissionId: string;
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
    <>
      <div className="p-8">
        {/* Page Heading & Session Info */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-300">
              Dashboard
            </h1>
            <p className="text-base font-normal text-muted-foreground">
              Welcome back!
            </p>
          </div>

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
            {!isLoading && subjects.length === 0 && (
              <p className="text-gray-500 col-span-3">No subjects found.</p>
            )}
          </div>
        </section>

        {/* Recent Submissions Section */}
        <SubmissionTable submissions={submissions} onGradeClick={handleGradeClick} />
      </div>

      {/* Grade Assignment Modal */}
      <GradeAssignment
        isOpen={isGradeDialogOpen}
        onClose={handleCloseGradeDialog}
        submissionId={selectedSubmission?.submissionId}
        studentName={selectedSubmission?.studentName || ''}
        assignmentTitle={selectedSubmission?.assignmentTitle || ''}
      />
    </>
  );
}
