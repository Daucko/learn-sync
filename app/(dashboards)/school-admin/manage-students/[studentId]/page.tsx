// app/school-admin/students/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  User,
  Trash2,
  Edit,
  Shield,
  Key,
  Plus,
} from 'lucide-react';
// import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AddSubjectDialog } from '@/components/dashboard/school-admin/AddSubjectDialog';

interface StudentProfileProps {
  params: {
    id: string;
  };
}

const mockStudentData = {
  id: '12345678',
  name: 'Jane Doe',
  email: 'jane.doe@email.com',
  phone: '(123) 456-7890',
  dateOfBirth: 'July 15, 2008',
  gradeLevel: '10',
  avatar: '/avatars/jane-doe.jpg',
  enrollmentStatus: 'active',
  enrollmentDate: 'August 1, 2023',
  parent: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(098) 765-4321',
  },
  enrolledSubjects: [
    { id: '1', name: 'Mathematics - Grade 10' },
    { id: '2', name: 'Physics - Grade 10' },
    { id: '3', name: 'Literature - Grade 10' },
    { id: '4', name: 'History - Grade 10' },
    { id: '5', name: 'Chemistry - Grade 10' },
  ],
};

export default function StudentProfile({ params }: StudentProfileProps) {
  const router = useRouter();
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] =
    useState(false);
  const [isAddSubjectDialogOpen, setIsAddSubjectDialogOpen] = useState(false);
  const [student, setStudent] = useState(mockStudentData);

  const handleBack = () => {
    router.push('/school-admin/students');
  };

  const handleEditStudent = () => {
    // Navigate to edit page or open edit modal
    console.log('Edit student:', student.id);
  };

  const handleSuspendStudent = () => {
    setIsSuspendDialogOpen(true);
  };

  const confirmSuspend = () => {
    // API call to suspend student
    console.log('Suspending student:', student.id);
    setIsSuspendDialogOpen(false);
  };

  const handleResetPassword = () => {
    setIsResetPasswordDialogOpen(true);
  };

  const confirmResetPassword = () => {
    // API call to reset password
    console.log('Resetting password for:', student.id);
    setIsResetPasswordDialogOpen(false);
  };

  const handleRemoveSubject = (subjectId: string) => {
    // API call to remove subject
    console.log('Removing subject:', subjectId);
    // Update local state
    setStudent((prev) => ({
      ...prev,
      enrolledSubjects: prev.enrolledSubjects.filter(
        (subject) => subject.id !== subjectId
      ),
    }));
  };

  const handleAddSubject = () => {
    setIsAddSubjectDialogOpen(true);
  };

  const handleSubjectAdded = (newSubjectData: any) => {
    // Handle the new subject data from the dialog
    console.log('New subject data:', newSubjectData);

    // Create a mock subject object to add to the student's enrolled subjects
    const newSubject = {
      id: Date.now().toString(),
      name: `${newSubjectData.subjectName} - Grade ${student.gradeLevel}`,
    };

    // Update local state with the new subject
    setStudent((prev) => ({
      ...prev,
      enrolledSubjects: [...prev.enrolledSubjects, newSubject],
    }));

    // You would typically make an API call here to enroll the student in the subject
    console.log(
      `Enrolling student ${student.name} in subject: ${newSubjectData.subjectName}`
    );
  };

  return (
    <div className="p-8 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={handleBack}
          className="text-primary hover:underline font-medium"
        >
          Students
        </button>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground font-medium">{student.name}</span>
      </div>

      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 bg-linear-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {student.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <p className="text-muted-foreground">Student ID: {student.id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Details & Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Details Card */}
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Personal Details */}
              <div>
                <h3 className="text-lg font-bold mb-4">Personal Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </div>
                    <span className="font-medium text-right">
                      {student.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>Phone</span>
                    </div>
                    <span className="font-medium text-right">
                      {student.phone}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Date of Birth</span>
                    </div>
                    <span className="font-medium text-right">
                      {student.dateOfBirth}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      <span>Grade Level</span>
                    </div>
                    <span className="font-medium text-right">
                      Grade {student.gradeLevel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-bold mb-4">Parent/Guardian</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>Name</span>
                    </div>
                    <span className="font-medium text-right">
                      {student.parent.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </div>
                    <span className="font-medium text-right">
                      {student.parent.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>Phone</span>
                    </div>
                    <span className="font-medium text-right">
                      {student.parent.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-bold mb-4">Status</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Enrollment</span>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Enrollment Date
                    </span>
                    <span className="font-medium">
                      {student.enrollmentDate}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600"
              onClick={handleEditStudent}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Student Info
            </Button>
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              onClick={handleSuspendStudent}
            >
              <Shield className="w-4 h-4 mr-2" />
              Suspend Student
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResetPassword}
            >
              <Key className="w-4 h-4 mr-2" />
              Reset Password
            </Button>
          </div>
        </div>

        {/* Right Column: Enrolled Subjects */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Enrolled Subjects</h3>
                <Button
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={handleAddSubject}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subject
                </Button>
              </div>

              {student.enrolledSubjects.length > 0 ? (
                <div className="space-y-4">
                  {student.enrolledSubjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium">{subject.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveSubject(subject.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <GraduationCap className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-bold">No Subjects Enrolled</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click &quot;Add Subject&quot; to enroll the student in a new
                    subject.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Subject Dialog */}
      <AddSubjectDialog
        open={isAddSubjectDialogOpen}
        onOpenChange={setIsAddSubjectDialogOpen}
        // You can pass additional props if needed, for example:
        // onSubjectAdded={handleSubjectAdded}
      />

      {/* Suspend Student Dialog */}
      <Dialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to suspend {student.name}? They will lose
              access to the platform until reactivated.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSuspendDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmSuspend}>
              Suspend Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog
        open={isResetPasswordDialogOpen}
        onOpenChange={setIsResetPasswordDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              This will reset {student.name}&apos;s password and send them a
              password reset email.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsResetPasswordDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmResetPassword}>Reset Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
