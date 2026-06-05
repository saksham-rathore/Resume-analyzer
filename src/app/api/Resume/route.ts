import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { resume, users, analysis } from "@/lib/schema";
import { resumeQueue } from "@/lib/Worker/queue";
import { eq, desc } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get("file") as File;
        const title = formData.get("title") as string;
        const jobRole = formData.get("jobRole") as string;
        const userId = formData.get("userId") as string;

        if (!file) {
            return NextResponse.json(
                { error: "No resume field provided" },
                { status: 400 },
            );
        };

        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = buffer.toString("base64")

        const [newResume] = await db
            .insert(resume)
            .values({
                userId: userId,
                title: title || file.name,
                content: "",
                fileUrl: "",
                createdAt: new Date(),
            })
            .returning();

        await resumeQueue.add(
            "analyse",
            {
                resumeId: newResume.id,
                fileBase: base64,
                jobRole: jobRole || "",
            },
            {
                attempts: 3,
                backoff: { type: "exponential", delay: 2000 }
            }
        );

        return NextResponse.json({
            resumeId: newResume.id,
            status: "pending",
        });

    } catch (error) {
        console.error("POST /api/resume error:", error);
        return NextResponse.json(
            { error: "Failed to upload resume" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        const resumes = await db
            .select({
                id: resume.id,
                userId: resume.userId,
                title: resume.title,
                content: resume.content,
                fileUrl: resume.fileUrl,
                createdAt: resume.createdAt,
                analysis: {
                    id: analysis.id,
                    score: analysis.score,
                    feedback: analysis.feedback,
                    strengths: analysis.strengths,
                    weaknesses: analysis.weaknesses,
                    suggestions: analysis.suggestions,
                    jobRole: analysis.jobRole,
                }
            })
            .from(resume)
            .leftJoin(analysis, eq(analysis.resumeId, resume.id))
            .where(eq(resume.userId, userId))
            .orderBy(desc(resume.createdAt));

        return NextResponse.json(resumes);

    } catch (error) {
        console.error("GET /api/resumes error:", error);
        return NextResponse.json(
            { error: "Failed to fetch resumes" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Resume ID is required" },
                { status: 400 }
            );
        }

        await db
            .delete(resume)
            .where(eq(resume.id, parseInt(id)));

        return NextResponse.json({ success: true, message: "Resume deleted successfully" });
    } catch (error) {
        console.error("DELETE /api/Resume error:", error);
        return NextResponse.json(
            { error: "Failed to delete resume" },
            { status: 500 }
        );
    }
}