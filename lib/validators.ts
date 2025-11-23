import { z } from 'zod';

// Organization
export const OrganizationCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});
export const OrganizationUpdateSchema = OrganizationCreateSchema.partial();

// User (server-side creation fields)
export const UserCreateSchema = z.object({
  clerkId: z.string().optional(),
  email: z.string().email(),
  fullName: z.string().nullable().optional(),
  role: z.enum(['STUDENT', 'TUTOR', 'SCHOOL_ADMIN', 'SUPER_ADMIN']).optional(),
  organizationId: z.string().uuid().optional(),
});
export const UserUpdateSchema = UserCreateSchema.partial();

// Subject
export const SubjectCreateSchema = z.object({
  title: z.string().min(1),
  code: z.string().optional(),
  grade: z.string().optional(),
  organizationId: z.string().uuid(),
});
export const SubjectUpdateSchema = SubjectCreateSchema.partial();

// Course
export const CourseCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  subjectId: z.string().uuid(),
});
export const CourseUpdateSchema = CourseCreateSchema.partial();

// Assignment
export const AssignmentCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  maxMarks: z.number().int().optional(),
  courseId: z.string().uuid(),
});
export const AssignmentUpdateSchema = AssignmentCreateSchema.partial();

// Submission
export const SubmissionCreateSchema = z.object({
  studentId: z.string().uuid(),
  assignmentId: z.string().uuid(),
  status: z.enum(['PENDING', 'GRADED', 'LATE']).optional(),
  grade: z.number().int().optional(),
  feedback: z.string().optional(),
  fileUrl: z.string().optional(),
});
export const SubmissionUpdateSchema = SubmissionCreateSchema.partial();

// Notification
export const NotificationCreateSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().min(1),
  body: z.string().optional(),
});
export const NotificationUpdateSchema = NotificationCreateSchema.partial();

// ContentUpload
export const ContentUploadCreateSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(['ASSIGNMENT', 'VIDEO', 'RESOURCE']).optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  url: z.string().optional(),
  subjectId: z.string().uuid().optional(),
});
export const ContentUploadUpdateSchema = ContentUploadCreateSchema.partial();

// Generic helper to return structured error messages from Zod
export function zodErrorMessage(err: unknown) {
  // Prefer the ZodError structure when possible
  if (err instanceof z.ZodError) {
    return err.errors.map((e) => e.message).join(', ');
  }
  // Fallback: try to extract `errors` property if present
  if (err && typeof err === 'object' && 'errors' in err) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (err as any).errors.map((e: any) => e.message).join(', ');
    } catch {
      return 'Invalid request payload';
    }
  }
  return String(err);
}

export default z;
