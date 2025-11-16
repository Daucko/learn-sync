import { Sidebar } from '@/components/dashboard/tutor/Sidebar';
import { TopNav } from '@/components/dashboard/tutor/TopNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  ChevronDown,
  Users,
  Eye,
  FileText,
  Settings,
  Star,
} from 'lucide-react';

const subjects = [
  {
    id: 1,
    title: 'Algebra II',
    code: 'MTH-201',
    grade: 'Grade 11',
    studentCount: 28,
  },
  {
    id: 2,
    title: 'World History',
    code: 'HIS-301',
    grade: 'Grade 10',
    studentCount: 32,
  },
  {
    id: 3,
    title: 'Biology',
    code: 'SCI-250',
    grade: 'Grade 9',
    studentCount: 25,
  },
];

const gradeFilters = [
  { label: 'All Grades', active: true },
  { label: 'Grade 9', active: false },
  { label: 'Grade 10', active: false },
  { label: 'Grade 11', active: false },
];

export default function MySubjectsPage() {
  return (
    <main className="flex-1 overflow-auto p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading & Controls */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-black leading-tight tracking-tight text-gray-900 dark:text-gray-300">
            My Subjects
          </h1>
          <Button className="h-12 px-6 bg-primary hover:bg-primary/90 text-white text-base font-bold cursor-pointer">
            <Plus className="mr-2 h-5 w-5" />
            Add New Subject
          </Button>
        </header>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* SearchBar */}
          <div className="grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-500" />
              <Input
                className="pl-10 h-12 bg-gray-100 border-0 text-base"
                placeholder="Search by name or code..."
              />
            </div>
          </div>

          {/* Chips/Filters */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Button
              variant="outline"
              className="h-12 gap-2 bg-gray-100 cursor-pointer"
            >
              Filter by Grade
              <ChevronDown className="h-4 w-4" />
            </Button>
            {gradeFilters.map((filter, index) => (
              <Button
                key={index}
                variant={filter.active ? 'default' : 'outline'}
                className={`h-12 cursor-pointer ${
                  filter.active
                    ? 'bg-secondary/20 text-secondary hover:bg-secondary/30'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card
              key={subject.id}
              className="overflow-hidden transition-shadow hover:shadow-lg "
            >
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-300">
                      {subject.title}
                    </h3>
                    <p className="text-sm font-normal text-gray-500 mt-1">
                      {subject.code}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-secondary/20 text-secondary"
                  >
                    <Star className="h-3 w-3 mr-1" />
                    {subject.grade}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Users className="h-5 w-5" />
                  <p className="text-sm font-medium">
                    {subject.studentCount} Enrolled Students
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="h-10 gap-2 text-gray-900 dark:text-gray-300 cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                  View Content
                </Button>
                <Button
                  variant="outline"
                  className="h-10 gap-2 text-gray-900 dark:text-gray-300 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  Add Content
                </Button>
                <Button
                  variant="outline"
                  className="h-10 gap-2 text-gray-900 dark:text-gray-300 cursor-pointer"
                >
                  <Settings className="h-4 w-4" />
                  Manage
                </Button>
                <Button
                  variant="outline"
                  className="h-10 gap-2 text-gray-900 dark:text-gray-300 cursor-pointer"
                >
                  <FileText className="h-4 w-4" />
                  View Grades
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {subjects.length === 0 && (
          <div className="col-span-1 lg:col-span-2 xl:col-span-3 mt-16 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-300 rounded-xl">
            <Star className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl font-bold text-gray-900">
              You haven't added any subjects yet.
            </p>
            <p className="text-gray-500 mt-2">
              Click 'Add New Subject' to get started.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
