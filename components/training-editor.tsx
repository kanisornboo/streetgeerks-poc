"use client";

import { ArrowLeft, Clock, Play, User } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Header, Sidebar } from "./layout";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { modules } from "@/lib/data";
import { useParams } from "next/navigation";
import { useState } from "react";

// Mock video data - Youth Program Education
const videoData = [
    {
        id: "1",
        title: "Building Confidence & Self-Esteem",
        description:
            "Learn techniques to build self-confidence and develop a positive self-image for personal and professional success",
        thumbnail: "/api/placeholder/400/225",
        duration: "12:45",
        instructor: "Sarah Johnson",
        videoUrl: "https://www.youtube.com/watch?v=MDJ8a07NokM",
    },
    {
        id: "2",
        title: "CV Writing & Job Applications",
        description:
            "Step-by-step guide to creating an impactful CV and writing compelling job applications that stand out",
        thumbnail: "/api/placeholder/400/225",
        duration: "18:30",
        instructor: "Michael Thompson",
        videoUrl: "https://www.youtube.com/watch?v=jBbnb71RnEM",
    },
    {
        id: "3",
        title: "Interview Skills & Preparation",
        description:
            "Master the art of interviews with practical tips on preparation, body language, and answering tough questions",
        thumbnail: "/api/placeholder/400/225",
        duration: "22:15",
        instructor: "Emily Carter",
        videoUrl: "https://www.youtube.com/watch?v=r3g-7_W4AuI",
    },
    {
        id: "4",
        title: "Financial Literacy for Young Adults",
        description:
            "Understanding budgeting, saving, and managing money effectively for a secure financial future",
        thumbnail: "/api/placeholder/400/225",
        duration: "16:00",
        instructor: "David Williams",
        videoUrl: "https://www.youtube.com/watch?v=ii--386Sz1w",
    },
    {
        id: "5",
        title: "Communication & Teamwork Skills",
        description:
            "Develop essential communication skills and learn how to work effectively in team environments",
        thumbnail: "/api/placeholder/400/225",
        duration: "14:20",
        instructor: "Lisa Anderson",
        videoUrl: "https://www.youtube.com/watch?v=9Ot7z51zD6U",
    },
    {
        id: "6",
        title: "Goal Setting & Career Planning",
        description:
            "Create a roadmap for your future with effective goal-setting strategies and career planning techniques",
        thumbnail: "/api/placeholder/400/225",
        duration: "20:45",
        instructor: "James Mitchell",
        videoUrl: "https://www.youtube.com/watch?v=kWVNuajgPjI",
    },
];

type Video = (typeof videoData)[number];

// Helper function to convert YouTube URL to embed URL
const getYouTubeEmbedUrl = (url: string): string => {
    const videoIdMatch = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
    );
    if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1`;
    }
    return url;
};

const pageConfig: Record<string, { title: string; subtitle: string }> = {
    tutorials: {
        title: "Online Tutorials",
        subtitle: "Watch and learn from our video tutorials",
    },
};

export default function TrainingEditor({ trainingId }: { trainingId: string }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeNav, setActiveNav] = useState("tutorials");
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const params = useParams();
    const moduleName = params.moduleName as string;

    const { title, subtitle } = pageConfig[activeNav] || pageConfig.tutorials;

    const module = modules.find(
        (m) =>
            m.title.toLowerCase().replace(/\s+/g, "-") ===
            decodeURIComponent(moduleName),
    );

    const handleVideoClick = (video: Video) => {
        setSelectedVideo(video);
        setIsVideoOpen(true);
    };

    const handleCloseVideo = () => {
        setIsVideoOpen(false);
        setSelectedVideo(null);
    };

    const renderContent = () => {
        return (
            <div className="w-full px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videoData.map((video) => (
                        <div
                            key={video.id}
                            onClick={() => handleVideoClick(video)}
                            className="group cursor-pointer rounded-lg border border-white/10 bg-gray-800/50 overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
                        >
                            {/* Video Thumbnail */}
                            <div className="relative aspect-video bg-gray-900">
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                                    <div className="text-gray-500 text-sm">
                                        Video Thumbnail
                                    </div>
                                </div>
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <Play className="w-8 h-8 text-white fill-white" />
                                    </div>
                                </div>
                                {/* Duration Badge */}
                                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 text-white text-xs flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {video.duration}
                                </div>
                            </div>

                            {/* Video Info */}
                            <div className="p-4">
                                <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                                    {video.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                    {video.description}
                                </p>
                                <div className="flex items-center gap-2 text-gray-500 text-xs">
                                    <User className="w-3 h-3" />
                                    <span>{video.instructor}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Video Player Dialog */}
                <Dialog open={isVideoOpen} onOpenChange={handleCloseVideo}>
                    <DialogContent className="bg-gray-900 border-white/10 max-w-4xl p-0 overflow-hidden">
                        <DialogHeader className="p-6 pb-0">
                            <DialogTitle className="text-white text-xl">
                                {selectedVideo?.title}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="p-6">
                            {/* Video Player */}
                            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
                                {selectedVideo && (
                                    <iframe
                                        src={getYouTubeEmbedUrl(
                                            selectedVideo.videoUrl,
                                        )}
                                        title={selectedVideo.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                )}
                            </div>
                            {/* Video Details */}
                            <div className="space-y-3">
                                <p className="text-gray-300">
                                    {selectedVideo?.description}
                                </p>
                                <div className="flex items-center gap-4 text-gray-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>{selectedVideo?.instructor}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{selectedVideo?.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
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
                        {module?.title || "Online Tutorials"}
                    </h1>
                    <p className="text-gray-400">
                        {module?.description ||
                            "Browse and watch our video tutorials"}
                    </p>
                </div>

                {/* <Header title={title} subtitle={subtitle} /> */}
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
