import ffmpeg from "fluent-ffmpeg";
import { createWriteStream, unlinkSync } from "node:fs";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath);

const stream = createWriteStream("outputfile.divx");

export const compress = async () => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .on("progress", (progress) => {
        console.log(`[ffmpeg] ${JSON.stringify(progress)}`);
      })
      .on("error", (err) => {
        console.log(`[ffmpeg] error: ${err.message}`);
        reject(err);
      })

      .input("test.mov")
      .input("creatorial.png")
      .complexFilter([
        "[1]format=rgba,colorchannelmixer=aa=0.5[logo]",
        {
          inputs: ["0", "logo"],
          filter: "overlay",
          options: { x: "(W-w)/2", y: "(H-h)/2" },
        },
      ])
      .output("compressed.mov")
      .on("end", () => {
        console.log("[ffmpeg] finished");
        unlinkSync("test.mov");
        resolve(null);
      })
      .run();
  });
};
