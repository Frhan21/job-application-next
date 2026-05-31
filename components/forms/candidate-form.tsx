"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createCandidateSchema, type CreateCandidateInput } from "@/server/schemas/candidate.schema";
import { createCandidateAction, updateCandidateAction } from "@/server/actions/candidate.action";
import type { Candidate } from "@prisma/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

interface CandidateFormProps {
    initialData?: Candidate;
    isEdit?: boolean;
}

export function CandidateForm({ initialData, isEdit = false }: CandidateFormProps) {
    const router = useRouter();

    const form = useForm<CreateCandidateInput>({
        resolver: zodResolver(createCandidateSchema),
        defaultValues: {
            fullName: initialData?.fullName || "",
            email: initialData?.email || "",
            phone: initialData?.phone || "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    async function onSubmit(data: CreateCandidateInput) {
        try {
            const result = isEdit && initialData
                ? await updateCandidateAction(initialData.id, data)
                : await createCandidateAction(data);

            if (result.success) {
                toast.success(isEdit ? "Candidate updated successfully" : "Candidate created successfully");
                router.push("/dashboard/candidates");
                router.refresh();
            } else {
                toast.error(result.error || "Failed to save candidate");
            }
        } catch {
            toast.error("An unexpected error occurred");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="john@example.com" type="email" disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="+1 (555) 000-0000" disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex items-center justify-end gap-4 mt-8">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/dashboard/candidates")}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading} className="bg-[#2563EB] text-white hover:bg-[#1d4ed8]">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEdit ? "Update Candidate" : "Create Candidate"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
