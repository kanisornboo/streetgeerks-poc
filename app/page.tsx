"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar, Header } from "@/components/layout";
import {
    DashboardView,
    ParticipantsView,
    ProgrammesView,
    AnalyticsView,
    SettingsView,
} from "@/components/dashboard";

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

export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeNav, setActiveNav] = useState("dashboard");

    const { title, subtitle } = pageConfig[activeNav] || pageConfig.dashboard;

    const renderContent = () => {
        switch (activeNav) {
            case "participants":
                return <ParticipantsView />;
            case "programmes":
                return <ProgrammesView />;
            case "analytics":
                return <AnalyticsView />;
            case "settings":
                return <SettingsView />;
            default:
                return <DashboardView />;
        }
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
