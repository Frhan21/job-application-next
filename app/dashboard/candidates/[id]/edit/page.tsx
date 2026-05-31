import { CandidateForm } from "@/components/forms/candidate-form";
import { candidatesService } from "@/server/service/candidates.service";
import { notFound } from "next/navigation";

export default async function EditCandidatePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    let candidate;
    
    try {
        candidate = await candidatesService.getCandidateById(id);
    } catch (error) {
        notFound();
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Edit Candidate</h2>
                <p className="text-[#64748B]">Update the candidate&apos;s details below.</p>
            </div>
            
            <div className="p-6 bg-white border rounded-lg shadow-sm">
                <CandidateForm initialData={candidate} isEdit />
            </div>
        </div>
    );
}
