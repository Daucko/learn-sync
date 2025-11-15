import { Sidebar } from '@/components/dashboard/student/sidebar';
import { TopNav } from '@/components/dashboard/tutor/TopNav';
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
    statusColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: 2,
    studentName: 'Maria Garcia',
    avatar: 'MG',
    submissionDate: 'Oct 25, 2023, 08:30 PM',
    status: 'Graded',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    id: 3,
    studentName: 'David Smith',
    avatar: 'DS',
    submissionDate: 'Oct 27, 2023, 11:00 AM',
    status: 'Pending',
    statusColor: 'bg-yellow-100 text-yellow-800',
    late: true,
  },
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
            <div className="flex flex-wrap gap-2 pb-4">
              <a
                href="#"
                className="text-gray-500 text-sm font-medium hover:text-primary"
              >
                LearnSync
              </a>
              <span className="text-gray-500 text-sm font-medium">/</span>
              <a
                href="#"
                className="text-gray-500 text-sm font-medium hover:text-primary"
              >
                Assignments
              </a>
              <span className="text-gray-500 text-sm font-medium">/</span>
              <span className="text-gray-900 text-sm font-medium">
                UX Design Principles
              </span>
            </div>

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
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide shadow-sm hover:opacity-90">
                <Download className="h-4 w-4" />
                <span className="truncate">Bulk Download</span>
              </button>
            </div>

            {/* Toolbar and Search */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4">
              <div className="w-full md:max-w-xs">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-11">
                  <div className="text-gray-500 flex border border-gray-300 bg-white items-center justify-center pl-3 rounded-l-lg border-r-0">
                    <Search className="h-4 w-4" />
                  </div>
                  <input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-white h-full placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal"
                    placeholder="Search by student name..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary/20 px-4 text-primary text-sm font-bold tracking-wide">
                  All
                </button>
                <button className="flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg px-4 text-gray-600 hover:bg-gray-100 text-sm font-bold tracking-wide">
                  Pending
                </button>
                <button className="flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg px-4 text-gray-600 hover:bg-gray-100 text-sm font-bold tracking-wide">
                  Graded
                </button>
                <button className="flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg px-4 text-gray-600 hover:bg-gray-100 text-sm font-bold tracking-wide">
                  Late
                </button>
              </div>
            </div>

            {/* Submissions Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-gray-600">
                        Student Name
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-600">
                        Submission Date
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-600">
                        Status
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {submissions.map((submission) => (
                      <tr key={submission.id}>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {submission.avatar}
                              </span>
                            </div>
                            <span className="text-gray-900 text-sm font-medium">
                              {submission.studentName}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 text-sm align-middle">
                          {submission.late ? (
                            <div className="flex flex-col">
                              <span>{submission.submissionDate}</span>
                              <span className="text-red-600 text-xs">Late</span>
                            </div>
                          ) : (
                            submission.submissionDate
                          )}
                        </td>
                        <td className="p-4 align-middle">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${submission.statusColor}`}
                          >
                            {submission.status}
                          </span>
                        </td>
                        <td className="p-4 text-right align-middle">
                          <div className="flex items-center justify-end gap-2">
                            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                              <History className="h-4 w-4" />
                            </button>
                            <button className="flex h-9 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-white text-sm font-bold tracking-wide hover:opacity-90">
                              Grade
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 p-4">
                <span className="text-sm text-gray-600">
                  Showing 1-4 of 25 submissions
                </span>
                <div className="flex gap-1">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
