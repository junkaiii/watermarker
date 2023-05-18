import ffmpeg from "fluent-ffmpeg";
import { createWriteStream } from "node:fs";

const stream = createWriteStream("outputfile.divx");

export const compress = () =>
  ffmpeg()
    .input("test.mov")
    .input("creatorial.png")
    .complexFilter(["overlay=(W-w)/2:(H-h)/2"])
    .output("compressed.mov")
    .run();
