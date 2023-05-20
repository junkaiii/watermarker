import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import fetch from "node-fetch";
import { compress } from "./ffmpeg";
import { uploadFile } from "./upload";

export const fetchVideo = async (url: string) => {
  const streamPipeline = promisify(pipeline);

  const response = await fetch(url);

  if (!response.ok || response.body === null)
    throw new Error(`unexpected response ${response.statusText}`);

  await streamPipeline(response.body, createWriteStream("./test.mov"));
  console.log("download completed");
  await compress();
  console.log("compress completed");
  await uploadFile();
};
