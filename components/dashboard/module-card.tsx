import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Module } from "@/types";
import { ArrowRight } from "lucide-react";

interface ModuleCardProps {
    module: Module;
    onClick?: () => void;
}

export function ModuleCard({ module, onClick }: ModuleCardProps) {
    return (
        <Card
            onClick={onClick}
            className="group relative p-6 cursor-pointer hover:border-yellow-500/30 hover:bg-white/[0.04] transition-all duration-300"
        >
            {/* Gradient hover effect */}
            <div
                className={cn(
                    "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
                    module.color,
                )}
            />

            <div className="relative">
                <div className="flex items-start justify-between mb-4">
                    <div
                        className={cn(
                            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl shadow-lg",
                            module.color,
                        )}
                    >
                        {module.icon === "User" && "👤"}
                        {module.icon === "BarChart" && "📊"}
                        {module.icon === "BookOpen" && "📚"}
                        {module.icon === "Users" && "👥"}
                        {module.icon === "RefreshCw" && "🔄"}
                        {module.icon === "Briefcase" && "💼"}
                        {module.icon === "Bot" && "🤖"}
                        {module.icon === "Plug" && "🔌"}
                        {module.icon === "Handshake" && "🤝"}
                        {module.icon === "FolderOpen" && "📂"}
                    </div>
                    <Badge
                        variant="secondary"
                        className="text-[10px] uppercase tracking-wider"
                    >
                        {module.category}
                    </Badge>
                </div>

                <h3 className="text-lg font-semibold mb-1 group-hover:text-yellow-400 transition-colors">
                    {module.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {module.description}
                </p>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                    {Object.entries(module.stats).map(([key, value]) => (
                        <div key={key}>
                            <p className="text-xs text-gray-500 capitalize">
                                {key}
                            </p>
                            <p className="text-sm font-semibold mt-0.5">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Arrow indicator */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                <ArrowRight className="h-5 w-5 text-yellow-400" />
            </div>
        </Card>
    );
}
