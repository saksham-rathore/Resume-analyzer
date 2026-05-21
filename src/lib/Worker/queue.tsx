import { Queue } from "bullmq";

const queue = new Queue("Paint");
await queue.add("cars", {
  color: "blue",
  delay: 30000
});