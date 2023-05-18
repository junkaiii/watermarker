"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fetch_1 = require("./fetch");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/watermark", async (req, res) => {
    // const sourceUrl = req.body.sourceUrl;
    // fetch the file from source
    await (0, fetch_1.fetchVideo)("https://creatorial.ai/wp-content/uploads/video/6460713fbe58a1.56943651_hd0992.mp4");
    res.send();
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
