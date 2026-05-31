"use server";

import { applyService } from "@/server/service/apply.service";
import { CreateApplicationInput } from "@/server/schemas/application.schema";
import { ApplicationStage } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createApplicationAction(data: CreateApplicationInput) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            throw new Error("Unauthorized");
        }

        const application = await applyService.createApplication(data);
        revalidatePath("/dashboard/pipeline");
        return { success: true, data: application };
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to create application" };
    }
}

export async function updateApplicationStageAction(id: string, stage: ApplicationStage) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            throw new Error("Unauthorized");
        }

        const application = await applyService.updateApplicationStage(id, stage);
        revalidatePath("/dashboard/pipeline");
        return { success: true, data: application };
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to update application stage" };
    }
}

export async function deleteApplicationAction(id: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            throw new Error("Unauthorized");
        }

        await applyService.deleteApplication(id);
        revalidatePath("/dashboard/pipeline");
        return { success: true };
    } catch (error: unknown) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to delete application" };
    }
}
