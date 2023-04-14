const express = require('express');
const app = express();
const unzipper = require('unzipper');
var fs = require('fs');
const cors = require("cors");


const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io");

const multer = require('multer');
const upload = multer({ dest: 'extractedFiles/' }); // Establece el directorio de destino para los archivos cargados

const io = new Server(server);


const PORT = 7878;
const host = "0.0.0.0";

// const socketIO = require("socket.io")(server, {
//   cors: {
//     origin: true,
//     credentials: true,
//   },
//   path: "/node/",
// });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    next();
  });



io.on('connection', (socket) => {
    console.log('Socket connected');
  
    socket.on('file-upload', (file) => {
      console.log('File received');
  
      const filePath = `extractedFiles/${file.name}`;
  
      file.mv(filePath, (err) => {
        if (err) {
          console.error('Error uploading file', err);
          return;
        }
  
        fs.createReadStream(filePath)
          .pipe(unzipper.Parse())
          .on('entry', function (entry) {
            const fileName = entry.path;
  
            // check if the entry is the initGame.js file
            if (fileName === 'initGame.js') {
              console.log('initGame.js file exists!');
              // do something with the file
            }
            else {
                console.log('initGame.js file dont exists!');

            }
  
            // auto detect if it is a directory or a file
            const type = entry.type; // 'Directory' or 'File'
  
            // if it is a file, extract it to disk
            if (type === 'File') {
              const outputFilePath = `extractedFiles/${fileName}`;
  
              entry.pipe(fs.createWriteStream(outputFilePath));
            } else {
              entry.autodrain();
            }
          })
          .on('finish', () => {
            console.log('Extraction complete!');
          });
      });
    });
  });
  
  server.listen(PORT, host, () => {
    console.log("Listening on *:" + PORT);
  });