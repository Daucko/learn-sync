// app/student/profile/page.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data
const studentData = {
  name: 'Amelia Johnson',
  email: 'amelia.j@email.com',
  studentId: '123456',
  grade: 'Grade 10',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBL-JMJIEPZan6QU5c64LAxWEur6-hunZyXaTH5Y0X0Vv0kQ4NiihugGuOLDyViPn9yjtewEsKSXVfiP-96MWbazsSiinEE3ARjAtuDs7BJo8b9f6FgKaatEhXoxJya61a37Y3TX-TBD5tQyJto9mGWyG2YFvPzwrwDNWKgDXS4lVR5AAV9W5RyLvRvvgNqnLwSft6_jFQui0yoHLdfpFXv96ebLVpSmDgtb-T1l2FH-MGE_5RjlMoH58UB2aog0gzXdkJv1jpKhTi_',
  dateOfBirth: 'October 22, 2008',
  parentGuardian: 'Maria Johnson',
  enrollmentStatus: 'Active',
  emergencyContact: '(555) 987-6543',
  assignmentsSubmitted: 24,
  averageGrade: 88,
  enrolledSubjects: [
    {
      name: 'Mathematics',
      tutor: 'Mr. David Chen',
    },
    {
      name: 'English Literature',
      tutor: 'Ms. Sarah Jenkins',
    },
    {
      name: 'Physics',
      tutor: 'Dr. Emily Carter',
    },
  ],
};

export default function StudentProfile() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center text-primary">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold">LearnSync</h2>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-sm font-medium">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              Assignments
            </Button>
            <Button variant="ghost" className="text-sm font-bold text-primary">
              My Profile
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              Grades
            </Button>
          </nav>

          <div className="flex items-center gap-4">
            <div
              className="h-10 w-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXmxs3V4XdT79ayFSNL81YDP9MyRJnDSXZ2BAupqyMBaqm5kjndyjca3EFXSs7GTMnSvy9jnvfqFt1E516G9I5lAVG8B4tMVjHzJOcj1p06mcHyioTjMajjesFferrbQ3THM2-DorQ5RGYQIp_VVBeGINGNiJE9cwoUTfoczWtWXeJktLMV0mLoRB-DruncjKG73oGMtkBjUkUGebADvvdrWkoYZ1zgwaRoOQ_7Vsvw_Z_8Jg1_5vwu6EOenwaZnr0OBA78bT-ms-I')`,
              }}
            />
          </div>
        </div>
      </header> */}

      <main className="container py-8">
        <div className="flex flex-col gap-8">
          {/* Page Heading */}
          <div>
            <h1 className="text-4xl font-black tracking-tight">My Profile</h1>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Profile Card */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div
                    className="w-32 h-32 rounded-full bg-cover bg-center mb-4 ring-4 ring-primary/20"
                    style={{ backgroundImage: `url('${studentData.avatar}')` }}
                  />
                  <h2 className="text-2xl font-bold">{studentData.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Student ID: {studentData.studentId} | {studentData.grade}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {studentData.email}
                  </p>

                  <div className="flex w-full gap-3 mt-6">
                    <Button variant="outline" className="flex-1">
                      <span className="mr-2">✏️</span>
                      Edit Profile
                    </Button>
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                      <span className="mr-2">🔒</span>
                      Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Information Panels */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Personal Details Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Personal Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    <div className="flex flex-col gap-1 border-t py-4">
                      <p className="text-sm text-muted-foreground">
                        Date of Birth
                      </p>
                      <p className="text-sm font-medium">
                        {studentData.dateOfBirth}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 border-t py-4">
                      <p className="text-sm text-muted-foreground">
                        Parent/Guardian
                      </p>
                      <p className="text-sm font-medium">
                        {studentData.parentGuardian}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 border-t py-4">
                      <p className="text-sm text-muted-foreground">
                        Enrollment Status
                      </p>
                      <Badge variant="default" className="w-fit">
                        {studentData.enrollmentStatus}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-1 border-t py-4">
                      <p className="text-sm text-muted-foreground">
                        Emergency Contact
                      </p>
                      <p className="text-sm font-medium">
                        {studentData.emergencyContact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Summary Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Progress Summary</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                      <p className="text-primary text-5xl font-black">
                        {studentData.assignmentsSubmitted}
                      </p>
                      <p className="text-sm font-medium mt-1 text-muted-foreground">
                        Assignments Submitted
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                      <p className="text-primary text-5xl font-black">
                        {studentData.averageGrade}%
                      </p>
                      <p className="text-sm font-medium mt-1 text-muted-foreground">
                        Average Grade
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enrolled Subjects Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Enrolled Subjects</h3>
                  <div className="space-y-3">
                    {studentData.enrolledSubjects.map((subject, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                      >
                        <div>
                          <p className="font-semibold">{subject.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Tutor: {subject.tutor}
                          </p>
                        </div>
                        <span className="text-muted-foreground">→</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
