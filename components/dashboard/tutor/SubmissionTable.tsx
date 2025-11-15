import Link from 'next/link';

const submissions = [
  {
    id: 1,
    studentName: 'Alex Johnson',
    assignment: 'Calculus Worksheet #3',
    submitted: 'Oct 26, 2023, 10:15 AM',
    status: 'Pending',
    statusColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: 2,
    studentName: 'Maria Garcia',
    assignment: 'Physics Lab Report',
    submitted: 'Oct 25, 2023, 08:30 PM',
    status: 'Graded',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    id: 3,
    studentName: 'James Smith',
    assignment: 'Programming Project 1',
    submitted: 'Oct 24, 2023, 11:59 PM',
    status: 'Late',
    statusColor: 'bg-red-100 text-red-800',
  },
];

export function SubmissionTable() {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Recent Submissions</h2>
        <Link
          href="/student-submissions"
          className="text-sm font-semibold text-primary hover:underline"
        >
          View All Submissions
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {submission.studentName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {submission.assignment}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {submission.submitted}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold leading-5 ${submission.statusColor}`}
                    >
                      {submission.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button className="rounded-lg bg-orange-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors">
                      Grade Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
