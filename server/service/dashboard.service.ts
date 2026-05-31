import { dashboardRepository } from "../repository/dashboard.repository";

export const dashboardService = {
    async getStats() {
        const [totalJobs, totalCandidates, totalApplications] = await Promise.all([
            dashboardRepository.countJobs(),
            dashboardRepository.countCandidates(),
            dashboardRepository.countApplications(),
        ]);

        return {
            totalJobs,
            totalCandidates,
            totalApplications,
        };
    },

    async getPipelineSummary() {
        return await dashboardRepository.countApplicationsByStage();
    }
};
