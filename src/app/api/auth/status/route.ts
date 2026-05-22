import { db } from "@/lib/db";
import { resume, analysis } from "@/lib/schema";
import { error } from "console";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }
) {
    try {
        const [row] = await db
            .select()
            .from(resume)
            .leftJoin(analysis, eq(analysis.resumeId, resume.id))
            .where(eq(resume.id, parseInt(params.id)));

        if (!row) {
            return NextResponse.json(
                { error: "Resume not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            status: row.analysis ? "completed" : "pending",
            analysis: row.analysis ?? null
        })

        
    } catch (error) {
        console.error("GET /api/status error:", error)
        return NextResponse.json(
            { error: "Failed to fetch status" },
            { status: 500 }
        );
    }
}