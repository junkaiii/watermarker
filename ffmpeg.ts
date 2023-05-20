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
        "[1]format=rgba,colorchannelmixer=aa=0.5[logo]",
        {
          inputs: ["0", "logo"],
          filter: "overlay",
          options: { x: "(W-w)/2", y: "(H-h)/2" },
        },
      ])
      .output(compressedFileName)
      .on("end", () => {
        console.log("[ffmpeg] finished");
        unlinkSync(fileName);
        resolve(compressedFileName);
      })
      .run();
  });
};
