import { Badge } from "@/components/ui/badge";
import type { JobStatus, ApplicationStage } from "@prisma/client";

interface StatusBadgeProps {
    status?: JobStatus;
    stage?: ApplicationStage;
}

export function StatusBadge({ status, stage }: StatusBadgeProps) {
    if (status) {
        if (status === "OPEN") {
            return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">OPEN</Badge>;
        }
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">CLOSED</Badge>;
    }

    if (stage) {
        if (stage === "APPLIED") {
            return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">APPLIED</Badge>;
        }
        if (stage === "INTERVIEW") {
            return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">INTERVIEW</Badge>;
        }
        if (stage === "HIRED") {
            return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">HIRED</Badge>;
        }
    }

    return null;
}
