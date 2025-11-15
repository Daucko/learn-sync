interface SubjectCardProps {
  title: string;
  studentCount: number;
}

export function SubjectCard({ title, studentCount }: SubjectCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{studentCount} Students</p>
      <div className="mt-6 flex flex-1 items-end gap-3">
        <button className="h-9 flex-1 rounded-lg bg-primary/10 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors">
          View Assignments
        </button>
        <button className="h-9 flex-1 rounded-lg bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600 transition-colors">
          Upload Content
        </button>
      </div>
    </div>
  );
}
