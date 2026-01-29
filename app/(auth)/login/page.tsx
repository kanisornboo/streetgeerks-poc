"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, LogIn, UserCog, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMockAuth, MOCK_USERS } from "@/lib/auth";

type LoginType = "user" | "staff";

// Demo credentials for testing - now using mock auth system
const DEMO_CREDENTIALS = {
    user: {
        email:
            MOCK_USERS.find((u) => u.role === "participant")?.email ||
            "participant@streetleague.org",
        password:
            MOCK_USERS.find((u) => u.role === "participant")?.password ||
            "Participant123!",
    },
    staff: {
        email:
            MOCK_USERS.find((u) => u.role === "admin")?.email ||
            "demo@streetleague.org",
        password:
            MOCK_USERS.find((u) => u.role === "admin")?.password || "Demo123!",
    },
};

export default function LoginPage() {
    const router = useRouter();
    const { signIn, isSignedIn } = useMockAuth();
    const [loginType, setLoginType] = useState<LoginType>("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Redirect if already signed in
    if (isSignedIn) {
        router.push("/");
        return null;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Use mock auth system
        const result = await signIn(email, password);

        if (result.success) {
            router.push("/");
        } else {
            setError(
                result.error ||
                    "Invalid email or password. Try the demo credentials below.",
            );
        }

        setIsLoading(false);
    };

    const fillDemoCredentials = () => {
        const credentials = DEMO_CREDENTIALS[loginType];
        setEmail(credentials.email);
        setPassword(credentials.password);
        setError("");
    };

    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <Card className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm border-white/10 relative z-10">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-2">
                        <LogIn className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Sign in to access the SkillBuilder Dashboard
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Login Type Toggle */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-gray-800/50 rounded-lg">
                        <button
                            type="button"
                            onClick={() => {
                                setLoginType("user");
                                setError("");
                            }}
                            className={cn(
                                "flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all",
                                loginType === "user"
                                    ? "bg-emerald-600 text-white shadow-lg"
                                    : "text-gray-400 hover:text-white hover:bg-gray-700/50",
                            )}
                        >
                            <Users className="w-4 h-4" />
                            User Login
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setLoginType("staff");
                                setError("");
                            }}
                            className={cn(
                                "flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all",
                                loginType === "staff"
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "text-gray-400 hover:text-white hover:bg-gray-700/50",
                            )}
                        >
                            <UserCog className="w-4 h-4" />
                            Staff Login
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-800 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-300">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="bg-gray-800 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20">
                                <p className="text-sm text-red-400">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                "w-full font-medium",
                                loginType === "user"
                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                    : "bg-blue-600 hover:bg-blue-700",
                            )}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </div>
                            ) : (
                                `Sign in as ${loginType === "user" ? "User" : "Staff"}`
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 border-t border-white/10 pt-6">
                    <div className="w-full">
                        <p className="text-xs text-gray-500 text-center mb-3">
                            Demo Mode - Click to fill credentials
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={fillDemoCredentials}
                            className="w-full text-gray-300 border-white/10 hover:bg-gray-800"
                        >
                            Use Demo Credentials
                        </Button>
                    </div>
                    <div className="text-center text-xs text-gray-500 space-y-1">
                        <p>
                            <span className="text-gray-400">User:</span>{" "}
                            {DEMO_CREDENTIALS.user.email} /{" "}
                            {DEMO_CREDENTIALS.user.password}
                        </p>
                        <p>
                            <span className="text-gray-400">Staff:</span>{" "}
                            {DEMO_CREDENTIALS.staff.email} /{" "}
                            {DEMO_CREDENTIALS.staff.password}
                        </p>
                    </div>
                    <div className="text-center border-t border-white/10 pt-4 w-full">
                        <p className="text-gray-400 text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
