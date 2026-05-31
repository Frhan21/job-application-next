import prisma from "@/lib/prisma";
import { ApplicationStage } from "@prisma/client";

export const dashboardRepository = {
    async countJobs() {
        return await prisma.job.count();
    },

    async countCandidates() {
        return await prisma.candidate.count();
    },

    async countApplications() {
        return await prisma.application.count();
    },

    async countApplicationsByStage() {
        const result = await prisma.application.groupBy({
            by: ['stage'],
            _count: {
                stage: true,
            },
        });

        // Convert the result into a Map or Record for easier access
        const counts = {
            [ApplicationStage.APPLIED]: 0,
            [ApplicationStage.INTERVIEW]: 0,
            [ApplicationStage.HIRED]: 0,
        };

        result.forEach((item) => {
            counts[item.stage] = item._count.stage;
        });

        return counts;
    }
};
