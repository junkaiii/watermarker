import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { fetchVideo } from "./fetch";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const corsOptions = {
  origin: "https://creatorial.ai",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/watermark", cors(corsOptions), async (req, res) => {
  const sourceUrl = req.body.sourceUrl;
  if (!!sourceUrl) {
    res.status(400);
  }
  // fetch the file from source
  try {
    const result = await fetchVideo(sourceUrl);
    const remoteDir = sourceUrl.substring(0, sourceUrl.lastIndexOf("/"));
    res.status(200).send({ result: `${remoteDir}/${result}` });
  } catch (e) {
    console.log("something went wrong");
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
