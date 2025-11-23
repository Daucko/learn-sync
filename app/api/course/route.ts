import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { CourseCreateSchema, zodErrorMessage } from '@/lib/validators';
import { ZodError } from 'zod';

type ApiError = {
  message: string;
  status?: number;
};

function handleError(error: unknown): ApiError {
  if (error instanceof ZodError) {
    return {
      message: zodErrorMessage(error) || 'Validation error',
      status: 422,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      status: 500,
    };
  }

  return {
    message: String(error),
    status: 500,
  };
}

export async function GET() {
  try {
    const items = await prisma.course.findMany();
    return ok(items);
  } catch (error: unknown) {
    const { message } = handleError(error);
    return err(message);
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const parsed = CourseCreateSchema.parse(body);
    const created = await prisma.course.create({ data: parsed });
    return ok(created);
  } catch (error: unknown) {
    const { message, status = 422 } = handleError(error);
    return err(message, status);
  }
}
