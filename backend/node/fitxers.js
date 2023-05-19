import express from "express";
import multer from "multer";
import http from "http";


const app = express();
const upload = multer({ dest: 'public/GamesFiles/' });
const server = http.createServer(app);
const PORT = 7979;
const host = "0.0.0.0";


app.use(express.static('public'));

server.listen(PORT, host, () => {
    console.log("Listening on *:" + PORT);
  });