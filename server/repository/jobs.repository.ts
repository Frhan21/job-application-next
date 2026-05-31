import prisma from "@/lib/prisma";
import { JobStatus } from "@prisma/client";
import { CreateJobInput, UpdateJobInput } from "../schemas/job.schema";

export const jobsRepository = {
    async findAll(search?: string, status?: JobStatus) {
        return await prisma.job.findMany({
            where: {
                ...(search ? {
                    title: {
                        contains: search,
                        mode: 'insensitive',
                    }
                } : {}),
                ...(status ? { status } : {}),
            },
            include: {
                _count: {
                    select: { applications: true }
                }
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
    },

    async findById(id: string) {
        return await prisma.job.findUnique({
            where: { id },
        });
    },

    async create(data: CreateJobInput, userId: string) {
        return await prisma.job.create({
            data: {
                ...data,
                createdById: userId,
            },
        });
    },

    async update(id: string, data: UpdateJobInput) {
        return await prisma.job.update({
            where: { id },
            data,
        });
    },

    async delete(id: string) {
        return await prisma.job.delete({
            where: { id },
        });
    }
};
