const express = require("express")
const app = express()
const port = 3000

app.use(express.static("public"));
app.get("/", (req, res) => {
    if (err) res.sendStatusCode(500);
    res.sendStatusCode(200);
})

app.listen(3000);
console.log('Express started on port 3000');