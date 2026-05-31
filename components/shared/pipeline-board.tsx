"use client";

import type { ApplicationStage } from "@/server/types";
import { PipelineColumn } from "./pipeline-column";

type ApplicationWithDetails = {
    id: string;
    stage: ApplicationStage;
    appliedAt: Date;
    candidate: { fullName: string; email: string; };
    job: { title: string; };
};

interface PipelineBoardProps {
    data: ApplicationWithDetails[];
}

export function PipelineBoard({ data }: PipelineBoardProps) {
    // Group applications by stage
    const applied = data.filter((app) => app.stage === "APPLIED");
    const interview = data.filter((app) => app.stage === "INTERVIEW");
    const hired = data.filter((app) => app.stage === "HIRED");

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full h-full min-h-[500px] overflow-x-auto pb-4">
            <PipelineColumn
                title="Applied"
                stage={"APPLIED"}
                count={applied.length}
                colorVariant="blue"
                applications={applied}
            />
            
            <PipelineColumn
                title="Interview"
                stage={"INTERVIEW"}
                count={interview.length}
                colorVariant="amber"
                applications={interview}
            />
            
            <PipelineColumn
                title="Hired"
                stage={"HIRED"}
                count={hired.length}
                colorVariant="green"
                applications={hired}
            />
        </div>
    );
}
