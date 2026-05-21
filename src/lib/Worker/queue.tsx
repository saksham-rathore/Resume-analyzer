import { Queue } from "bullmq";

export const connection = {
  host: 'localhost',
  port: 6379,
}

export const resumeQueue = new Queue('resumeQueue', { connection });