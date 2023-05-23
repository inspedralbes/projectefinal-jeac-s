const http = require("http");
const express = require("express");


const app = express();
const server = http.createServer(app);
const PORT = 7979;
const host = "0.0.0.0";

app.use(express.static('public'));

server.listen(PORT, host, () => {
    console.log("Listening on *:"+ PORT);
})