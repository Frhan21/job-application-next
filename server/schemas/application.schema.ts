import { z } from "zod";
import { ApplicationStage } from "@prisma/client";

export const createApplicationSchema = z.object({
    candidateId: z.string().min(1, "Candidate is required"),
    jobId: z.string().min(1, "Job is required"),
    stage: z.nativeEnum(ApplicationStage),
});

export const updateApplicationStageSchema = z.object({
    stage: z.nativeEnum(ApplicationStage),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationStageInput = z.infer<typeof updateApplicationStageSchema>;
