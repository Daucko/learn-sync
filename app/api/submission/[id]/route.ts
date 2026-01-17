import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { z } from 'zod';

const GradeSchema = z.object({
  grade: z.number().min(0).max(100),
  feedback: z.string().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { role, userId } = session;
    const { id } = await params;

    // Validate body
    const body = await req.json();
    const { grade, feedback } = GradeSchema.parse(body);

    // Check permissions
    // If Tutor, ensure they are associated with the subject of this submission
    if (role === 'TUTOR') {
      const submission = await prisma.submission.findUnique({
        where: { id },
        include: {
          assignment: {
            include: {
              course: {
                include: {
                  subject: {
                    include: {
                      tutors: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!submission) {
        return err('Submission not found', 404);
      }

      const isTutorForSubject = submission.assignment.course.subject.tutors.some(
        (tutor) => tutor.id === userId
      );

      if (!isTutorForSubject) {
        return err('Unauthorized to grade this submission', 403);
      }
    }

    const updated = await prisma.submission.update({
      where: { id },
      data: {
        grade,
        feedback,
        status: 'GRADED',
      },
    });

    return ok(updated);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(message || 'Error updating submission');
  }
}
