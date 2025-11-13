import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';

const grades = [
  {
    title: 'Algebra Homework 3',
    score: 93,
    total: 100,
    percentage: 93,
    gradedDate: 'Oct 26, 2023',
    color: 'secondary',
  },
  {
    title: 'Creative Writing Short Story',
    score: 75,
    total: 100,
    percentage: 75,
    gradedDate: 'Oct 22, 2023',
    color: 'primary',
  },
  {
    title: 'Physics Lab Report: Kinematics',
    score: 88,
    total: 100,
    percentage: 88,
    gradedDate: 'Oct 19, 2023',
    color: 'secondary',
  },
];

export default function GradesPage() {
  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">My Grades</h1>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Chips */}
        <div className="flex gap-2 overflow-x-auto">
          <Button variant="secondary" className="bg-secondary text-accent">
            All Subjects
          </Button>
          <Button variant="outline">Mathematics</Button>
          <Button variant="outline">Physics</Button>
          <Button variant="outline">Creative Writing</Button>
        </div>

        {/* Search */}
        <div className="w-full md:max-w-xs md:ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by assignment title..."
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Grades List */}
      <div className="space-y-4">
        {grades.map((grade, index) => (
          <Card
            key={index}
            className="hover:border-primary/50 transition-colors"
          >
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4">
                <h3 className="text-lg font-bold">{grade.title}</h3>

                <div className="flex items-center gap-3">
                  <div className="relative size-12">
                    <svg className="size-full" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="currentColor"
                        className="text-muted"
                        strokeWidth="2"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="currentColor"
                        className={
                          grade.color === 'secondary'
                            ? 'text-secondary'
                            : 'text-primary'
                        }
                        strokeWidth="2"
                        strokeDasharray="100.53"
                        strokeDashoffset={
                          100.53 - (grade.percentage / 100) * 100.53
                        }
                        strokeLinecap="round"
                        style={{
                          transform: 'rotate(-90deg)',
                          transformOrigin: '50% 50%',
                        }}
                      />
                    </svg>
                    <div
                      className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${
                        grade.color === 'secondary'
                          ? 'text-secondary'
                          : 'text-primary'
                      }`}
                    >
                      {grade.percentage}%
                    </div>
                  </div>
                  <div>
                    <p className="font-bold">
                      {grade.score} / {grade.total}
                    </p>
                    <p className="text-xs text-muted-foreground">Marks</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Graded on: {grade.gradedDate}
                </p>

                <Button className="w-full md:w-auto md:ml-auto">
                  View Feedback
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
