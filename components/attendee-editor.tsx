"use client";

import { useState, useEffect } from "react";
import { Header, Sidebar } from "./layout";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, ClipboardCheck } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import Link from "next/link";
import { modules } from "@/lib/data";
import { useParams } from "next/navigation";

// default will be showing as none
const behaviourNotes = [
    {
        value: "none",
        label: "None",
    },
    {
        value: "excellent",
        label: "Excellent behavior",
    },
    {
        value: "need engagement",
        label: "Need engagement",
    },
];

export type Participant = {
    id: string;
    sessionId: string;
    startTime: string;
    numberOfParticipants: number;
    coachName: string;
};

// Mock participants for the session
const sessionParticipants = [
    { id: "p1", name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: "p2", name: "Bob Smith", email: "bob.smith@example.com" },
    { id: "p3", name: "Carol Williams", email: "carol.williams@example.com" },
    { id: "p4", name: "David Brown", email: "david.brown@example.com" },
    { id: "p5", name: "Emily Davis", email: "emily.davis@example.com" },
    { id: "p6", name: "Frank Miller", email: "frank.miller@example.com" },
];

const participantLevels = [
    { value: "engaged", label: "Engaged" },
    { value: "part engaged", label: "Part Engaged" },
];

const behaviorNoteOptions = [
    { value: "excellent", label: "Excellent Behavior" },
    { value: "good", label: "Good Behavior" },
    { value: "satisfactory", label: "Satisfactory" },
    { value: "needs-improvement", label: "Needs Improvement" },
    { value: "disruptive", label: "Disruptive" },
];

type ParticipantMark = {
    id: string;
    selected: boolean;
    level: string;
    behaviorNotes: string;
};

type BehaviorNote = {
    value: string;
    label: string;
};

