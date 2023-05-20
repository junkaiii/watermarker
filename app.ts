import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { fetchVideo } from "./fetch";
import bodyParser = require("body-parser");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/watermark", async (req, res) => {
  const sourceUrl = req.body.sourceUrl;
  if (!!sourceUrl) {
    res.status(400);
  }
  // fetch the file from source
  try {
    await fetchVideo(
      // "https://creatorial.ai/wp-content/uploads/video/6460713fbe58a1.56943651_hd0992.mp4"
      sourceUrl
    );
    res.status(200).send();
  } catch (e) {
    console.log("something went wrong");
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
