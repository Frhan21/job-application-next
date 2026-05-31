"use client";

import Link from "next/link";
import { format } from "date-fns";
import type { JobStatus } from "@prisma/client";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { StatusBadge } from "../shared/status-badge";
import { useState } from "react";
import { deleteJobAction } from "@/server/actions/job.action";
import { toast } from "sonner";

type JobWithCount = {
    id: string;
    title: string;
    department: string;
    location: string;
    status: JobStatus;
    createdAt: Date;
    _count: {
        applications: number;
    };
};

interface JobTableProps {
    data: JobWithCount[];
}

export function JobTable({ data }: JobTableProps) {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            const res = await deleteJobAction(deleteId);
            if (res.success) {
                toast.success("Job deleted successfully");
            } else {
                toast.error(res.error || "Failed to delete job");
            }
        } catch {
            toast.error("An unexpected error occurred");
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-white">
                <div className="h-12 w-12 text-[#64748B] mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                    <Trash2 className="h-6 w-6 opacity-0" /> {/* Placeholder for visual balance */}
                    <span className="text-2xl block -mt-1 opacity-50">📋</span>
                </div>
                <h3 className="text-lg font-medium text-[#0F172A]">No jobs found</h3>
                <p className="text-sm text-[#64748B] mt-1">
                    Try adjusting your filters or create a new job.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Applications</TableHead>
                            <TableHead>Created Date</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell className="font-medium text-[#0F172A]">
                                    {job.title}
                                </TableCell>
                                <TableCell>{job.department}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>
                                    <StatusBadge status={job.status} />
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center justify-center bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {job._count.applications}
                                    </span>
                                </TableCell>
                                <TableCell>{format(new Date(job.createdAt), "MMM d, yyyy")}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link href={`/dashboard/jobs/${job.id}/edit`}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => setDeleteId(job.id)}
                                                className="text-red-600 focus:bg-red-50 focus:text-red-700"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the job
                            and all associated candidate applications.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isDeleting ? "Deleting..." : "Delete Job"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
