import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { db } from '../db';
import { resume, analysis } from '../schema';
import { NextResponse } from 'next/server';
import { resumeQueue } from './queue';
import { PDFParse } from "pdf-parse";
import { eq } from 'drizzle-orm';

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
      .where(eq(resume.id, resumeId))


    const model = genAI.getGenerativeModel({ model: 'Gemini-2.5-flash' });
  },
  { connection },
);

worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});