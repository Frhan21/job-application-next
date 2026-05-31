import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    description?: string;
}

export function StatsCard({ title, value, icon: Icon, description }: StatsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#0F172A]">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-[#64748B]" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-[#0F172A]">{value}</div>
                {description && (
                    <p className="text-xs text-[#64748B] mt-1">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
