import express from "express";
import http from "http";
// import https from "https";
import fs from "fs";
import dotenv from "dotenv";
import logger from "./logger.js"

dotenv.config();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", (req, res) => {
    if (err) res.status(500);
    res.status(200);
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
