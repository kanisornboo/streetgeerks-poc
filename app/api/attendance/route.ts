import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("http://localhost:8080/attendance");

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
