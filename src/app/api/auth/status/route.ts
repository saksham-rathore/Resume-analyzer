import { db } from "@/lib/db";
import { resume, analysis } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Resume id is required" },
                { status: 400 }
            );
        }

        const resumeRows = await db
            .select({ id: resume.id })
            .from(resume)
            .where(eq(resume.id, parseInt(id)));

        if (resumeRows.length === 0) {
            return NextResponse.json(
                { error: "Resume not found" },
                { status: 404 }
            );
        }

        const analysisRows = await db
            .select()
            .from(analysis)
            .where(eq(analysis.resumeId, parseInt(id)));

        const row = { analysis: analysisRows[0] || null };

        if (!row) {
            return NextResponse.json(
                { error: "Resume not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            status: row.analysis ? "completed" : "pending",
            analysis: row.analysis ?? null
        });

        
    } catch (error) {
        console.error("GET /api/status error:", error)
        return NextResponse.json(
            { error: "Failed to fetch status" },
            { status: 500 }
        );
    }
}