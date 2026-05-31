import { CandidateForm } from "@/components/forms/candidate-form";

export default function CreateCandidatePage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Add New Candidate</h2>
                <p className="text-[#64748B]">Enter the candidate&apos;s personal and contact details.</p>
            </div>
            
            <div className="p-6 bg-white border rounded-lg shadow-sm">
                <CandidateForm />
            </div>
        </div>
    );
}
