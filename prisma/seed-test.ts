import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const org = await prisma.organization.findFirst();
    if (!org) throw new Error("No organization found");

    const subject = await prisma.subject.upsert({
        where: { code: 'DES101' },
        update: {},
        create: {
            title: 'Introduction to Design',
            code: 'DES101',
            organizationId: org.id,
        }
    });

    const course = await prisma.course.create({
        data: {
            title: 'Design 101 - Fall 2024',
            subjectId: subject.id,
        }
    });

    const assignment = await prisma.assignment.create({
        data: {
            title: 'Design Principles Essay',
            description: 'Write a 500-word essay on design principles.',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            courseId: course.id,
        }
    });

    console.log(`Created assignment: ${assignment.id}`);
}

main().finally(() => prisma.$disconnect());
