import { JobForm } from "@/components/forms/job-form";

export default function CreateJobPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Create New Job</h2>
                <p className="text-[#64748B]">Fill in the details to publish a new job opening.</p>
            </div>
            
            <div className="p-6 bg-white border rounded-lg shadow-sm">
                <JobForm />
            </div>
        </div>
    );
}
