import * as ftp from "basic-ftp";
import { unlink } from "node:fs";

export const uploadFile = async (fileName: string) => {
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
      fileName,
      `./creatorial.ai/public_html/wp-content/uploads/video/${fileName}`
    );
    console.log("uploaded");
    unlink(fileName, () => client.close());
    return fileName;
  } catch (err) {
    console.log(err);
  }
};
