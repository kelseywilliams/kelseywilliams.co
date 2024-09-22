const express = require("express")
const http = require("http");
const https = require("https");
const fs = require("fs");
const app = express()
const port = 3000


app.use(express.static("public"));
app.get("/", (req, res) => {
    if (err) res.sendStatusCode(500);
    res.sendStatusCode(200);
})

var server;
if (process.env.NODE_ENV === "production") {
    var key = fs.readFileSync("/etc/ssl/certs/kelseywilliams.co.key");
    var cert = fs.readFileSync("/etc/ssl/certs/kelseywilliams.co.crt");
    var options = {
        key: key,
        cert: cert
    };

    var server = https.createServer(options, app);
    server.listen(3000);
} else server = http.createServer(app);
server.listen(3000);

console.log('Express started on port 3000');