import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Calculator,
  Beaker,
  PenTool,
  Calendar,
  Video,
  CheckCircle,
} from 'lucide-react';

const courses = [
  {
    title: 'Advanced Mathematics',
    instructor: 'Dr. Evelyn Reed',
    progress: 75,
    icon: Calculator,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwGWPE0UsoKnKO5nhMhJY83hLWe3mIF9Dz3jzwGhmbZxeXDmk6ecQsQVRO3uOVTU-W86BQqO9Aj7opqKN3aNkrsDLxTl9hvQbqHncWsRoUMlCMu6h9WISETRAkMF8ddHpF2JExKKWrLwfFaWP14KYFnSe4SPy9pv42o8EQdq98K5Zws9qxHsPZDQmynq6y5-AQ-_AQ3bC80FBF3aUwz8ZEHjKCDCQhBpDXTMSnLoa_FLhs4lfjnzIdGVnxuU6icNhEmiTCrTVyVGHL',
    imageAlt: 'Mathematics Course Image',
  },
  {
    title: 'Introduction to Physics',
    instructor: 'Prof. David Chen',
    progress: 50,
    icon: Beaker,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3wnQiqNbOtOaksoL_5zNWAz2blWQwL6wbEPWXmuuq36TNHnOM4sENGgKN7_yhxTzcpNoJSVgrMseCWa2s0mNbQqtkC0FAJq41cT5ldmPPRsA95V1_HSIANK9qSd4ph933AXP_b5fCjOWmxR50hmBaSzDEsy74J-hArzUSZHxpeS2s9AXvsVlXuajokxs5VWuwqkOKqhx_6P3F6Lde_kFbuo1KAUiqJt2p6S59fm3RMQm8kMxuYMGVs9u8qUR9rS2IKdeC1gt7rhub',
    imageAlt: 'Physics Course Image',
  },
  {
    title: 'Creative Writing',
    instructor: 'Ms. Anya Sharma',
    progress: 90,
    icon: PenTool,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQuzKQjfxN2tGUa9ueUqiB5d5iihPIF-tcMbMVF81YOgnvZj93-p1ASC6XsZivk014D5H1TZLz3lSZwQi5DAajG_3DMQK3NhohbdkdjheHCGWyv70CMga5HvvAM5POAxPmN0Wb-HRw8r05VmL1Xs9Eg5-Raw3-BHKogq-9yvdwDoKevgyP3wh04dXmvTwzx2ugBSYFFjlMnyPov5THAgaIYRUpz_jHQVW5Gmy_EvavYp6eYjqXwNQWNaC1XwMdWWJueNF7doG62A23',
    imageAlt: 'Writing Course Image',
  },
];

const assignments = [
  {
    title: 'Calculus Problem Set 3',
    course: 'Advanced Mathematics',
    dueDate: 'Oct 28',
    icon: Calculator,
  },
  {
    title: 'Lab Report: Kinematics',
    course: 'Introduction to Physics',
    dueDate: 'Nov 02',
    icon: Beaker,
  },
  {
    title: 'Short Story Draft',
    course: 'Creative Writing',
    dueDate: 'Nov 05',
    icon: PenTool,
  },
];

const notifications = [
  {
    title: 'New video tutorial uploaded for Physics.',
    time: '2 hours ago',
    icon: Video,
  },
  {
    title: 'Grades for your Math essay are now available.',
    time: '1 day ago',
    icon: CheckCircle,
  },
  {
    title: 'New assignment posted for Creative Writing.',
    time: '3 days ago',
    icon: Calendar,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Welcome back, Alex!</h1>
        <p className="text-muted-foreground">
          Here's a summary of your academic progress.
        </p>
      </div>

      {/* My Courses Section */}
      <div>
        <h2 className="text-2xl font-bold pb-4">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card key={index} className="overflow-hidden">
              <div
                className="w-full aspect-video bg-cover bg-center rounded-t-lg"
                style={{ backgroundImage: `url(${course.imageUrl})` }}
                aria-label={course.imageAlt}
              />
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.instructor}
                    </p>
                  </div>
                  <course.icon className="h-5 w-5 text-secondary" />
                </div>
                <div className="mt-4 space-y-2">
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {course.progress}% complete
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Assignments & Notifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Assignments */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold">Upcoming Assignments</h2>
          {assignments.map((assignment, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <assignment.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {assignment.course} - Due: {assignment.dueDate}
                      </p>
                    </div>
                  </div>
                  <Button>View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Notifications */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Recent Notifications</h2>
          {notifications.map((notification, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <notification.icon className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
