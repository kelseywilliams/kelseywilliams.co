const express = require("express")
const http = require("http");
const https = require("https");
const fs = require("fs");
const dotenv = require("dotenv").config();

const app = express()
const port = 3000


app.use(express.static("public"));
app.get("/", (req, res) => {
    if (err) res.sendStatusCode(500);
    res.sendStatusCode(200);
})

console.log(process.env.NODE_ENV); 
var server;
if (process.env.NODE_ENV === "production") {
    var key = fs.readFileSync("/etc/letsencrypt/live/kelseywilliams.co/privkey.pem");
    var cert = fs.readFileSync("/etc/letsencrypt/live/kelseywilliams.co/fullchain.pem");
    var options = {
        key: key,
        cert: cert
    };

    var server = https.createServer(options, app);
    console.log("Express server on https");
} else {
    server = http.createServer(app);
    console.log("Express server on http");
}
server.listen(3000);

console.log('Express started on port 3000');