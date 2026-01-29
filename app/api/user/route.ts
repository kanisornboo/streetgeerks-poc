import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch users" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: "Failed to connect to backend" },
            { status: 500 }
        );
    }
}
