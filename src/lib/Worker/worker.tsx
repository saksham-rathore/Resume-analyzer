import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { db } from '../db';
import { resume, analysis } from '../schema';
import { NextResponse } from 'next/server';
import { resumeQueue } from './queue';

const connection = new IORedis({ maxRetriesPerRequest: null });

const worker = new Worker(
  'resumeQueue',
  async job => {

    console.log(job.data);
  },
  { connection },
);

worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});