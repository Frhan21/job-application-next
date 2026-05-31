import { JobForm } from "@/components/forms/job-form";
import { jobsService } from "@/server/service/jobs.service";
import { notFound } from "next/navigation";

export default async function EditJobPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    let job;
    
    try {
        job = await jobsService.getJobById(id);
    } catch (error) {
        notFound();
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Edit Job</h2>
                <p className="text-[#64748B]">Update the job details below.</p>
            </div>
            
            <div className="p-6 bg-white border rounded-lg shadow-sm">
                <JobForm initialData={job} isEdit />
            </div>
        </div>
    );
}
