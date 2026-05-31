import { candidatesService } from "@/server/service/candidates.service";
import { CandidateTable } from "@/components/tables/candidate-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function CandidatesPage() {
    const candidates = await candidatesService.getCandidates();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Candidates</h2>
                    <p className="text-[#64748B]">Manage your talent pool and applicants.</p>
                </div>
                <Button asChild className="bg-[#2563EB] text-white hover:bg-[#1d4ed8]">
                    <Link href="/dashboard/candidates/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Candidate
                    </Link>
                </Button>
            </div>

            <CandidateTable data={candidates} />
        </div>
    );
}
