import prisma from "@/lib/prisma";
import type { ApplicationStage } from "@/server/types";

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

    async countApplicationsByStage(): Promise<Record<ApplicationStage, number>> {
        const result = await prisma.application.groupBy({
            by: ['stage'],
            _count: {
                stage: true,
            },
        });

        const counts: Record<ApplicationStage, number> = {
            "APPLIED": 0,
            "INTERVIEW": 0,
            "HIRED": 0,
        };

        result.forEach((item) => {
            counts[item.stage as ApplicationStage] = item._count.stage;
        });

        return counts;
    }
};
