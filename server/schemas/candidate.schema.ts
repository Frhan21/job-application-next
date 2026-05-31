import { z } from "zod";

export const createCandidateSchema = z.object({
    fullName: z.string().min(1, "Full name is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email address").max(150),
    phone: z.string().min(1, "Phone number is required").max(20),
});

export const updateCandidateSchema = createCandidateSchema.partial();

export type CreateCandidateInput = z.infer<typeof createCandidateSchema>;
export type UpdateCandidateInput = z.infer<typeof updateCandidateSchema>;
