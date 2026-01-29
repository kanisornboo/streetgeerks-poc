"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMockAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, UserPlus, Check } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const { signUp, isSignedIn } = useMockAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Redirect if already signed in
    if (isSignedIn) {
        router.push("/");
        return null;
    }

    const passwordRequirements = [
        { met: formData.password.length >= 8, text: "At least 8 characters" },
        { met: /[A-Z]/.test(formData.password), text: "One uppercase letter" },
        { met: /[a-z]/.test(formData.password), text: "One lowercase letter" },
        { met: /[0-9]/.test(formData.password), text: "One number" },
        {
            met: /[!@#$%^&*]/.test(formData.password),
            text: "One special character (!@#$%^&*)",
        },
    ];

    const isPasswordValid = passwordRequirements.every((req) => req.met);
    const passwordsMatch =
        formData.password === formData.confirmPassword &&
        formData.confirmPassword !== "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!isPasswordValid) {
            setError("Please meet all password requirements");
            return;
        }

        if (!passwordsMatch) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        const result = await signUp({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
        });

        if (result.success) {
            router.push("/");
        } else {
            setError(result.error || "An error occurred");
        }

        setIsLoading(false);
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
                        <UserPlus className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">
                        Create Account
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Join SkillBuilder and start your journey
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {error && (
                        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20">
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="firstName"
                                    className="text-gray-300"
                                >
                                    First Name
                                </Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="bg-gray-800 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="lastName"
                                    className="text-gray-300"
                                >
                                    Last Name
                                </Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="bg-gray-800 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
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
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
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

                            {/* Password Requirements */}
                            {formData.password && (
                                <div className="mt-2 space-y-1">
                                    {passwordRequirements.map((req, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-2 text-xs ${
                                                req.met
                                                    ? "text-emerald-400"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            <div
                                                className={`w-3 h-3 rounded-full flex items-center justify-center ${
                                                    req.met
                                                        ? "bg-emerald-400/20"
                                                        : "bg-gray-700"
                                                }`}
                                            >
                                                {req.met && (
                                                    <Check className="w-2 h-2" />
                                                )}
                                            </div>
                                            {req.text}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="confirmPassword"
                                className="text-gray-300"
                            >
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`bg-gray-800 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500 pr-10 ${
                                        formData.confirmPassword &&
                                        !passwordsMatch
                                            ? "border-red-500 focus:border-red-500"
                                            : ""
                                    }`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            {formData.confirmPassword && !passwordsMatch && (
                                <p className="text-xs text-red-400 mt-1">
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={
                                isLoading || !isPasswordValid || !passwordsMatch
                            }
                            className="w-full bg-emerald-600 hover:bg-emerald-700 font-medium disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating account...
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 border-t border-white/10 pt-6">
                    <p className="text-center text-xs text-gray-500">
                        By creating an account, you agree to our{" "}
                        <Link
                            href="/terms"
                            className="text-emerald-400 hover:text-emerald-300"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="text-emerald-400 hover:text-emerald-300"
                        >
                            Privacy Policy
                        </Link>
                    </p>
                    <div className="text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
