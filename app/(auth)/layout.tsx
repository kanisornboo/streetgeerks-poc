"use client";

import { MockAuthProvider } from "@/lib/auth";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MockAuthProvider>{children}</MockAuthProvider>;
}
