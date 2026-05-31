"use client";

import Link from "next/link";
import { format } from "date-fns";
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
import { deleteCandidateAction } from "@/server/actions/candidate.action";
import { toast } from "sonner";
import { ApplicationStage } from "@prisma/client";

type ApplicationWithJob = {
    id: string;
    stage: ApplicationStage;
    job: {
        title: string;
    };
};

type CandidateWithApps = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    createdAt: Date;
    applications: ApplicationWithJob[];
};

interface CandidateTableProps {
    data: CandidateWithApps[];
}

export function CandidateTable({ data }: CandidateTableProps) {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            const res = await deleteCandidateAction(deleteId);
            if (res.success) {
                toast.success("Candidate deleted successfully");
            } else {
                toast.error(res.error || "Failed to delete candidate");
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
                    <span className="text-2xl block -mt-1 opacity-50">👥</span>
                </div>
                <h3 className="text-lg font-medium text-[#0F172A]">No candidates found</h3>
                <p className="text-sm text-[#64748B] mt-1">
                    Add a new candidate to the system.
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
                            <TableHead>Candidate</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Latest Application</TableHead>
                            <TableHead>Stage</TableHead>
                            <TableHead>Registered</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((candidate) => {
                            // Find the most recent application to show in the table overview
                            const latestApp = candidate.applications.length > 0 
                                ? candidate.applications[candidate.applications.length - 1] 
                                : null;

                            return (
                                <TableRow key={candidate.id}>
                                    <TableCell className="font-medium text-[#0F172A]">
                                        {candidate.fullName}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm">{candidate.email}</span>
                                            <span className="text-xs text-muted-foreground">{candidate.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {latestApp ? latestApp.job.title : <span className="text-muted-foreground italic">None</span>}
                                    </TableCell>
                                    <TableCell>
                                        {latestApp && <StatusBadge stage={latestApp.stage} />}
                                    </TableCell>
                                    <TableCell>{format(new Date(candidate.createdAt), "MMM d, yyyy")}</TableCell>
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
                                                    <Link href={`/dashboard/candidates/${candidate.id}/edit`}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => setDeleteId(candidate.id)}
                                                    className="text-red-600 focus:bg-red-50 focus:text-red-700"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the candidate
                            and all their applications from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isDeleting ? "Deleting..." : "Delete Candidate"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
