"use client";

import type { ApplicationStage } from "@/server/types";
import { ApplicationCard } from "./application-card";
import { cn } from "@/lib/utils";

type ApplicationWithDetails = {
    id: string;
    stage: ApplicationStage;
    appliedAt: Date;
    candidate: { fullName: string; email: string; };
    job: { title: string; };
};

interface PipelineColumnProps {
    title: string;
    stage: ApplicationStage;
    count: number;
    colorVariant: "blue" | "amber" | "green";
    applications: ApplicationWithDetails[];
}

export function PipelineColumn({ title, stage, count, colorVariant, applications }: PipelineColumnProps) {
    const colorStyles = {
        blue: "bg-blue-50 border-t-blue-500",
        amber: "bg-amber-50 border-t-amber-500",
        green: "bg-green-50 border-t-green-500",
    };

    const countStyles = {
        blue: "bg-blue-100 text-blue-700",
        amber: "bg-amber-100 text-amber-700",
        green: "bg-green-100 text-green-700",
    };

    return (
        <div className={cn(
            "flex-1 min-w-[300px] flex flex-col rounded-lg border-t-4 bg-slate-50 border-x border-b",
            colorStyles[colorVariant]
        )}>
            <div className="flex items-center justify-between p-4 border-b bg-white/50 rounded-t-md">
                <h3 className="font-semibold text-slate-800">{title}</h3>
                <span className={cn("text-xs font-bold px-2 py-1 rounded-full", countStyles[colorVariant])}>
                    {count}
                </span>
            </div>
            
            <div className="p-3 flex-1 flex flex-col gap-3 overflow-y-auto">
                {applications.length > 0 ? (
                    applications.map((app) => (
                        <ApplicationCard key={app.id} application={app} />
                    ))
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-60">
                        <p className="text-sm text-slate-500">No applications</p>
                    </div>
                )}
            </div>
        </div>
    );
}
