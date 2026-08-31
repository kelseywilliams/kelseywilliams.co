import express from "express";
import cors from "cors";
import path from "path";
// import cookieParser from "cookie-parser";
import { PORT } from "./config/index.js";
import { corsConfig } from "./utils/corsConfig.js";
import logger from "./utils/logger.js";

const app = express();
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const frontend = path.join(import.meta.dirname, "../frontend/dist/");
app.use("/", express.static(frontend, {index: false}));

// SPA fallback
app.get(/^\/(?!assets\/).*/, (_, res) => {
    res.sendFile(path.join(frontend, "index.html"));
})

app.listen(PORT, () => { logger.info(`Server listening on port ${PORT}`)});