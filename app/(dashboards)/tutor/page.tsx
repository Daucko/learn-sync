// app/tutor/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { GradeAssignment } from '@/components/dashboard/tutor/GradeAssignmentModal';
import { SubjectCard } from '@/components/dashboard/tutor/SubjectCard';
import { SubmissionTable } from '@/components/dashboard/tutor/SubmissionTable';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <>
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
    </>
  );
}

// 'use client';

// import { useState } from 'react';
// import {
//   Search,
//   Bell,
//   Upload,
//   Plus,
//   FileText,
//   FolderOpen,
//   CheckCircle,
//   Calculator,
//   Beaker,
//   Code,
//   BookOpen,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';

// interface Subject {
//   id: string;
//   name: string;
//   studentCount: number;
//   icon: React.ReactNode;
// }

// export default function TutorDashboard() {
//   const [subjects] = useState<Subject[]>([
//     {
//       id: '1',
//       name: 'Advanced Mathematics',
//       studentCount: 32,
//       icon: <Calculator className="h-5 w-5" />,
//     },
//     {
//       id: '2',
//       name: 'Physics 101',
//       studentCount: 28,
//       icon: <Beaker className="h-5 w-5" />,
//     },
//     {
//       id: '3',
//       name: 'Intro to Programming',
//       studentCount: 45,
//       icon: <Code className="h-5 w-5" />,
//     },
//   ]);

//   const quickActions = [
//     {
//       title: 'Manage Assignments',
//       description: 'Edit, schedule, or remove existing assignments.',
//       icon: <FileText className="h-5 w-5" />,
//       href: '#',
//     },
//     {
//       title: 'View Student Submissions',
//       description: 'Check who has submitted their work.',
//       icon: <FolderOpen className="h-5 w-5" />,
//       href: '#',
//     },
//     {
//       title: 'Grade Submissions',
//       description: 'Review and grade the latest submissions.',
//       icon: <CheckCircle className="h-5 w-5" />,
//       href: '#',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50/50">
//       {/* Header */}
//       {/* <header className="flex h-16 items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 mx-6 mt-6">
//         <div className="flex flex-1 items-center gap-8">
//           <div className="relative flex min-w-40 max-w-sm flex-col">
//             <div className="flex w-full flex-1 items-stretch">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <Input
//                 className="w-full rounded-lg border-gray-200 bg-white pl-10 text-sm placeholder:text-gray-400 focus:border-green-500"
//                 placeholder="Search..."
//                 type="text"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
//             <Bell className="h-5 w-5" />
//           </Button>
//           <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600" />
//         </div>
//       </header> */}

//       {/* Main Content */}
//       <main className="p-6">
//         {/* Welcome Section */}
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex flex-col gap-1">
//             <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//             <p className="text-base font-normal text-gray-600">
//               Welcome back, Sarah! Manage your subjects and content.
//             </p>
//           </div>
//           <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm">
//             <div className="flex items-center gap-2">
//               <span className="text-gray-600">Session:</span>
//               <span className="font-semibold text-gray-900">Fall 2024</span>
//             </div>
//             <div className="h-4 w-px bg-gray-200" />
//             <div className="flex items-center gap-2">
//               <span className="text-gray-600">Term:</span>
//               <span className="font-semibold text-gray-900">Mid-Term</span>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions Grid */}
//         <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
//           {/* Upload Card */}
//           <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 shadow-lg">
//             <CardContent className="flex flex-col items-center justify-center p-6 text-center text-white">
//               <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
//                 <Upload className="h-7 w-7" />
//               </div>
//               <h3 className="mt-4 text-xl font-bold">Upload New Content</h3>
//               <p className="mt-1 text-sm opacity-80">
//                 Add assignments, videos, or tutorials for your subjects.
//               </p>
//               <Button className="mt-6 flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-sm">
//                 <Plus className="h-4 w-4" />
//                 Upload Now
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Quick Actions */}
//           <Card className="border-gray-200">
//             <CardContent className="p-6 space-y-4">
//               {quickActions.slice(0, 2).map((action, index) => (
//                 <a
//                   key={index}
//                   href={action.href}
//                   className="flex items-start gap-4 rounded-xl p-3 hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
//                     {action.icon}
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">
//                       {action.title}
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       {action.description}
//                     </p>
//                   </div>
//                 </a>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Grade Submissions */}
//           <Card className="border-gray-200">
//             <CardContent className="p-6">
//               <a
//                 href={quickActions[2].href}
//                 className="flex items-start gap-4 rounded-xl p-3 hover:bg-gray-50 transition-colors"
//               >
//                 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
//                   {quickActions[2].icon}
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-900">
//                     {quickActions[2].title}
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     {quickActions[2].description}
//                   </p>
//                 </div>
//               </a>
//             </CardContent>
//           </Card>
//         </div>

//         {/* My Subjects Section */}
//         <section className="mt-8">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold text-gray-900">My Subjects</h2>
//             <a
//               className="text-sm font-semibold text-green-600 hover:underline"
//               href="#"
//             >
//               View All
//             </a>
//           </div>

//           <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//             {subjects.map((subject) => (
//               <Card key={subject.id} className="border-gray-200 shadow-sm">
//                 <CardContent className="p-5">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       {subject.name}
//                     </h3>
//                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
//                       {subject.icon}
//                     </div>
//                   </div>
//                   <p className="mt-1 text-sm text-gray-600">
//                     {subject.studentCount} Students
//                   </p>
//                   <div className="mt-6">
//                     <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold">
//                       View Subject
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}

//             {/* Add New Subject Card */}
//             <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
//               <CardContent className="flex flex-col items-center justify-center p-5 text-center">
//                 <Button
//                   variant="ghost"
//                   className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200"
//                 >
//                   <Plus className="h-6 w-6" />
//                 </Button>
//                 <p className="mt-3 text-sm font-semibold text-gray-900">
//                   Add New Subject
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
