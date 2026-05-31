import { jobsService } from "@/server/service/jobs.service";
import { JobSearchFilter } from "@/components/shared/job-search-filter";
import { JobTable } from "@/components/tables/job-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function JobsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; status?: string }>;
}) {
    const { q, status } = await searchParams;

    const jobs = await jobsService.getJobs(q, status);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Jobs</h2>
                    <p className="text-[#64748B]">Manage your job postings and track applications.</p>
                </div>
                <Button asChild className="bg-[#2563EB] text-white hover:bg-[#1d4ed8]">
                    <Link href="/dashboard/jobs/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Job
                    </Link>
                </Button>
            </div>

            <JobSearchFilter />

            <JobTable data={jobs} />
        </div>
    );
}
