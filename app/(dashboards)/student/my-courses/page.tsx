import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NotepadText, MonitorPlay, GraduationCap } from 'lucide-react';

const courses = [
  {
    title: 'Advanced Mathematics',
    instructor: 'Dr. Evelyn Reed',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwGWPE0UsoKnKO5nhMhJY83hLWe3mIF9Dz3jzwGhmbZxeXDmk6ecQsQVRO3uOVTU-W86BQqO9Aj7opqKN3aNkrsDLxTl9hvQbqHncWsRoUMlCMu6h9WISETRAkMF8ddHpF2JExKKWrLwfFaWP14KYFnSe4SPy9pv42o8EQdq98K5Zws9qxHsPZDQmynq6y5-AQ-_AQ3bC80FBF3aUwz8ZEHjKCDCQhBpDXTMSnLoa_FLhs4lfjnzIdGVnxuU6icNhEmiTCrTVyVGHL',
    imageAlt: 'Mathematics Course Image',
  },
  {
    title: 'Introduction to Physics',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3wnQiqNbOtOaksoL_5zNWAz2blWQwL6wbEPWXmuuq36TNHnOM4sENGgKN7_yhxTzcpNoJSVgrMseCWa2s0mNbQqtkC0FAJq41cT5ldmPPRsA95V1_HSIANK9qSd4ph933AXP_b5fCjOWmxR50hmBaSzDEsy74J-hArzUSZHxpeS2s9AXvsVlXuajokxs5VWuwqkOKqhx_6P3F6Lde_kFbuo1KAUiqJt2p6S59fm3RMQm8kMxuYMGVs9u8qUR9rS2IKdeC1gt7rhub',
    imageAlt: 'Physics Course Image',
  },
  {
    title: 'Creative Writing',
    instructor: 'Ms. Anya Sharma',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQuzKQjfxN2tGUa9ueUqiB5d5iihPIF-tcMbMVF81YOgnvZj93-p1ASC6XsZivk014D5H1TZLz3lSZwQi5DAajG_3DMQK3NhohbdkdjheHCGWyv70CMga5HvvAM5POAxPmN0Wb-HRw8r05VmL1Xs9Eg5-Raw3-BHKogq-9yvdwDoKevgyP3wh04dXmvTwzx2ugBSYFFjlMnyPov5THAgaIYRUpz_jHQVW5Gmy_EvavYp6eYjqXwNQWNaC1XwMdWWJueNF7doG62A23',
    imageAlt: 'Writing Course Image',
  },
  {
    title: 'Digital Art & Animation',
    instructor: 'Mr. Leo Carter',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQuzKQjfxN2tGUa9ueUqiB5d5iihPIF-tcMbMVF81YOgnvZj93-p1ASC6XsZivk014D5H1TZLz3lSZwQi5DAajG_3DMQK3NhohbdkdjheHCGWyv70CMga5HvvAM5POAxPmN0Wb-HRw8r05VmL1Xs9Eg5-Raw3-BHKogq-9yvdwDoKevgyP3wh04dXmvTwzx2ugBSYFFjlMnyPov5THAgaIYRUpz_jHQVW5Gmy_EvavYp6eYjqXwNQWNaC1XwMdWWJueNF7doG62A23',
    imageAlt: 'Writing Course Image',
  },
];

export default function MyCoursesPage() {
  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">My Courses</h1>
        <p className="text-muted-foreground">
          Here are all the subjects you're currently enrolled in.
        </p>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        {courses.map((course, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className="size-16 aspect-video bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url(${course.imageUrl})` }}
                    aria-label={course.imageAlt}
                  />
                  <div>
                    <h3 className="text-lg font-bold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Tutor: {course.instructor}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="gap-2 cursor-pointer">
                    <NotepadText className="h-4 w-4" />
                    View Assignments
                  </Button>
                  <Button variant="outline" className="gap-2 cursor-pointer">
                    <MonitorPlay className="h-4 w-4" />
                    Access Materials
                  </Button>
                  <Button className="gap-2 cursor-pointer">
                    <GraduationCap className="h-4 w-4" />
                    View Grades
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
