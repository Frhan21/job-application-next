import prisma from "@/lib/prisma";
import { ApplicationStage } from "@prisma/client";
import { CreateApplicationInput } from "../schemas/application.schema";

export const applyRepository = {
    async findAll() {
        return await prisma.application.findMany({
            include: {
                candidate: true,
                job: true,
            },
            orderBy: {
                appliedAt: 'desc',
            }
        });
    },

    async findById(id: string) {
        return await prisma.application.findUnique({
            where: { id },
            include: {
                candidate: true,
                job: true,
            }
        });
    },

    async findByCandidateAndJob(candidateId: string, jobId: string) {
        return await prisma.application.findFirst({
            where: {
                candidateId,
                jobId,
            }
        });
    },

    async create(data: CreateApplicationInput) {
        return await prisma.application.create({
            data,
        });
    },

    async updateStage(id: string, stage: ApplicationStage) {
        return await prisma.application.update({
            where: { id },
            data: { stage },
        });
    },

    async delete(id: string) {
        return await prisma.application.delete({
            where: { id },
        });
    }
};
