"use client";

import { Header, Sidebar } from "@/components/layout";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { modules, users } from "@/lib/data";
import { useParams, useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

const pageConfig: Record<string, { title: string; subtitle: string }> = {
    dashboard: {
        title: "Platform Overview",
        subtitle: "Skills & Employment Management System",
    },
    participants: {
        title: "Participants",
        subtitle: "Manage all programme participants",
    },
    programmes: {
        title: "Programmes",
        subtitle: "View and manage training programmes",
    },
    analytics: {
        title: "Analytics",
        subtitle: "Performance metrics and reports",
    },
    settings: { title: "Settings", subtitle: "Configure platform settings" },
};

export default function ModuleDetailPage() {
    const params = useParams();
    const moduleName = params.moduleName as string;
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeNav, setActiveNav] = useState("dashboard");

    const { title, subtitle } = pageConfig[activeNav] || pageConfig.dashboard;

    // Find the module by converting the URL slug back to match the title
    const module = modules.find(
        (m) =>
            m.title.toLowerCase().replace(/\s+/g, "-") ===
            decodeURIComponent(moduleName),
    );

    // Filter users based on search and filters
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = !selectedRole || user.role === selectedRole;
        const matchesStatus = !selectedStatus || user.status === selectedStatus;
        return matchesSearch && matchesRole && matchesStatus;
    });

    if (!module) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Card className="p-8 bg-gray-900 border-white/10">
                    <h1 className="text-2xl font-bold text-white mb-4">
                        Module Not Found
                    </h1>
                    <p className="text-gray-400 mb-6">
                        The module you're looking for doesn't exist.
                    </p>
                    <Link href="/">
                        <Button className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </Card>
            </div>
        );
    }

    const renderContent = () => {
        return (
            <div className="min-h-screen bg-black">
                <div className="border-b border-white/5 px-8 py-6">
                    <Link
                        href={
                            module.id === "training-curriculum"
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
                            {module.id === "training-curriculum"
                                ? "Back to Trainings"
                                : "Back to Dashboard"}
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {module.title}
                    </h1>
                    <p className="text-gray-400">{module.description}</p>
                </div>

                <div className="px-8 py-8">
                    {module.id === "user-mgmt" ? (
                        <div>
                            <div className="grid grid-cols-4 gap-6 mb-8">
                                <Card className="p-6 bg-gray-900 border-white/10">
                                    <p className="text-gray-400 text-sm mb-2">
                                        Total Users
                                    </p>
                                    <p className="text-3xl font-bold text-white">
                                        {module.stats.total}
                                    </p>
                                </Card>
                                <Card className="p-6 bg-gray-900 border-white/10">
                                    <p className="text-gray-400 text-sm mb-2">
                                        Active Users
                                    </p>
                                    <p className="text-3xl font-bold text-white">
                                        {module.stats.active}
                                    </p>
                                </Card>
                                <Card className="p-6 bg-gray-900 border-white/10">
                                    <p className="text-gray-400 text-sm mb-2">
                                        Inactive Users
                                    </p>
                                    <p className="text-3xl font-bold text-white">
                                        {(module.stats.total as number) -
                                            (module.stats.active as number)}
                                    </p>
                                </Card>
                                <Card className="p-6 bg-gray-900 border-white/10">
                                    <p className="text-gray-400 text-sm mb-2">
                                        Active Rate
                                    </p>
                                    <p className="text-3xl font-bold text-white">
                                        {(
                                            ((module.stats.active as number) /
                                                (module.stats
                                                    .total as number)) *
                                            100
                                        ).toFixed(1)}
                                        %
                                    </p>
                                </Card>
                            </div>

                            {/* Filters */}
                            <Card className="p-6 bg-gray-900 border-white/10 mb-8">
                                <h2 className="text-lg font-semibold text-white mb-4">
                                    Filters
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">
                                            Search by Name or Email
                                        </label>
                                        <Input
                                            placeholder="Type name or email..."
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            className="bg-gray-800 border-white/10 text-white placeholder:text-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-3">
                                            Filter by Role
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value=""
                                                    checked={
                                                        selectedRole === ""
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedRole(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-gray-300">
                                                    All Roles
                                                </span>
                                            </label>
                                            {[
                                                "Admin",
                                                "Manager",
                                                "Staff",
                                                "User",
                                            ].map((role) => (
                                                <label
                                                    key={role}
                                                    className="flex items-center gap-2 cursor-pointer"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="role"
                                                        value={role}
                                                        checked={
                                                            selectedRole ===
                                                            role
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedRole(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-gray-300">
                                                        {role}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-3">
                                            Filter by Status
                                        </label>
                                        <Select
                                            key={selectedStatus}
                                            value={selectedStatus}
                                            onValueChange={setSelectedStatus}
                                        >
                                            <SelectTrigger className="bg-gray-800 border-white/10 text-white">
                                                <SelectValue placeholder="All Status" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-white/10">
                                                <SelectItem value=" All Status">
                                                    All Status
                                                </SelectItem>
                                                <SelectItem value="Active">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="Invited">
                                                    Invited
                                                </SelectItem>
                                                <SelectItem value="Suspended">
                                                    Suspended
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </Card>

                            <Card className="bg-gray-900 border-white/10 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-gray-800/50">
                                            <TableRow className="border-white/5">
                                                <TableHead className="text-gray-400">
                                                    Name
                                                </TableHead>
                                                <TableHead className="text-gray-400">
                                                    Email
                                                </TableHead>
                                                <TableHead className="text-gray-400">
                                                    Role
                                                </TableHead>
                                                <TableHead className="text-gray-400">
                                                    Status
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredUsers.map((user) => (
                                                <TableRow
                                                    key={user.id}
                                                    className="border-white/5 hover:bg-gray-800/50"
                                                >
                                                    <TableCell className="text-white">
                                                        {user.name}
                                                    </TableCell>
                                                    <TableCell className="text-gray-400">
                                                        {user.email}
                                                    </TableCell>
                                                    <TableCell className="text-gray-300">
                                                        <span className="px-2 py-1 bg-gray-800 rounded text-sm">
                                                            {user.role}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span
                                                            className={`px-2 py-1 rounded text-sm font-medium ${
                                                                user.status ===
                                                                "Active"
                                                                    ? "bg-green-500/20 text-green-400"
                                                                    : user.status ===
                                                                        "Invited"
                                                                      ? "bg-blue-500/20 text-blue-400"
                                                                      : "bg-red-500/20 text-red-400"
                                                            }`}
                                                        >
                                                            {user.status}
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                {filteredUsers.length === 0 && (
                                    <div className="p-8 text-center">
                                        <p className="text-gray-400">
                                            No users found matching your
                                            filters.
                                        </p>
                                    </div>
                                )}
                            </Card>
                        </div>
                    ) : module.id === "training" ? (
                        // Training Curriculum - Schedule and Online Training Tiles
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-6">
                                Training Options
                            </h2>
                            <div className="grid grid-cols-2 gap-6">
                                <Card
                                    className="p-8 bg-gray-900 border-white/10 cursor-pointer hover:bg-gray-800 transition-colors group"
                                    onClick={() =>
                                        router.push(
                                            `/${encodeURIComponent(
                                                module.title
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-"),
                                            )}/sessions`,
                                        )
                                    }
                                >
                                    <div className="text-center">
                                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                            📅
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            Sessions
                                        </h3>
                                        <p className="text-gray-400">
                                            View and manage upcoming training
                                            sessions
                                        </p>
                                    </div>
                                </Card>

                                <Card
                                    className="p-8 bg-gray-900 border-white/10 cursor-pointer hover:bg-gray-800 transition-colors group"
                                    onClick={() =>
                                        router.push(
                                            `/${encodeURIComponent(
                                                module.title
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-"),
                                            )}/online-tutorials`,
                                        )
                                    }
                                >
                                    <div className="text-center">
                                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                            💻
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            Online Tutorials
                                        </h3>
                                        <p className="text-gray-400">
                                            Access online courses and virtual
                                            learning modules
                                        </p>
                                    </div>
                                </Card>

                                <Card
                                    className="p-8 bg-gray-900 border-white/10 cursor-pointer hover:bg-gray-800 transition-colors group"
                                    onClick={() =>
                                        router.push(
                                            `/${encodeURIComponent(
                                                module.title
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-"),
                                            )}/attendance`,
                                        )
                                    }
                                >
                                    <div className="text-center">
                                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                            🧑‍🤝‍🧑
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            Attendance
                                        </h3>
                                        <p className="text-gray-400">
                                            Access the list of attendance for
                                            this module
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="p-6 bg-gray-900 border-white/10">
                                <h2 className="text-lg font-semibold text-white mb-4">
                                    Statistics
                                </h2>
                                <div className="space-y-4">
                                    {Object.entries(module.stats).map(
                                        ([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex justify-between items-center border-b border-white/5 pb-3"
                                            >
                                                <span className="text-gray-400 capitalize">
                                                    {key}
                                                </span>
                                                <span className="text-white font-semibold">
                                                    {value}
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </Card>

                            <Card className="p-6 bg-gray-900 border-white/10">
                                <h2 className="text-lg font-semibold text-white mb-4">
                                    Module Details
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            Module ID
                                        </p>
                                        <p className="text-white font-mono text-sm">
                                            {module.id}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            Category
                                        </p>
                                        <p className="text-white capitalize">
                                            {module.category}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            Icon
                                        </p>
                                        <p className="text-white">
                                            {module.icon}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        );
    };
    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            {/* Ambient background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
            </div>

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
