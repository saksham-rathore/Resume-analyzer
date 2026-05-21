import { Queue } from "bullmq";

const connection = {
  host: 'localhost',
  port: 6379,
}

const resumeQueue = new Queue('resumeQueue', { connection });

module.exports = {
  resumeQueue,
  connection,
}