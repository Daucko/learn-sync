import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, Upload } from 'lucide-react';

interface SubjectCardProps {
  title: string;
  studentCount: number;
  assignmentCount?: number;
  color?: 'default' | 'primary' | 'secondary';
  onViewAssignments?: () => void;
  onUploadContent?: () => void;
}

export function SubjectCard({
  title,
  studentCount,
  assignmentCount = 0,
  color = 'default',
  onViewAssignments,
  onUploadContent,
}: SubjectCardProps) {
  return (
    <Card className={`rounded-xl hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {title}
        </CardTitle>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {studentCount} {studentCount === 1 ? 'Student' : 'Students'}
            </span>
          </div>
          {assignmentCount > 0 && (
            <div className="flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {assignmentCount}{' '}
                {assignmentCount === 1 ? 'Assignment' : 'Assignments'}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 text-sm font-semibold text-gray-900 dark:text-gray-300"
              onClick={onViewAssignments}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Assignments
            </Button>

            <Button
              size="sm"
              className="flex-1 h-9 text-sm font-semibold bg-primary hover:bg-primary/80"
              onClick={onUploadContent}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>

          {/* Progress indicator or additional info can go here */}
          {studentCount > 0 && (
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Active students</span>
              <Badge variant="secondary" className="text-xs">
                {Math.min(studentCount, 30)}/30
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
