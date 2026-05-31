"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createJobSchema, type CreateJobInput } from "@/server/schemas/job.schema";
import { createJobAction, updateJobAction } from "@/server/actions/job.action";
import type { JobStatus, Job } from "@prisma/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface JobFormProps {
    initialData?: Job;
    isEdit?: boolean;
}

export function JobForm({ initialData, isEdit = false }: JobFormProps) {
    const router = useRouter();

    const form = useForm<CreateJobInput>({
        resolver: zodResolver(createJobSchema),
        defaultValues: {
            title: initialData?.title || "",
            department: initialData?.department || "",
            location: initialData?.location || "",
            description: initialData?.description || "",
            status: initialData?.status || "OPEN",
        },
    });

    const isLoading = form.formState.isSubmitting;

    async function onSubmit(data: CreateJobInput) {
        try {
            const result = isEdit && initialData
                ? await updateJobAction(initialData.id, data)
                : await createJobAction(data);

            if (result.success) {
                toast.success(isEdit ? "Job updated successfully" : "Job created successfully");
                router.push("/dashboard/jobs");
                router.refresh();
            } else {
                toast.error(result.error || "Failed to save job");
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
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Frontend Developer" disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Department</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Engineering" disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Remote, NY" disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="OPEN">Open</SelectItem>
                                        <SelectItem value="CLOSED">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Provide detailed job requirements and responsibilities..."
                                    className="min-h-[200px]"
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/dashboard/jobs")}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading} className="bg-[#2563EB] text-white hover:bg-[#1d4ed8]">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEdit ? "Update Job" : "Create Job"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
