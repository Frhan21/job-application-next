"use server";

import { jobsService } from "@/server/service/jobs.service";
import { CreateJobInput, UpdateJobInput } from "@/server/schemas/job.schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createJobAction(data: CreateJobInput) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            throw new Error("Unauthorized");
        }

        const job = await jobsService.createJob(data, session.user.id);
        revalidatePath("/dashboard/jobs");
        return { success: true, data: job };
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to create job" };
    }
}

export async function updateJobAction(id: string, data: UpdateJobInput) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            throw new Error("Unauthorized");
        }

        const job = await jobsService.updateJob(id, data);
        revalidatePath("/dashboard/jobs");
        return { success: true, data: job };
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to update job" };
    }
}

export async function deleteJobAction(id: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            throw new Error("Unauthorized");
        }

        await jobsService.deleteJob(id);
        revalidatePath("/dashboard/jobs");
        return { success: true };
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to delete job" };
    }
}
