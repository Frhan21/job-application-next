import { dashboardService } from "@/server/service/dashboard.service";
import { StatsCard } from "@/components/shared/stats-card";
import { PipelineSummary } from "@/components/shared/pipeline-summary";
import { Briefcase, Users, FileText } from "lucide-react";

export default async function DashboardPage() {
    const stats = await dashboardService.getStats();
    const pipeline = await dashboardService.getPipelineSummary();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Dashboard Overview</h2>
                <p className="text-[#64748B]">Welcome back! Here&apos;s what&apos;s happening with your recruitment process.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <StatsCard
                    title="Total Jobs"
                    value={stats.totalJobs}
                    icon={Briefcase}
                    description="Open and closed positions"
                />
                <StatsCard
                    title="Total Candidates"
                    value={stats.totalCandidates}
                    icon={Users}
                    description="Registered in the system"
                />
                <StatsCard
                    title="Total Applications"
                    value={stats.totalApplications}
                    icon={FileText}
                    description="Across all stages"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-1">
                <PipelineSummary data={pipeline} />
            </div>
        </div>
    );
}
