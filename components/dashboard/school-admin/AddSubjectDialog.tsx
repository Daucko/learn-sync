// components/add-subject-dialog.tsx
'use client';

import { useState } from 'react';
import { X, Search, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Teacher {
  id: string;
  name: string;
  email: string;
}

interface AddSubjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockTeachers: Teacher[] = [
  { id: '1', name: 'Olivia Chen', email: 'olivia.chen@school.edu' },
  { id: '2', name: 'Benjamin Carter', email: 'ben.carter@school.edu' },
  { id: '3', name: 'Aisha Khan', email: 'aisha.khan@school.edu' },
  { id: '4', name: 'Michael Brown', email: 'michael.brown@school.edu' },
  { id: '5', name: 'Sarah Johnson', email: 'sarah.johnson@school.edu' },
];

export function AddSubjectDialog({
  open,
  onOpenChange,
}: AddSubjectDialogProps) {
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectCode: '',
    gradeLevel: '',
    academicYear: '',
    description: '',
    maxStudents: '',
  });
  const [assignedTeachers, setAssignedTeachers] = useState<Teacher[]>([
    mockTeachers[0],
    mockTeachers[1],
  ]);
  const [teacherSearch, setTeacherSearch] = useState('');
  const [availableTeachers, setAvailableTeachers] = useState<Teacher[]>(
    mockTeachers.slice(2)
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTeacher = (teacher: Teacher) => {
    if (!assignedTeachers.find((t) => t.id === teacher.id)) {
      setAssignedTeachers((prev) => [...prev, teacher]);
      setAvailableTeachers((prev) => prev.filter((t) => t.id !== teacher.id));
      setTeacherSearch('');
    }
  };

  const handleRemoveTeacher = (teacherId: string) => {
    const teacher = assignedTeachers.find((t) => t.id === teacherId);
    if (teacher) {
      setAssignedTeachers((prev) => prev.filter((t) => t.id !== teacherId));
      setAvailableTeachers((prev) => [...prev, teacher]);
    }
  };

  const filteredTeachers = availableTeachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
      teacher.email.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form data:', formData);
    console.log('Assigned teachers:', assignedTeachers);
    // You would typically make an API call here
    onOpenChange(false);
    // Reset form
    setFormData({
      subjectName: '',
      subjectCode: '',
      gradeLevel: '',
      academicYear: '',
      description: '',
      maxStudents: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add New Subject
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new subject.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject Name */}
            <div className="space-y-2">
              <Label htmlFor="subjectName">Subject Name</Label>
              <Input
                id="subjectName"
                placeholder="e.g., Advanced Biology"
                value={formData.subjectName}
                onChange={(e) =>
                  handleInputChange('subjectName', e.target.value)
                }
                required
              />
            </div>

            {/* Subject Code */}
            <div className="space-y-2">
              <Label htmlFor="subjectCode">Subject Code</Label>
              <Input
                id="subjectCode"
                placeholder="e.g., BIO-101"
                value={formData.subjectCode}
                onChange={(e) =>
                  handleInputChange('subjectCode', e.target.value)
                }
                required
              />
            </div>

            {/* Grade Level */}
            <div className="space-y-2">
              <Label htmlFor="gradeLevel">Grade Level</Label>
              <Select
                value={formData.gradeLevel}
                onValueChange={(value) =>
                  handleInputChange('gradeLevel', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9th">9th Grade</SelectItem>
                  <SelectItem value="10th">10th Grade</SelectItem>
                  <SelectItem value="11th">11th Grade</SelectItem>
                  <SelectItem value="12th">12th Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Academic Year */}
            <div className="space-y-2">
              <Label htmlFor="academicYear">Academic Year</Label>
              <Select
                value={formData.academicYear}
                onValueChange={(value) =>
                  handleInputChange('academicYear', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select academic year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2025-2026">2025-2026</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter a brief description of the subject..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                className="min-h-24"
              />
            </div>

            {/* Assign Teachers */}
            <div className="space-y-2 md:col-span-2">
              <Label>Assign Teacher(s)</Label>
              <div className="space-y-3">
                {/* Selected Teachers */}
                <div className="flex flex-wrap gap-2">
                  {assignedTeachers.map((teacher) => (
                    <Badge
                      key={teacher.id}
                      variant="secondary"
                      className="bg-green-100 text-green-800 hover:bg-green-200"
                    >
                      {teacher.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveTeacher(teacher.id)}
                        className="ml-1 hover:text-green-600"
                      >
                        <UserX className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                {/* Teacher Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search and select teachers..."
                    value={teacherSearch}
                    onChange={(e) => setTeacherSearch(e.target.value)}
                    className="pl-10"
                  />

                  {/* Search Results */}
                  {teacherSearch && filteredTeachers.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredTeachers.map((teacher) => (
                        <button
                          key={teacher.id}
                          type="button"
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex flex-col"
                          onClick={() => handleAddTeacher(teacher)}
                        >
                          <span className="font-medium">{teacher.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {teacher.email}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Max Students */}
            <div className="space-y-2">
              <Label htmlFor="maxStudents">
                Max Students{' '}
                <span className="text-muted-foreground">(Optional)</span>
              </Label>
              <Input
                id="maxStudents"
                type="number"
                placeholder="Enter capacity limit"
                value={formData.maxStudents}
                onChange={(e) =>
                  handleInputChange('maxStudents', e.target.value)
                }
                min="1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Add Subject
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
