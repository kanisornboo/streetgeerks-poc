"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
    StatsCard,
    ModuleCard,
    ArchitectureDiagram,
} from "@/components/dashboard";
import { dashboardStats, modules } from "@/lib/data";

const filterOptions = ["all", "core", "admin"] as const;

export function DashboardView() {
    const [activeFilter, setActiveFilter] = useState<string>("all");

    const filteredModules =
        activeFilter === "all"
            ? modules
            : modules.filter((m) => m.category === activeFilter);

    return (
        <>
            {/* Stats */}
            <div className="px-8 py-6 border-b border-white/5">
                <div className="grid grid-cols-4 gap-6">
                    {dashboardStats.map((stat) => (
                        <StatsCard key={stat.label} stat={stat} />
                    ))}
                </div>
            </div>

            {/* Modules */}
            <div className="px-8 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">
                        System Modules
                    </h2>
                    <div className="flex gap-2">
                        {filterOptions.map((filter) => (
                            <Button
                                key={filter}
                                variant={
                                    activeFilter === filter
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => setActiveFilter(filter)}
                                className="capitalize"
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-5">
                    {filteredModules.map((module) => (
                        // <Link
                        //     key={module.id}
                        //     href={`/${encodeURIComponent(module.title.toLowerCase().replace(/\s+/g, "-"))}`}
                        // >
                        //     <ModuleCard module={module} />
                        // </Link>
                        <Link
                            href={`/${encodeURIComponent(module.title.toLowerCase().replace(/\s+/g, "-"))}`}
                        >
                            <ModuleCard module={module} />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
