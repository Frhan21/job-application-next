"use server";

import { candidatesService } from "@/server/service/candidates.service";
import { CreateCandidateInput, UpdateCandidateInput } from "@/server/schemas/candidate.schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createCandidateAction(data: CreateCandidateInput) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            throw new Error("Unauthorized");
        }

        const candidate = await candidatesService.createCandidate(data);
        revalidatePath("/dashboard/candidates");
        return { success: true, data: candidate };
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to create candidate" };
    }
}

export async function updateCandidateAction(id: string, data: UpdateCandidateInput) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            throw new Error("Unauthorized");
        }

        const candidate = await candidatesService.updateCandidate(id, data);
        revalidatePath("/dashboard/candidates");
        return { success: true, data: candidate };
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to update candidate" };
    }
}

export async function deleteCandidateAction(id: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            throw new Error("Unauthorized");
        }

        await candidatesService.deleteCandidate(id);
        revalidatePath("/dashboard/candidates");
        return { success: true };
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to delete candidate" };
    }
}
