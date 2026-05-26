import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { db } from '../db';
import { resume, analysis } from '../schema';
import { NextResponse } from 'next/server';
import { resumeQueue } from './queue';
import { PDFParse } from "pdf-parse";
import { eq } from 'drizzle-orm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { json } from 'stream/consumers';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.GEMINI_FLASH || '');
const connection = new IORedis({ maxRetriesPerRequest: null });

const worker = new Worker(
  'resumeQueue',
  async job => {

    const { resumeId, fileBase, jobRole } = job.data;
    console.log(`Processing resume ID: ${resumeId}`);

    const buffer = Buffer.from(fileBase, "base64");

    const parser = new PDFParse({ data: buffer });
    let resumeText = '';
    try { 
      const parsed = await parser.getText();
      resumeText = parsed.text;
    } finally {
      await parser.destroy();
    }

    await db
      .update(resume)
      .set({ content: resumeText })
      .where(eq(resume.id, resumeId));

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
      You are a professional resume analyser.
      Analyse the resume below and return ONLY a valid JSON object matching this schema, no extra markdown formatting or wrapping:

      {
        "score": number,
        "feedback": "overall feedback in 3-4 sentences",
        "strengths": "key strengths in 2-3 sentences",
        "weaknesses": "areas to improve in 2-3 sentences",
        "suggestions": "actionable suggestions in 2-3 sentences",
        "jobRole": "most suitable job role for this resume"
      },

      ${jobRole ? `Target Job Role: ${jobRole}` : ''}

      Resume:
      ${resumeText}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();


    const cleaned = text.replace(/```json|```/g, ``).trim();
    const aiResult = JSON.parse(cleaned);

    await db
      .insert(analysis)
      .values({
        resumeId: resumeId,
        score: aiResult.score,
        feedback: aiResult.feedback,
        strengths: aiResult.strengths,
        weaknesses: aiResult.weaknesses,
        suggestions: aiResult.suggestions,
        jobRole: aiResult.jobRole,
        createdAt: new Date(),
      });

    console.log(`Analysis saved for resume ID: ${resumeId}`);
  },
  { connection },
);

worker.on('completed', job => {
  console.log(`${job?.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`);
});