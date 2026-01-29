import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch("http://localhost:8080/attendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Failed to create attendance: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error("Error creating attendance:", error);
        return NextResponse.json(
            { error: "Failed to create attendance record" },
            { status: 500 }
        );
    }
}