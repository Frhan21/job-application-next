import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ApplicationStage } from "@prisma/client";

interface PipelineSummaryProps {
    data: Record<ApplicationStage, number>;
}

export function PipelineSummary({ data }: PipelineSummaryProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#0F172A]">
                    Application Pipeline Summary
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
                    <div className="flex-1 pt-4 sm:pt-0 sm:px-4 flex flex-col items-center justify-center">
                        <span className="text-sm font-medium text-[#64748B] mb-2 uppercase tracking-wider">Applied</span>
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-700 text-2xl font-bold">
                            {data["APPLIED"] || 0}
                        </div>
                    </div>
                    
                    <div className="flex-1 pt-4 sm:pt-0 sm:px-4 flex flex-col items-center justify-center">
                        <span className="text-sm font-medium text-[#64748B] mb-2 uppercase tracking-wider">Interview</span>
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-700 text-2xl font-bold">
                            {data["INTERVIEW"] || 0}
                        </div>
                    </div>

                    <div className="flex-1 pt-4 sm:pt-0 sm:px-4 flex flex-col items-center justify-center">
                        <span className="text-sm font-medium text-[#64748B] mb-2 uppercase tracking-wider">Hired</span>
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-700 text-2xl font-bold">
                            {data["HIRED"] || 0}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
