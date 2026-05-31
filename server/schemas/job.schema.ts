import { z } from "zod";
import { JobStatus } from "@prisma/client";

export const createJobSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    department: z.string().min(1, "Department is required").max(100),
    location: z.string().min(1, "Location is required").max(100),
    description: z.string().min(1, "Description is required"),
    status: z.nativeEnum(JobStatus),
});

export const updateJobSchema = createJobSchema.partial();

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
