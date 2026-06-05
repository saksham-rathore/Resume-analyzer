import { Queue } from "bullmq";
import IORedis from "ioredis";

let resumeQueue: Queue | null = null;

export function getResumeQueue() {
  if (!resumeQueue) {
    const connection = new IORedis(process.env.REDIS_URL || "redis://127.0.0.1:6380", { 
      maxRetriesPerRequest: null, 
      lazyConnect: true 
    });

    connection.on('error', (err) => {
      console.warn("Queue background connection to Redis failed:", err.message);
    });

    resumeQueue = new Queue('resumeQueue', { connection });
  }
  return resumeQueue;
}