import { applyService } from "@/server/service/apply.service";
import { PipelineBoard } from "@/components/shared/pipeline-board";

export default async function PipelinePage() {
    const applications = await applyService.getApplications();

    return (
        <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
            <div className="shrink-0">
                <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Candidate Pipeline</h2>
                <p className="text-[#64748B]">Track candidates across hiring stages.</p>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
                <PipelineBoard data={applications} />
            </div>
        </div>
    );
}
