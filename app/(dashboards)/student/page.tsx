// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
// import {
//   Calculator,
//   Beaker,
//   PenTool,
//   Calendar,
//   Video,
//   CheckCircle,
// } from 'lucide-react';

// const courses = [
//   {
//     title: 'Advanced Mathematics',
//     instructor: 'Dr. Evelyn Reed',
//     progress: 75,
//     icon: Calculator,
//     imageUrl:
//       'https://lh3.googleusercontent.com/aida-public/AB6AXuBwGWPE0UsoKnKO5nhMhJY83hLWe3mIF9Dz3jzwGhmbZxeXDmk6ecQsQVRO3uOVTU-W86BQqO9Aj7opqKN3aNkrsDLxTl9hvQbqHncWsRoUMlCMu6h9WISETRAkMF8ddHpF2JExKKWrLwfFaWP14KYFnSe4SPy9pv42o8EQdq98K5Zws9qxHsPZDQmynq6y5-AQ-_AQ3bC80FBF3aUwz8ZEHjKCDCQhBpDXTMSnLoa_FLhs4lfjnzIdGVnxuU6icNhEmiTCrTVyVGHL',
//     imageAlt: 'Mathematics Course Image',
//   },
//   {
//     title: 'Introduction to Physics',
//     instructor: 'Prof. David Chen',
//     progress: 50,
//     icon: Beaker,
//     imageUrl:
//       'https://lh3.googleusercontent.com/aida-public/AB6AXuC3wnQiqNbOtOaksoL_5zNWAz2blWQwL6wbEPWXmuuq36TNHnOM4sENGgKN7_yhxTzcpNoJSVgrMseCWa2s0mNbQqtkC0FAJq41cT5ldmPPRsA95V1_HSIANK9qSd4ph933AXP_b5fCjOWmxR50hmBaSzDEsy74J-hArzUSZHxpeS2s9AXvsVlXuajokxs5VWuwqkOKqhx_6P3F6Lde_kFbuo1KAUiqJt2p6S59fm3RMQm8kMxuYMGVs9u8qUR9rS2IKdeC1gt7rhub',
//     imageAlt: 'Physics Course Image',
//   },
//   {
//     title: 'Creative Writing',
//     instructor: 'Ms. Anya Sharma',
//     progress: 90,
//     icon: PenTool,
//     imageUrl:
//       'https://lh3.googleusercontent.com/aida-public/AB6AXuBQuzKQjfxN2tGUa9ueUqiB5d5iihPIF-tcMbMVF81YOgnvZj93-p1ASC6XsZivk014D5H1TZLz3lSZwQi5DAajG_3DMQK3NhohbdkdjheHCGWyv70CMga5HvvAM5POAxPmN0Wb-HRw8r05VmL1Xs9Eg5-Raw3-BHKogq-9yvdwDoKevgyP3wh04dXmvTwzx2ugBSYFFjlMnyPov5THAgaIYRUpz_jHQVW5Gmy_EvavYp6eYjqXwNQWNaC1XwMdWWJueNF7doG62A23',
//     imageAlt: 'Writing Course Image',
//   },
// ];

// const assignments = [
//   {
//     title: 'Calculus Problem Set 3',
//     course: 'Advanced Mathematics',
//     dueDate: 'Oct 28',
//     icon: Calculator,
//   },
//   {
//     title: 'Lab Report: Kinematics',
//     course: 'Introduction to Physics',
//     dueDate: 'Nov 02',
//     icon: Beaker,
//   },
//   {
//     title: 'Short Story Draft',
//     course: 'Creative Writing',
//     dueDate: 'Nov 05',
//     icon: PenTool,
//   },
// ];

// const notifications = [
//   {
//     title: 'New video tutorial uploaded for Physics.',
//     time: '2 hours ago',
//     icon: Video,
//   },
//   {
//     title: 'Grades for your Math essay are now available.',
//     time: '1 day ago',
//     icon: CheckCircle,
//   },
//   {
//     title: 'New assignment posted for Creative Writing.',
//     time: '3 days ago',
//     icon: Calendar,
//   },
// ];

// export default function DashboardPage() {
//   return (
//     <div className="space-y-8">
//       {/* Welcome Section */}
//       <div className="flex flex-col gap-2">
//         <h1 className="text-4xl font-bold">Welcome back, Alex!</h1>
//         <p className="text-muted-foreground">
//           Here's a summary of your academic progress.
//         </p>
//       </div>

//       {/* My Courses Section */}
//       <div>
//         <h2 className="text-2xl font-bold pb-4">My Courses</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((course, index) => (
//             <Card key={index} className="overflow-hidden">
//               <div
//                 className="w-full aspect-video bg-cover bg-center rounded-t-lg"
//                 style={{ backgroundImage: `url(${course.imageUrl})` }}
//                 aria-label={course.imageAlt}
//               />
//               <CardContent className="p-4">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h3 className="font-semibold">{course.title}</h3>
//                     <p className="text-sm text-muted-foreground">
//                       {course.instructor}
//                     </p>
//                   </div>
//                   <course.icon className="h-5 w-5 text-secondary" />
//                 </div>
//                 <div className="mt-4 space-y-2">
//                   <Progress value={course.progress} className="h-2" />
//                   <p className="text-xs text-muted-foreground">
//                     {course.progress}% complete
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Assignments & Notifications Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Upcoming Assignments */}
//         <div className="lg:col-span-2 space-y-4">
//           <h2 className="text-2xl font-bold">Upcoming Assignments</h2>
//           {assignments.map((assignment, index) => (
//             <Card key={index}>
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="p-2 bg-accent/10 rounded-lg">
//                       <assignment.icon className="h-6 w-6 text-secondary" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold">{assignment.title}</h3>
//                       <p className="text-sm text-muted-foreground">
//                         {assignment.course} - Due: {assignment.dueDate}
//                       </p>
//                     </div>
//                   </div>
//                   <Button>View Details</Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Recent Notifications */}
//         <div className="space-y-4">
//           <h2 className="text-2xl font-bold">Recent Notifications</h2>
//           {notifications.map((notification, index) => (
//             <Card key={index}>
//               <CardContent className="p-4">
//                 <div className="flex gap-4">
//                   <notification.icon className="h-5 w-5 text-secondary mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium">{notification.title}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {notification.time}
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// app/student/dashboard/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Calendar,
  BarChart3,
  Mail,
  Bell,
  Download,
  Upload,
  Eye,
  Award,
  XCircle,
  Megaphone,
  Library,
  GraduationCap,
} from 'lucide-react';

