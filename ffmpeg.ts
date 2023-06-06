import ffmpeg from "fluent-ffmpeg";
import { unlinkSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";

export const compress = async (fileName: string) => {
  return new Promise((resolve, reject) => {
    const compressedFileName = `${randomUUID()}-watermarked-${fileName}`;
    ffmpeg()
      .setFfmpegPath(ffmpegPath)
      .on("progress", (progress) => {
        console.log(`[ffmpeg] ${JSON.stringify(progress)}`);
      })
      .on("error", (err) => {
        console.log(`[ffmpeg] error: ${err.message}`);
        reject(err);
      })
      .input(`${fileName}`)
      .input("creatorial.png")
      .complexFilter([
        "[1]format=rgba,colorchannelmixer=aa=0.3[logo]",
        "[logo][0]scale2ref=w=iw:h=ow/mdar[logo][video]",
        "[video][logo]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2[video]",
        "[video]scale=720:trunc(ow/a/2)*2",
      ])
      .videoCodec("libx264")
      .output(compressedFileName)
      .on("end", () => {
        console.log("[ffmpeg] finished");
        unlinkSync(fileName);
        resolve(compressedFileName);
      })
      .run();
  });
};
