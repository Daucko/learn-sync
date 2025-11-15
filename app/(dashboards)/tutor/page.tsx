import { Sidebar } from '@/components/dashboard/tutor/Sidebar';
import { TopNav } from '@/components/dashboard/tutor/TopNav';
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
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-gray-50/50 ml-64 flex flex-col min-h-screen">
        <TopNav />

        <div className="flex-1 overflow-auto p-8">
          {/* Page Heading & Session Info */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-base font-normal text-gray-600">
                Welcome back, Sarah!
              </p>
            </div>

            <Card className="p-4">
              <CardContent className="p-0">
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
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
            </Card>
          </div>

          {/* My Subjects Section */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900">My Subjects</h2>
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
          <SubmissionTable />
        </div>
      </main>
    </div>
  );
}
