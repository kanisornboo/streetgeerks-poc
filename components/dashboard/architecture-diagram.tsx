import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ArchitectureLayerProps {
    title: string;
    items: { label: string; color: string }[];
    columns?: number;
}

function Connector() {
    return (
        <div className="flex justify-center py-2">
            <div className="w-px h-8 bg-gradient-to-b from-yellow-500/30 to-amber-500/30" />
        </div>
    );
}

export function ArchitectureDiagram() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>System Architecture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {/* Presentation Layer */}
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                        Presentation Layer
                    </p>
                    <div className="flex gap-4">
                        <div className="flex-1 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                            <span className="text-emerald-400 font-medium">
                                Login & Registration
                            </span>
                        </div>
                        <div className="flex-1 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
                            <span className="text-yellow-400 font-medium">
                                SkillBuilder Dashboard
                            </span>
                        </div>
                    </div>
                </div>

                <Connector />

                {/* Core Services */}
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                        Core Services
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
                            <span className="text-yellow-400 font-medium">
                                User Mgmt
                            </span>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                            <span className="text-amber-400 font-medium">
                                Skills Gap
                            </span>
                        </div>
                        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
                            <span className="text-orange-400 font-medium">
                                Training Curriculum
                            </span>
                        </div>
                    </div>
                </div>

                <Connector />

                {/* Backend Services */}
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                        Backend Services
                    </p>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl bg-slate-500/10 border border-slate-500/20 text-center">
                            <span className="text-slate-400 font-medium">
                                Staff Mgmt
                            </span>
                        </div>
                        <div className="p-4 rounded-xl bg-gray-500/10 border border-gray-500/20 text-center">
                            <span className="text-gray-400 font-medium">
                                Data Integ.
                            </span>
                        </div>
                        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
                            <span className="text-yellow-400 font-medium">
                                Jobs
                            </span>
                        </div>
                        <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-center">
                            <span className="text-violet-400 font-medium">
                                AI Imaging
                            </span>
                        </div>
                    </div>
                </div>

                <Connector />

                {/* External Integrations */}
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                        External Integrations
                    </p>
                    <div className="flex gap-4">
                        <div className="flex-1 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                            <span className="text-amber-400 font-medium">
                                CRM
                            </span>
                        </div>
                        <div className="flex-1 p-4 rounded-xl bg-gray-500/10 border border-gray-500/20 text-center">
                            <span className="text-gray-400 font-medium">
                                External Interfaces
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