export default function StudentDashboard() {
  const enrolledSubjects = [
    {
      title: 'Introduction to Design',
      code: 'DES101',
      instructor: 'Prof. Alex Johnson',
      progress: 75,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDCiCEvIxSmwktx7Ahf_sPJ73IHMgG1CBs6IQGxmAXkOJbGo_2vHXSRMINOF2V2l_lQakgyvnq8W8cNtBQ4jz26pI_gwZ2yrGetO7vjecY4r6VaMznCWNmSCBRor2MlDPI4PFQXY-2jzgllfVeyjOPqS6_kQ2hOj8eL8reRiqXNgyAIAN5dHv3GGijfrQCbNpGyv8aW-m6edu8w8o19KnzRb7crJrCHWDTJx3C6fT3avZldRiBehaQcm8dm0ryRf7DSNZlx6zeYrJoy',
    },
    {
      title: 'Advanced Mathematics',
      code: 'MTH203',
      instructor: 'Dr. Emily Carter',
      progress: 40,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuADbezlBrKmln9E8XWPcPTYDQX8manIIVscjf-CIU50VjT4Bg0Xv6t5898bdcGeY5v3S9J9ktKFOBUop-boycaT-htBt3aGH3XsRPgRT5ruMuH8oz8y2ok8ZO_I_lDX6a9rXkR9V3HI6PlrAZXwosi-2uGj2zfF_xMnzbqiT1rcvP3_odAS1U8ORB2v9zMnt1VyLGyJ_aDZdQYCpT75_qkYf7YT0MSxS7_PNXJclCygyXYwu1Tig5L98j5f1RKSpegOLAvqBMGRuY7i',
    },
  ];

  const assignments = [
    {
      title: 'Design Principles Essay',
      course: 'DES101',
      dueDate: 'Due in 3 days',
      status: 'pending',
      graded: false,
    },
    {
      title: 'Calculus Problem Set 2',
      course: 'MTH203',
      dueDate: 'Due in 5 days',
      status: 'pending',
      graded: false,
    },
    {
      title: 'Research Paper Outline',
      course: 'DES101',
      dueDate: 'Graded: A-',
      status: 'completed',
      graded: true,
    },
  ];

  const notifications = [
    {
      type: 'grade',
      title: 'New grade posted',
      message: 'Your essay for DES101 was graded.',
      icon: Award,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      type: 'canceled',
      title: 'Class Canceled',
      message: 'MTH203 for tomorrow is canceled.',
      icon: XCircle,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
    },
    {
      type: 'event',
      title: 'Campus Event',
      message: 'Join the career fair this Friday.',
      icon: Megaphone,
      iconColor: 'text-gray-500',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
      muted: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Olivia!</p>
        </div>

        {/* Current Session Info */}
        <Card className="w-full lg:w-auto">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Session</p>
                <p className="font-bold text-lg">Fall 2024</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-sm text-muted-foreground">Term Dates</p>
                <p className="font-bold text-lg">Sep 1 - Dec 15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          {/* Enrolled Subjects */}
          <section>
            <h2 className="text-xl font-bold mb-4">Enrolled Subjects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledSubjects.map((subject, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className="w-full h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url(${subject.image})` }}
                  />
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold">{subject.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {subject.code} - {subject.instructor}
                    </p>

                    <div className="mt-4 space-y-2">
                      <Progress value={subject.progress} className="h-2" />
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                          Progress
                        </p>
                        <p className="text-sm font-semibold">
                          {subject.progress}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Upcoming Assignments */}
          <section>
            <h2 className="text-xl font-bold mb-4">Upcoming Assignments</h2>
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          assignment.status === 'completed'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600'
                            : 'bg-orange-100 dark:bg-orange-900/20 text-orange-600'
                        }`}
                      >
                        <GraduationCap className="w-5 h-5" />
                      </div>

                      <div className="grow">
                        <p className="font-bold">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {assignment.course} - {assignment.dueDate}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {assignment.graded ? (
                          <Button className="bg-green-600 hover:bg-green-700">
                            <Eye className="w-4 h-4 mr-2" />
                            View Grade
                          </Button>
                        ) : (
                          <>
                            <Button variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button className="bg-orange-500 hover:bg-orange-600">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-8">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Notifications</CardTitle>
                <div className="relative">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs">
                    2
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 ${
                    notification.muted ? 'opacity-60' : ''
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-lg mt-0.5 ${notification.bgColor}`}
                  >
                    <notification.icon
                      className={`w-4 h-4 ${notification.iconColor}`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Resources Card */}
          <Card className="bg-linear-to-br from-green-500 to-green-700 text-white">
            <CardContent className="p-6 text-center">
              <Library className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2">Access Resources</h3>
              <p className="text-sm opacity-80 mb-4">
                Watch video tutorials and animated instructions for your
                courses.
              </p>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Browse Videos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
