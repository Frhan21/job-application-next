import prisma from "@/lib/prisma";
import { CreateCandidateInput, UpdateCandidateInput } from "../schemas/candidate.schema";

export const candidatesRepository = {
    async findAll() {
        return await prisma.candidate.findMany({
            include: {
                applications: {
                    include: {
                        job: {
                            select: {
                                title: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
    },

    async findById(id: string) {
        return await prisma.candidate.findUnique({
            where: { id },
            include: {
                applications: {
                    include: {
                        job: true,
                    }
                }
            }
        });
    },

    async findByEmail(email: string) {
        return await prisma.candidate.findUnique({
            where: { email },
        });
    },

    async create(data: CreateCandidateInput) {
        return await prisma.candidate.create({
            data,
        });
    },

    async update(id: string, data: UpdateCandidateInput) {
        return await prisma.candidate.update({
            where: { id },
            data,
        });
    },

    async delete(id: string) {
        return await prisma.candidate.delete({
            where: { id },
        });
    }
};
