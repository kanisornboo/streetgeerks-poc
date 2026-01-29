"use client";

import { useState } from "react";
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
import { ArrowLeft, CalendarIcon } from "lucide-react";

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

// Mock data for participants
const participantsData: Participant[] = [
    {
        id: "1",
        sessionId: "316",
        participantName: "Alice Johnson",
        email: "alice.johnson@example.com",
        startTime: "2024-01-15T09:00:00Z",
        status: "Present",
    },
    {
        id: "2",
        sessionId: "316",
        participantName: "Bob Smith",
        email: "bob.smith@example.com",
        startTime: "2024-01-15T09:05:00Z",
        status: "Present",
    },
    {
        id: "3",
        sessionId: "317",
        participantName: "Carol Williams",
        email: "carol.williams@example.com",
        startTime: "2024-01-16T10:00:00Z",
        status: "Late",
    },
    {
        id: "4",
        sessionId: "318",
        participantName: "David Brown",
        email: "david.brown@example.com",
        startTime: "2024-01-17T14:00:00Z",
        status: "Present",
    },
    {
        id: "5",
        sessionId: "319",
        participantName: "Emily Davis",
        email: "emily.davis@example.com",
        startTime: "2024-01-18T11:30:00Z",
        status: "Absent",
    },
    {
        id: "6",
        sessionId: "320",
        participantName: "Frank Miller",
        email: "frank.miller@example.com",
        startTime: "2024-01-19T08:45:00Z",
        status: "Present",
    },
    {
        id: "7",
        sessionId: "321",
        participantName: "Grace Wilson",
        email: "grace.wilson@example.com",
        startTime: "2024-01-20T13:00:00Z",
        status: "Present",
    },
    {
        id: "8",
        sessionId: "322",
        participantName: "Henry Taylor",
        email: "henry.taylor@example.com",
        startTime: "2024-01-21T09:15:00Z",
        status: "Late",
    },
    {
        id: "9",
        sessionId: "323",
        participantName: "Ivy Anderson",
        email: "ivy.anderson@example.com",
        startTime: "2024-01-22T10:30:00Z",
        status: "Present",
    },
    {
        id: "10",
        sessionId: "324",
        participantName: "Jack Thomas",
        email: "jack.thomas@example.com",
        startTime: "2024-01-23T15:00:00Z",
        status: "Present",
    },
    {
        id: "11",
        sessionId: "325",
        participantName: "Karen Jackson",
        email: "karen.jackson@example.com",
        startTime: "2024-01-24T09:00:00Z",
        status: "Absent",
    },
    {
        id: "12",
        sessionId: "326",
        participantName: "Leo White",
        email: "leo.white@example.com",
        startTime: "2024-01-25T11:00:00Z",
        status: "Present",
    },
];

export type Participant = {
    id: string;
    sessionId: string;
    participantName: string;
    email: string;
    startTime: string;
    status: "Present" | "Late" | "Absent";
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
        accessorKey: "participantName",
        header: ({ column }) => (
            <Button
                variant="link"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Participant Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <span>{row.getValue("participantName")}</span>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <span>{row.getValue("email")}</span>,
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const statusColors: Record<string, string> = {
                Present: "bg-green-500/20 text-green-400",
                Late: "bg-yellow-500/20 text-yellow-400",
                Absent: "bg-red-500/20 text-red-400",
            };
            return (
                <span
                    className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}
                >
                    {status}
                </span>
            );
        },
    },
];

const pageConfig: Record<string, { title: string; subtitle: string }> = {
    attendees: { title: "Attendees", subtitle: "Manage session participants" },
};

export default function AttendeeEditor({ trainingId }: { trainingId: string }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeNav, setActiveNav] = useState("attendees");
    const params = useParams();
    const moduleName = params.moduleName as string;
    const { title, subtitle } = pageConfig[activeNav] || pageConfig.attendees;

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
        data: participantsData,
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
                        placeholder="Filter by participant name..."
                        value={
                            (table
                                .getColumn("participantName")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("participantName")
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

const AttendeeDialog = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<AttendeeFormData>({
        resolver: zodResolver(attendeeSchema),
    });

    const onSubmit = (data: AttendeeFormData) => {
        console.log("Attendee data:", data);
        // TODO: Call API to create new attendee
        reset();
        onClose();
    };

    const handleCancel = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleCancel}>
            <DialogContent className="bg-gray-900 border-white/10">
                <DialogHeader>
                    <DialogTitle className="text-white">
                        Add New Attendee
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Register a participant for a session
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="sessionId"
                                className="text-gray-300"
                            >
                                Session ID
                            </Label>
                            <Input
                                id="sessionId"
                                {...register("sessionId")}
                                placeholder="Enter session ID"
                                className="bg-gray-800 border-white/10 text-white placeholder:text-gray-500"
                            />
                            {errors.sessionId && (
                                <p className="text-red-500 text-sm">
                                    {errors.sessionId.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label
                                htmlFor="participantName"
                                className="text-gray-300"
                            >
                                Participant Name
                            </Label>
                            <Input
                                id="participantName"
                                {...register("participantName")}
                                placeholder="Enter participant name"
                                className="bg-gray-800 border-white/10 text-white placeholder:text-gray-500"
                            />
                            {errors.participantName && (
                                <p className="text-red-500 text-sm">
                                    {errors.participantName.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-gray-300">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                                placeholder="Enter email address"
                                className="bg-gray-800 border-white/10 text-white placeholder:text-gray-500"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label
                                htmlFor="startTime"
                                className="text-gray-300"
                            >
                                Start Time
                            </Label>
                            <Controller
                                name="startTime"
                                control={control}
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-between bg-gray-800 border-white/10 text-white placeholder:text-gray-500",
                                                    !field.value &&
                                                        "text-gray-500",
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP p")
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
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                            {errors.startTime && (
                                <p className="text-red-500 text-sm">
                                    {errors.startTime.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status" className="text-gray-300">
                                Status
                            </Label>
                            <select
                                id="status"
                                {...register("status")}
                                className="flex h-10 w-full rounded-md border bg-gray-800 border-white/10 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="" className="text-gray-500">
                                    Select status
                                </option>
                                <option value="Present">Present</option>
                                <option value="Late">Late</option>
                                <option value="Absent">Absent</option>
                            </select>
                            {errors.status && (
                                <p className="text-red-500 text-sm">
                                    {errors.status.message}
                                </p>
                            )}
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
                        <Button type="submit">Add Attendee</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
