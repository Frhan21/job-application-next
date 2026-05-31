import { jobsRepository } from "../repository/jobs.repository";
import { CreateJobInput, UpdateJobInput, createJobSchema, updateJobSchema } from "../schemas/job.schema";
import { JobStatus } from "@prisma/client";

export const jobsService = {
    async getJobs(search?: string, status?: string) {
        // Validate status parameter if provided
        let validStatus: JobStatus | undefined;
        if (status && Object.values(JobStatus).includes(status as JobStatus)) {
            validStatus = status as JobStatus;
        }

        return await jobsRepository.findAll(search, validStatus);
    },

    async getJobById(id: string) {
        const job = await jobsRepository.findById(id);
        if (!job) {
            throw new Error("Job not found");
        }
        return job;
    },

    async createJob(data: CreateJobInput, userId: string) {
        const parsed = createJobSchema.parse(data);
        return await jobsRepository.create(parsed, userId);
    },

    async updateJob(id: string, data: UpdateJobInput) {
        const parsed = updateJobSchema.parse(data);
        // Verify existence
        await this.getJobById(id);
        return await jobsRepository.update(id, parsed);
    },

    async deleteJob(id: string) {
        // Verify existence
        await this.getJobById(id);
        return await jobsRepository.delete(id);
    }
};
