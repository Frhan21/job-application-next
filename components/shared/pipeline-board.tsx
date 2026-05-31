"use client";

import { ApplicationStage } from "@prisma/client";
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
    const applied = data.filter((app) => app.stage === ApplicationStage.APPLIED);
    const interview = data.filter((app) => app.stage === ApplicationStage.INTERVIEW);
    const hired = data.filter((app) => app.stage === ApplicationStage.HIRED);

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full h-full min-h-[500px] overflow-x-auto pb-4">
            <PipelineColumn
                title="Applied"
                stage={ApplicationStage.APPLIED}
                count={applied.length}
                colorVariant="blue"
                applications={applied}
            />
            
            <PipelineColumn
                title="Interview"
                stage={ApplicationStage.INTERVIEW}
                count={interview.length}
                colorVariant="amber"
                applications={interview}
            />
            
            <PipelineColumn
                title="Hired"
                stage={ApplicationStage.HIRED}
                count={hired.length}
                colorVariant="green"
                applications={hired}
            />
        </div>
    );
}
