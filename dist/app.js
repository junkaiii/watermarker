"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fetch_1 = require("./fetch");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const corsOptions = {
    origin: "https://creatorial.ai",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.post("/watermark", (0, cors_1.default)(corsOptions), async (req, res) => {
    const sourceUrl = req.body.sourceUrl;
    if (!!sourceUrl) {
        res.status(400);
    }
    // fetch the file from source
    try {
        const result = await (0, fetch_1.fetchVideo)(sourceUrl);
        const remoteDir = sourceUrl.substring(0, sourceUrl.lastIndexOf("/"));
        res.status(200).send({ result: `${remoteDir}/${result}` });
    }
    catch (e) {
        console.log("something went wrong");
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
