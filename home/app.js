import express from "express";
import http from "http";
// import https from "https";
import fs from "fs";
import dotenv from "dotenv";
import logger from "./logger.js"

dotenv.config();
import {
    createClient,
} from 'redis';

const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', err => logger.error('Redis Client Error', err));

await client.connect();
await client.isReady;
console.log(await client.ping());

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", (req, res) => {
    if (err) res.status(500);
    res.status(200);
})

app.post("/api/input", async (req, res) => {
    const message = req.body.message;
    try {
        const id = await client.incr("message:id");
        const key = `msg:${id}`;

        await client.hSet(key, {
            time: new Date().toLocaleString(),
            msg: message,
        });
        await client.rPush("messages:list", key);

        res.redirect("/api/output")
        res.status(200);
    } catch (err) {
        logger.error(`Error storing message:`, err);
        res.status(500);
    }
})

app.get("/api/output", async (req, res) => {
    res.contentType("application/json");
    try {
        // Retrieve all keys that start with "msg:"
        const keys = await client.lRange("messages:list", 0, -1);
        const messages = [];
    
        // Loop through each key and get the hash data
        for (const key of keys) {
          const message = await client.hGetAll(key);
          messages.push(message);
        }
        
        res.json(messages);
      } catch (err) {
        logger.error("Error retrieving messages:", err);
        res.status(500)
      }
})
var server;

// Implement later once tls between services is implemented
// if (process.env.NODE_ENV === "production") {
//     var key = fs.readFileSync("/etc/letsencrypt/live/kelseywilliams.co/privkey.pem");
//     var cert = fs.readFileSync("/etc/letsencrypt/live/kelseywilliams.co/fullchain.pem");
//     var options = {
//         key: key,
//         cert: cert
//     };

//     var server = https.createServer(options, app);
//     console.log("Express server on https");
// } else {
//     server = http.createServer(app);
//     console.log("Express server on http");
// }

let port = process.env.PORT;
try{
    server = http.createServer(app);
    server.listen(port);
    logger.info(`Server started on port ${port}`);
}
catch(err){
    logger.error(`Server failed to start on port ${port}`, err)
    throw new Error(err);
}
