const express = require("express")
const http = require("http");
const https = require("https");
const fs = require("fs");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

const app = express()
const port = 3000

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDb connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});
const messageSchema = new Schema({
    time: String,
    msg: String
});
const Message = mongoose.model("Message", messageSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", (req, res) => {
    if (err) res.status(500);
    res.status(200);
})

app.post("/api/input", (req, res) => {
    const message = req.body.message;
    const msg = new Message({
        time: new Date().toLocaleString(),
        msg: message
    });
    msg.save().then(message => {
        if (message === msg) {
            alert("Saved to database successfully.");
        }
    }).catch(err => {
        console.log(`Error saving to database: ${err}`);
        alert("Error saving to database.");
        res.status(500);
    })
})

app.get("/api/output", async (req, res) => {
    res.contentType("application/json");
    try{
        const msgs = await Message.find({});
        res.json(msgs);
    } catch(err) {
            console.log(`Database output returned error: ${err}`);
            res.status(500);
    }
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