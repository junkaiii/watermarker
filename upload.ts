import * as ftp from "basic-ftp";
import { unlink } from "node:fs";

export const uploadFile = async () => {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: "ftp.creatorial.ai",
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
    });
    console.log(await client.list());
    await client.uploadFrom(
      "compressed.mov",
      "./creatorial.ai/public_html/wp-content/uploads/video/compressed.mov"
    );
    console.log("uploaded");
    unlink("compressed.mov", () => client.close());
  } catch (err) {
    console.log(err);
  }
};
