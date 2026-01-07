import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword(password: string) {
    return bcrypt.hash(password, 10);
}

async function main() {
    console.log('Seeding database...');

    // 1. Create Organizations
    const org1 = await prisma.organization.upsert({
        where: { id: '00000000-0000-0000-0000-000000000001' },
        update: {},
        create: {
            id: '00000000-0000-0000-0000-000000000001',
            name: 'Northwood High School',
            email: 'info@northwood.edu',
            phone: '(123) 456-7890',
            address: '123 Education Lane, Irvine, CA',
        },
    });

    const org2 = await prisma.organization.upsert({
        where: { id: '00000000-0000-0000-0000-000000000002' },
        update: {},
        create: {
            id: '00000000-0000-0000-0000-000000000002',
            name: 'Canyon University',
            email: 'admin@canyon.edu',
            phone: '(987) 654-3210',
            address: '456 Campus Drive, Phoenix, AZ',
        },
    });

    const org3 = await prisma.organization.upsert({
        where: { id: '00000000-0000-0000-0000-000000000003' },
        update: {},
        create: {
            id: '00000000-0000-0000-0000-000000000003',
            name: 'Oakridge International Academy',
            email: 'contact@oakridge.edu',
            phone: '(555) 123-4567',
            address: '789 Academy Road, Austin, TX',
        },
    });

    console.log('Organizations created.');

    // 2. Create Users
    const passwordHash = await hashPassword('password123');

    // Super Admin
    await prisma.user.upsert({
        where: { email: 'superadmin@learnsync.com' },
        update: {},
        create: {
            email: 'superadmin@learnsync.com',
            passwordHash,
            fullName: 'Super Admin User',
            role: UserRole.SUPER_ADMIN,
            emailVerified: true,
        },
    });

    // School Admins
    await prisma.user.upsert({
        where: { email: 'admin1@northwood.edu' },
        update: {},
        create: {
            email: 'admin1@northwood.edu',
            passwordHash,
            fullName: 'John Northwood',
            role: UserRole.SCHOOL_ADMIN,
            organizationId: org1.id,
            emailVerified: true,
        },
    });

    await prisma.user.upsert({
        where: { email: 'admin2@canyon.edu' },
        update: {},
        create: {
            email: 'admin2@canyon.edu',
            passwordHash,
            fullName: 'Sarah Canyon',
            role: UserRole.SCHOOL_ADMIN,
            organizationId: org2.id,
            emailVerified: true,
        },
    });

    // Tutors
    await prisma.user.upsert({
        where: { email: 'math.tutor@northwood.edu' },
        update: {},
        create: {
            email: 'math.tutor@northwood.edu',
            passwordHash,
            fullName: 'Isaac Newton',
            role: UserRole.TUTOR,
            organizationId: org1.id,
            emailVerified: true,
        },
    });

    await prisma.user.upsert({
        where: { email: 'physics.tutor@canyon.edu' },
        update: {},
        create: {
            email: 'physics.tutor@canyon.edu',
            passwordHash,
            fullName: 'Albert Einstein',
            role: UserRole.TUTOR,
            organizationId: org2.id,
            emailVerified: true,
        },
    });

    // Students
    await prisma.user.upsert({
        where: { email: 'student1@northwood.edu' },
        update: {},
        create: {
            email: 'student1@northwood.edu',
            passwordHash,
            fullName: 'Alice Smith',
            role: UserRole.STUDENT,
            organizationId: org1.id,
            emailVerified: true,
        },
    });

    await prisma.user.upsert({
        where: { email: 'student2@canyon.edu' },
        update: {},
        create: {
            email: 'student2@canyon.edu',
            passwordHash,
            fullName: 'Bob Brown',
            role: UserRole.STUDENT,
            organizationId: org2.id,
            emailVerified: true,
        },
    });

    console.log('Users created.');
    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
