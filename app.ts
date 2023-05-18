import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { fetchVideo } from "./fetch";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/watermark", async (req, res) => {
  // const sourceUrl = req.body.sourceUrl;
  // fetch the file from source
  await fetchVideo(
    "https://creatorial.ai/wp-content/uploads/video/6460713fbe58a1.56943651_hd0992.mp4"
  );
  res.send();
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
