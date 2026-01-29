import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch attendance: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching attendance:", error);
        return NextResponse.json(
            { error: "Failed to fetch attendance data" },
            { status: 500 }
        );
    }
}
