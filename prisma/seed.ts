import { JobStatus, ApplicationStage } from '@prisma/client';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';

async function main() {
    console.log('Seeding database...');

    // 1. Create Admin User
    const hashedPassword = await bcrypt.hash('password123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@recruit.com' },
        update: {},
        create: {
            name: 'Admin User',
            email: 'admin@recruit.com',
            password: hashedPassword,
        },
    });
    console.log(`Created admin user: ${admin.email}`);

    // 2. Create Jobs
    const jobsData = [
        { title: 'Frontend Developer', department: 'Engineering', location: 'Remote', description: 'React and Next.js developer needed.', status: JobStatus.OPEN },
        { title: 'Backend Developer', department: 'Engineering', location: 'New York', description: 'Node.js and PostgreSQL expert.', status: JobStatus.OPEN },
        { title: 'UI/UX Designer', department: 'Design', location: 'London', description: 'Create beautiful user experiences.', status: JobStatus.OPEN },
    ];

    const createdJobs = [];
    for (const job of jobsData) {
        const createdJob = await prisma.job.create({
            data: {
                ...job,
                createdById: admin.id,
            }
        });
        createdJobs.push(createdJob);
    }
    console.log(`Created 3 jobs`);

    // 3. Create Candidates
    const candidatesData = [
        { fullName: 'Alice Smith', email: 'alice@example.com', phone: '+1234567890' },
        { fullName: 'Bob Johnson', email: 'bob@example.com', phone: '+1987654321' },
        { fullName: 'Charlie Brown', email: 'charlie@example.com', phone: '+1122334455' },
        { fullName: 'Diana Prince', email: 'diana@example.com', phone: '+1555666777' },
        { fullName: 'Ethan Hunt', email: 'ethan@example.com', phone: '+1999888777' },
        { fullName: 'Fiona Gallagher', email: 'fiona@example.com', phone: '+1444333222' },
        { fullName: 'George Costanza', email: 'george@example.com', phone: '+1777888999' },
        { fullName: 'Hannah Montana', email: 'hannah@example.com', phone: '+1222333444' },
        { fullName: 'Ian Malcolm', email: 'ian@example.com', phone: '+1888777666' },
        { fullName: 'Jane Doe', email: 'jane@example.com', phone: '+1666555444' },
    ];

    const createdCandidates = [];
    for (const candidate of candidatesData) {
        const createdCandidate = await prisma.candidate.upsert({
            where: { email: candidate.email },
            update: {},
            create: candidate,
        });
        createdCandidates.push(createdCandidate);
    }
    console.log(`Created 10 candidates`);

    // 4. Create Applications (7 APPLIED, 5 INTERVIEW, 3 HIRED)
    const applicationsData = [
        // APPLIED (7)
        { candidate: 0, job: 0, stage: ApplicationStage.APPLIED },
        { candidate: 1, job: 1, stage: ApplicationStage.APPLIED },
        { candidate: 2, job: 2, stage: ApplicationStage.APPLIED },
        { candidate: 3, job: 0, stage: ApplicationStage.APPLIED },
        { candidate: 4, job: 1, stage: ApplicationStage.APPLIED },
        { candidate: 5, job: 2, stage: ApplicationStage.APPLIED },
        { candidate: 6, job: 0, stage: ApplicationStage.APPLIED },
        
        // INTERVIEW (5)
        { candidate: 7, job: 0, stage: ApplicationStage.INTERVIEW },
        { candidate: 8, job: 1, stage: ApplicationStage.INTERVIEW },
        { candidate: 9, job: 2, stage: ApplicationStage.INTERVIEW },
        { candidate: 0, job: 1, stage: ApplicationStage.INTERVIEW },
        { candidate: 1, job: 2, stage: ApplicationStage.INTERVIEW },
        
        // HIRED (3)
        { candidate: 2, job: 0, stage: ApplicationStage.HIRED },
        { candidate: 3, job: 1, stage: ApplicationStage.HIRED },
        { candidate: 4, job: 2, stage: ApplicationStage.HIRED },
    ];

    let appCount = 0;
    for (const app of applicationsData) {
        // Prevent duplicate application error during re-seeding
        const existing = await prisma.application.findFirst({
            where: {
                candidateId: createdCandidates[app.candidate].id,
                jobId: createdJobs[app.job].id,
            }
        });

        if (!existing) {
            await prisma.application.create({
                data: {
                    candidateId: createdCandidates[app.candidate].id,
                    jobId: createdJobs[app.job].id,
                    stage: app.stage,
                }
            });
            appCount++;
        }
    }
    console.log(`Created ${appCount} new applications`);

    console.log('Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
