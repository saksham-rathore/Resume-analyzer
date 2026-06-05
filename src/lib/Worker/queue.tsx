import { Queue } from "bullmq";
import IORedis from "ioredis";

export const connection = process.env.REDIS_URL
  ? new IORedis(process.env.REDIS_URL, { maxRetriesPerRequest: null, lazyConnect: true })
  : new IORedis({
      host: 'localhost',
      port: 6379,
      maxRetriesPerRequest: null,
      lazyConnect: true,
    });

connection.on('error', (err) => {
  console.warn("Queue background connection to Redis failed:", err.message);
});

export const resumeQueue = new Queue('resumeQueue', { connection });