// Mark Modal Component
const MarkModal = ({
    isOpen,
    onClose,
    sessionId,
}: {
    isOpen: boolean;
    onClose: () => void;
    sessionId: string;
}) => {
    const [participantMarks, setParticipantMarks] = useState<ParticipantMark[]>(
        sessionParticipants.map((p) => ({
            id: p.id,
            selected: false,
            level: "",
            behaviorNotes: "none",
        })),
    );

    const handleSelectChange = (id: string, checked: boolean) => {
        setParticipantMarks((prev) =>
            prev.map((p) => (p.id === id ? { ...p, selected: checked } : p)),
        );
    };

    const handleLevelChange = (id: string, level: string) => {
        setParticipantMarks((prev) =>
            prev.map((p) => (p.id === id ? { ...p, level } : p)),
        );
    };

    const handleNotesChange = (id: string, behaviorNotes: string) => {
        setParticipantMarks((prev) =>
            prev.map((p) => (p.id === id ? { ...p, behaviorNotes } : p)),
        );
    };

    const handleSelectAll = () => {
        const allSelected = participantMarks.every((p) => p.selected);
        setParticipantMarks((prev) =>
            prev.map((p) => ({ ...p, selected: !allSelected })),
        );
    };

    const handleSave = () => {
        const selectedParticipants = participantMarks.filter((p) => p.selected);
        console.log(
            "Saving marks for session:",
            sessionId,
            selectedParticipants,
        );
        // TODO: Call API to save marks
        handleCancel();
    };

    const handleCancel = () => {
        setParticipantMarks(
            sessionParticipants.map((p) => ({
                id: p.id,
                selected: false,
                level: "",
                behaviorNotes: "none",
            })),
        );
        onClose();
    };

    const selectedCount = participantMarks.filter((p) => p.selected).length;
    const allSelected = participantMarks.every((p) => p.selected);

    return (
        <Dialog open={isOpen} onOpenChange={handleCancel}>
            <DialogContent className="bg-gray-900 border-white/10 max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-white">
                        Mark Session {sessionId}
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Mark attendance and record participant levels for this
                        session
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-auto">
                    <div className="rounded-md border border-white/10">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/10 hover:bg-transparent">
                                    <TableHead className="w-12">
                                        <input
                                            type="checkbox"
                                            checked={allSelected}
                                            onChange={handleSelectAll}
                                            className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-gray-800"
                                        />
                                    </TableHead>
                                    <TableHead className="text-gray-300">
                                        Participant
                                    </TableHead>
                                    <TableHead className="text-gray-300 w-40">
                                        Level
                                    </TableHead>
                                    <TableHead className="text-gray-300">
                                        Behavior Notes
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sessionParticipants.map((participant) => {
                                    const mark = participantMarks.find(
                                        (p) => p.id === participant.id,
                                    );
                                    return (
                                        <TableRow
                                            key={participant.id}
                                            className="border-white/10"
                                        >
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        mark?.selected ?? false
                                                    }
                                                    onChange={(e) =>
                                                        handleSelectChange(
                                                            participant.id,
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-gray-800"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="text-white font-medium">
                                                        {participant.name}
                                                    </p>
                                                    <p className="text-gray-400 text-sm">
                                                        {participant.email}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <select
                                                    value={mark?.level ?? ""}
                                                    onChange={(e) =>
                                                        handleLevelChange(
                                                            participant.id,
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full h-9 rounded-md border bg-gray-800 border-white/10 px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                >
                                                    <option
                                                        value=""
                                                        className="text-gray-500"
                                                    >
                                                        Select level
                                                    </option>
                                                    {participantLevels.map(
                                                        (level) => (
                                                            <option
                                                                key={
                                                                    level.value
                                                                }
                                                                value={
                                                                    level.value
                                                                }
                                                            >
                                                                {level.label}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </TableCell>
                                            <TableCell>
                                                <select
                                                    value={
                                                        mark?.behaviorNotes ??
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        handleNotesChange(
                                                            participant.id,
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full h-9 rounded-md border bg-gray-800 border-white/10 px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                >
                                                    <option
                                                        value=""
                                                        className="text-gray-500"
                                                    >
                                                        Select behavior
                                                    </option>
                                                    {behaviourNotes.map(
                                                        (note) => (
                                                            <option
                                                                key={note.value}
                                                                value={
                                                                    note.value
                                                                }
                                                            >
                                                                {note.label}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>

                                                {/* <Input
                                                    value={
                                                        mark?.behaviorNotes ??
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        handleNotesChange(
                                                            participant.id,
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Enter behavior notes..."
                                                    className="bg-gray-800 border-white/10 text-white placeholder:text-gray-500"
                                                /> */}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <DialogFooter className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                    <p className="text-sm text-gray-400">
                        {selectedCount} participant
                        {selectedCount !== 1 ? "s" : ""} selected
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={selectedCount === 0}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            Save Selected
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Action Cell Component with Mark button
const ActionCell = ({ sessionId }: { sessionId: string }) => {
    const [isMarkModalOpen, setIsMarkModalOpen] = useState(false);

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="sm"
                            onClick={() => setIsMarkModalOpen(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 font-medium shadow-sm"
                        >
                            <ClipboardCheck className="h-4 w-4" />
                            Mark Attendance
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>
                            Click to mark participant attendance for this
                            session
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <MarkModal
                isOpen={isMarkModalOpen}
                onClose={() => setIsMarkModalOpen(false)}
                sessionId={sessionId}
            />
        </>
    );
};

export const participantColumns: ColumnDef<Participant>[] = [
    {
        accessorKey: "sessionId",
        header: ({ column }) => (
            <Button
                variant="link"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Session ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <span>{row.getValue("sessionId")}</span>,
    },
    {
        accessorKey: "startTime",
        header: ({ column }) => (
            <Button
                variant="link"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Start Time
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("startTime"));
            return <span>{format(date, "PPP p")}</span>;
        },
    },
    {
        accessorKey: "numberOfParticipants",
        header: ({ column }) => (
            <Button
                variant="link"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                No. of Participants
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <span>{row.getValue("numberOfParticipants")}</span>,
    },
    {
        accessorKey: "coachName",
        header: ({ column }) => (
            <Button
                variant="link"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Coach Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <span>{row.getValue("coachName")}</span>,
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => <ActionCell sessionId={row.getValue("sessionId")} />,
    },
];

const pageConfig: Record<string, { title: string; subtitle: string }> = {
    attendees: { title: "Attendance", subtitle: "Manage session participants" },
};

export default function AttendeeEditor({ trainingId }: { trainingId: string }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeNav, setActiveNav] = useState("attendees");
    const params = useParams();
    const moduleName = params.moduleName as string;
    const { title, subtitle } = pageConfig[activeNav] || pageConfig.attendees;

    // API data state
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from attendance API
    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch("/api/attendance");

                if (!response.ok) {
                    throw new Error("Failed to fetch attendance data");
                }

                const data = await response.json();
                console.log({ data });

                // Map API response to Participant structure
                // Adjust this mapping based on your actual API response structure
                const mappedParticipants: Participant[] = data.map(
                    (
                        item: {
                            id?: number | string;
                            sessionId?: number | string;
                            startTime?: string;
                            numberOfParticipants?: number;
                            coachName?: string;
                            [key: string]: unknown;
                        },
                        index: number,
                    ) => ({
                        id: String(item.id ?? index + 1),
                        sessionId: String(item.sessionId ?? 315 + index),
                        startTime: item.startTime ?? new Date().toISOString(),
                        numberOfParticipants: item.numberOfParticipants ?? 0,
                        coachName: item.coachName ?? "Unknown Coach",
                    }),
                );

                setParticipants(mappedParticipants);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "An error occurred",
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchParticipants();
    }, []);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );

    const module = modules.find(
        (m) =>
            m.title.toLowerCase().replace(/\s+/g, "-") ===
            decodeURIComponent(moduleName),
    );

    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: participants,
        columns: participantColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="w-full flex items-center justify-center py-20">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
                        <p className="text-gray-400">Loading sessions...</p>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="w-full flex items-center justify-center py-20">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <p className="text-red-400">Error: {error}</p>
                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}
                        >
                            Retry
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div className="w-full">
                <div className="flex items-center py-4 gap-4">
                    <Input
                        placeholder="Filter by session ID..."
                        value={
                            (table
                                .getColumn("sessionId")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("sessionId")
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />

                    <Input
                        placeholder="Filter by coach name..."
                        value={
                            (table
                                .getColumn("coachName")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("coachName")
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />

                    <Button variant="outline" onClick={handleOpenDialog}>
                        Add Attendee
                    </Button>
                    <AttendeeDialog
                        isOpen={isDialogOpen}
                        onClose={handleCloseDialog}
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(
                                                        !!value,
                                                    )
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext(),
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={participantColumns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="text-muted-foreground flex-1 text-sm">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                activeNav={activeNav}
                onNavChange={setActiveNav}
            />

            {/* Main Content */}
            <main
                className={cn(
                    "relative transition-all duration-300",
                    sidebarOpen ? "ml-64" : "ml-20",
                )}
            >
                <div className="border-b border-white/5 px-8 py-6">
                    <Link
                        href={
                            module?.id === "training-curriculum"
                                ? `/${encodeURIComponent(
                                      "training-curriculum"
                                          .toLowerCase()
                                          .replace(/\s+/g, "-"),
                                  )}`
                                : "/"
                        }
                    >
                        <Button variant="ghost" className="gap-2 mb-4">
                            <ArrowLeft className="w-4 h-4" />
                            {module?.id === "training-curriculum"
                                ? "Back to Trainings"
                                : "Back to Dashboard"}
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {module?.title}
                    </h1>
                    <p className="text-gray-400">{module?.description}</p>
                </div>

                <Header title={title} subtitle={subtitle} />
                {renderContent()}

                {/* Footer */}
                <footer className="px-8 py-6 border-t border-white/5">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <p>© 2026 Street League. Own Your Future.</p>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>All systems operational</span>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}

// Define the schema for attendee form validation
const attendeeSchema = z.object({
    sessionId: z.string().min(1, "Session ID is required"),
    participantName: z.string().min(1, "Participant name is required"),
    email: z.string().email("Invalid email address"),
    startTime: z.date({ required_error: "Start time is required" }),
    status: z.enum(["Present", "Late", "Absent"], {
        required_error: "Status is required",
    }),
});

type AttendeeFormData = z.infer<typeof attendeeSchema>;

// Mock list of available attendees to select from
const availableAttendees = [
    { id: "a1", name: "John Doe", email: "john.doe@example.com" },
    { id: "a2", name: "Jane Smith", email: "jane.smith@example.com" },
    { id: "a3", name: "Michael Brown", email: "michael.brown@example.com" },
    { id: "a4", name: "Sarah Wilson", email: "sarah.wilson@example.com" },
    { id: "a5", name: "David Lee", email: "david.lee@example.com" },
    { id: "a6", name: "Emma Johnson", email: "emma.johnson@example.com" },
    { id: "a7", name: "Chris Taylor", email: "chris.taylor@example.com" },
    { id: "a8", name: "Lisa Anderson", email: "lisa.anderson@example.com" },
];

const AttendeeDialog = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
    const [sessionId, setSessionId] = useState("");
    const [startTime, setStartTime] = useState<Date>();
    const [status, setStatus] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredAttendees = availableAttendees.filter(
        (attendee) =>
            attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            attendee.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleToggleAttendee = (id: string) => {
        setSelectedAttendees((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
        );
    };

    const handleSelectAll = () => {
        if (selectedAttendees.length === filteredAttendees.length) {
            setSelectedAttendees([]);
        } else {
            setSelectedAttendees(filteredAttendees.map((a) => a.id));
        }
    };

    const handleSubmit = () => {
        if (
            !sessionId ||
            !startTime ||
            !status ||
            selectedAttendees.length === 0
        ) {
            return;
        }

        const selectedData = availableAttendees
            .filter((a) => selectedAttendees.includes(a.id))
            .map((attendee) => ({
                sessionId,
                participantName: attendee.name,
                email: attendee.email,
                startTime: startTime.toISOString(),
                status,
            }));

        console.log("Adding attendees:", selectedData);
        // TODO: Call API to add selected attendees
        handleCancel();
    };

    const handleCancel = () => {
        setSelectedAttendees([]);
        setSessionId("");
        setStartTime(undefined);
        setStatus("");
        setSearchQuery("");
        onClose();
    };

    const isFormValid =
        sessionId && startTime && status && selectedAttendees.length > 0;

    return (
        <Dialog open={isOpen} onOpenChange={handleCancel}>
            <DialogContent className="bg-gray-900 border-white/10 max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-white">
                        Add Attendees
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Select participants to add to a session
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-4 mt-4">
                    {/* Session Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="sessionId"
                                className="text-gray-300"
                            >
                                Session ID
                            </Label>
                            <Input
                                id="sessionId"
                                value={sessionId}
                                onChange={(e) => setSessionId(e.target.value)}
                                placeholder="Enter session ID"
                                className="bg-gray-800 border-white/10 text-white placeholder:text-gray-500"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status" className="text-gray-300">
                                Status
                            </Label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="flex h-10 w-full rounded-md border bg-gray-800 border-white/10 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="" className="text-gray-500">
                                    Select status
                                </option>
                                <option value="Present">Present</option>
                                <option value="Late">Late</option>
                                <option value="Absent">Absent</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="startTime" className="text-gray-300">
                            Start Time
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-between bg-gray-800 border-white/10 text-white placeholder:text-gray-500",
                                        !startTime && "text-gray-500",
                                    )}
                                >
                                    {startTime ? (
                                        format(startTime, "PPP p")
                                    ) : (
                                        <span className="text-gray-500">
                                            Pick a date and time
                                        </span>
                                    )}
                                    <CalendarIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={startTime}
                                    onSelect={setStartTime}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Attendee List */}
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-gray-300">
                                Select Attendees ({selectedAttendees.length}{" "}
                                selected)
                            </Label>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleSelectAll}
                                className="text-gray-400 hover:text-white"
                            >
                                {selectedAttendees.length ===
                                filteredAttendees.length
                                    ? "Deselect All"
                                    : "Select All"}
                            </Button>
                        </div>
                        <Input
                            placeholder="Search attendees..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-800 border-white/10 text-white placeholder:text-gray-500"
                        />
                        <div className="max-h-64 overflow-y-auto rounded-md border border-white/10 bg-gray-800">
                            {filteredAttendees.length === 0 ? (
                                <div className="p-4 text-center text-gray-500">
                                    No attendees found
                                </div>
                            ) : (
                                filteredAttendees.map((attendee) => (
                                    <label
                                        key={attendee.id}
                                        className={cn(
                                            "flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-700 border-b border-white/5 last:border-0",
                                            selectedAttendees.includes(
                                                attendee.id,
                                            ) && "bg-gray-700/50",
                                        )}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedAttendees.includes(
                                                attendee.id,
                                            )}
                                            onChange={() =>
                                                handleToggleAttendee(
                                                    attendee.id,
                                                )
                                            }
                                            className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                                        />
                                        <div className="flex-1">
                                            <p className="text-white font-medium">
                                                {attendee.name}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                {attendee.email}
                                            </p>
                                        </div>
                                    </label>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                    >
                        Add{" "}
                        {selectedAttendees.length > 0
                            ? `${selectedAttendees.length} `
                            : ""}
                        Attendee{selectedAttendees.length !== 1 ? "s" : ""}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
