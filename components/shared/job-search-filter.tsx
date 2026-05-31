"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { JobStatus } from "@prisma/client";

export function JobSearchFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get("q") || "";
    const currentStatus = searchParams.get("status") || "ALL";

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        router.push(`/dashboard/jobs?${params.toString()}`);
    }, 300);

    const handleStatusChange = (status: string) => {
        const params = new URLSearchParams(searchParams);
        if (status && status !== "ALL") {
            params.set("status", status);
        } else {
            params.delete("status");
        }
        router.push(`/dashboard/jobs?${params.toString()}`);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search jobs..."
                    className="pl-9"
                    defaultValue={currentSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <div className="w-full sm:w-[200px]">
                <Select
                    defaultValue={currentStatus}
                    onValueChange={handleStatusChange}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Status</SelectItem>
                        <SelectItem value={JobStatus.OPEN}>Open</SelectItem>
                        <SelectItem value={JobStatus.CLOSED}>Closed</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
