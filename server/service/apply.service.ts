import { applyRepository } from "../repository/apply.repository";
import { CreateApplicationInput, createApplicationSchema, updateApplicationStageSchema } from "../schemas/application.schema";
import { ApplicationStage } from "@prisma/client";

export const applyService = {
    async getApplications() {
        return await applyRepository.findAll();
    },

    async getApplicationById(id: string) {
        const application = await applyRepository.findById(id);
        if (!application) {
            throw new Error("Application not found");
        }
        return application;
    },

    async createApplication(data: CreateApplicationInput) {
        const parsed = createApplicationSchema.parse(data);
        
        // Prevent duplicate applications for the same job by the same candidate
        const existing = await applyRepository.findByCandidateAndJob(parsed.candidateId, parsed.jobId);
        if (existing) {
            throw new Error("Candidate has already applied for this job");
        }
        
        return await applyRepository.create(parsed);
    },

    async updateApplicationStage(id: string, stage: ApplicationStage) {
        const parsed = updateApplicationStageSchema.parse({ stage });
        
        // Verify existence
        await this.getApplicationById(id);
        
        return await applyRepository.updateStage(id, parsed.stage);
    },

    async deleteApplication(id: string) {
        // Verify existence
        await this.getApplicationById(id);
        
        return await applyRepository.delete(id);
    }
};
