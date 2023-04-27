// const express = require('express');
// const unzipper = require('unzipper');
// const path = require('path');

// var fs = require('fs');
// const cors = require("cors");


// const multer = require('multer');
// const bodyParser = require('body-parser');
//const http = require("http");

import  express from "express";
import unzipper from "unzipper";

import path from "path";

import cors from "cors";

import multer from "multer";

import bodyParser from "body-parser";

import http from "http";

import { Server } from "socket.io";


const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


const upload = multer({ dest: 'extractedFiles/' }); // Establece el directorio de destino para los archivos cargados



const server = http.createServer(app);

app.use(express.static('public'));


const PORT = 7878;
const host = "0.0.0.0";


// const socketIO = require("socket.io")(server, {
//   cors: {
//     origin: true,
//     credentials: true,
//   },
//   path: "/node/",
// });

const socketIO = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
    path: "/node/public/",
  });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next()
})

socketIO.on('connection', (socket) => {
  console.log('Socket connected');

  socket.on('file-upload', (file) => {
    console.log('File received');
    const buffer = Buffer.from(
      file.data.replace(/^data:([A-Za-z-+/]+);base64,/, ''),
      'base64'
    );

    const filename = `${Date.now()}-${file.name}`;
    const filepath = `extractedFiles/${filename}`;

    fs.writeFile(filepath, buffer, (error) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(`File ${filename} saved`);


      console.log('File saved to disk');

      fs.createReadStream(filepath)
        .pipe(unzipper.Extract({ path: 'extractedFiles/' }))
        .on('close', () => {
          console.log('Extraction complete!');

          const initGamePath = path.join('extractedFiles', 'initGame.js');
          const imagesFolderPath = path.join('extractedFiles', 'images');
          const scriptsFolderPath = path.join('extractedFiles', 'scripts');
    
          fs.readFile(filepath, 'utf-8', (error, data) => {
            if (error) {
              console.error(error);
              return;
            }
    
            const containsInitGame = data.includes('initGame.js');
            const containsImagesFolder = fs.existsSync(imagesFolderPath);
            const containsScriptFolder = fs.existsSync(scriptsFolderPath);
    
            console.log(`File ${filename} contains initGame.js: ${containsInitGame}`);
            console.log(`File ${filename} contains images folder: ${containsImagesFolder}`);
            console.log(`File ${filename} contains scripts folder: ${containsScriptFolder}`);
            
            if (containsInitGame & containsImagesFolder & containsScriptFolder) {
              console.log("Zip correct");
    
              const filePath = path.join('extractedFiles', 'initGame.js');
              const fileName = path.parse(filePath).name;
              fs.readFile(filePath, (err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log("filename", fileName);
                console.log("datda", data);
    
                let data3 = [
                  {
                    name: fileName,
                    file: data
                  }
                ]
                socket.emit('fileData', data3);
              });
            }
          });
          
        });

      //const filePath = req.file.path;

      // const filePath = `extractedFiles/aaaa`;
      // console.log("filePath", filePath);
      // console.log("Ffile", file.path);
      // fse.move(file.path, filePath, (err) => {
      //   if (err) {
      //     console.error('Error uploading file', err);
      //     return;
      //   }

      //   fs.createReadStream(filePath)
      //     .pipe(unzipper.Parse())
      //     .on('entry', function (entry) {
      //       const fileName = entry.path;

      //       // check if the entry is the initGame.js file
      //       if (fileName === 'initGame.js') {
      //         console.log('initGame.js file exists!');
      //         // do something with the file
      //       }
      //       else {
      //           console.log('initGame.js file dont exists!');

      //       }

      //       // auto detect if it is a directory or a file
      //       const type = entry.type; // 'Directory' or 'File'

      //       // if it is a file, extract it to disk
      //       if (type === 'File') {
      //         const outputFilePath = `extractedFiles/${fileName}`;

      //         entry.pipe(fs.createWriteStream(outputFilePath));
      //       } else {
      //         entry.autodrain();
      //       }
      //     })
      //     .on('finish', () => {
      //       console.log('Extraction complete!');
      //     });
    });
  });
});

server.listen(PORT, host, () => {
  console.log("Listening on *:" + PORT);
});