import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import fetch from "node-fetch";
import { compress } from "./ffmpeg";
import { uploadFile } from "./upload";

export const fetchVideo = async (url: string) => {
  const streamPipeline = promisify(pipeline);

  const response = await fetch(url);
  const fileName = url.split("\\")?.pop()?.split("/").pop();
  if (!fileName) {
    throw new Error("Invalid file name");
  }

  if (!response.ok || response.body === null)
    throw new Error(`unexpected response ${response.statusText}`);

  console.log("kkj", fileName);
  await streamPipeline(response.body, createWriteStream(`${fileName}`));
  console.log("download completed");
  const compressedFileName = (await compress(fileName)) as string;
  console.log("compress completed");
  return await uploadFile(compressedFileName);
};
