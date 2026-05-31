"use client";

import type { ApplicationStage } from "@prisma/client";
import { updateApplicationStageAction } from "@/server/actions/application.action";
import { toast } from "sonner";
import { format } from "date-fns";
import { MoreVertical, User, Briefcase, Mail } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
    application: {
        id: string;
        stage: ApplicationStage;
        appliedAt: Date;
        candidate: {
            fullName: string;
            email: string;
        };
        job: {
            title: string;
        };
    };
}

export function ApplicationCard({ application }: ApplicationCardProps) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleMove = async (stage: ApplicationStage) => {
        if (stage === application.stage) return;
        
        setIsUpdating(true);
        try {
            const res = await updateApplicationStageAction(application.id, stage);
            if (res.success) {
                toast.success(`Moved to ${stage.toLowerCase()}`);
            } else {
                toast.error(res.error || "Failed to update stage");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className={cn(
            "group bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-all duration-200",
            isUpdating && "opacity-50 pointer-events-none"
        )}>
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-sm font-medium text-[#0F172A] truncate">
                    <User className="h-4 w-4 text-[#64748B] shrink-0" />
                    <span className="truncate">{application.candidate.fullName}</span>
                </div>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-6 w-6 p-0 -mr-2 text-muted-foreground hover:bg-slate-100">
                            <span className="sr-only">Open options</span>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Move to...</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            disabled={application.stage === "APPLIED"}
                            onClick={() => handleMove("APPLIED")}
                        >
                            Applied
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            disabled={application.stage === "INTERVIEW"}
                            onClick={() => handleMove("INTERVIEW")}
                        >
                            Interview
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            disabled={application.stage === "HIRED"}
                            onClick={() => handleMove("HIRED")}
                        >
                            Hired
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-[#64748B] truncate">
                    <Briefcase className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{application.job.title}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#64748B] truncate">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{application.candidate.email}</span>
                </div>
            </div>

            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold border-t pt-3 mt-1">
                {format(new Date(application.appliedAt), "MMM d, yyyy")}
            </div>
        </div>
    );
}
