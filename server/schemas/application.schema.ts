import { z } from "zod";


export const createApplicationSchema = z.object({
    candidateId: z.string().min(1, "Candidate is required"),
    jobId: z.string().min(1, "Job is required"),
    stage: z.enum(["APPLIED", "INTERVIEW", "HIRED"]),
});

export const updateApplicationStageSchema = z.object({
    stage: z.enum(["APPLIED", "INTERVIEW", "HIRED"]),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationStageInput = z.infer<typeof updateApplicationStageSchema>;
