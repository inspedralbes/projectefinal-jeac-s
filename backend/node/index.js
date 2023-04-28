// const express = require('express');
// const unzipper = require('unzipper');
// const path = require('path');

// var fs = require('fs');
// const cors = require("cors");


// const multer = require('multer');
// const bodyParser = require('body-parser');
//const http = require("http");

import express from "express";
import unzipper from "unzipper";

import path from "path";

import cors from "cors";

import fs from "fs";

import multer from "multer";

import bodyParser from "body-parser";

import http from "http";

import { Server } from "socket.io";
import e from "express";


const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


const upload = multer({ dest: 'public/GamesFiles/' }); // Establece el directorio de destino para los archivos cargados



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
    origin: true,
    credentials: true,
  },
  path: "/node/",
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
    console.log('File received', file);

    if (file.name != '') {
      const NameFolderExist = path.join('public', 'GamesFiles', file.name);
      const existNameFolder = fs.existsSync(NameFolderExist);

      if (!existNameFolder) {
        const buffer = Buffer.from(
          file.zip.data.replace(/^data:([A-Za-z-+/]+);base64,/, ''),
          'base64'
        );

        const zipName = `${Date.now()}-${file.zip.name}`;
  
        var dt = new Date();
        let time = dt.getDate() + "_" + (dt.getMonth() + 1) + "_" + dt.getFullYear()
  
        console.log("time", time);
  
        const filepath = `public/GamesFiles/${zipName}`;
  
        fs.writeFile(filepath, buffer, (error) => {
          if (error) {
            console.error(error);
            return;
          }
  
          console.log(`File ${zipName} saved`);
  
  
          console.log('File saved to disk');
  
          fs.createReadStream(filepath)
            .pipe(unzipper.Extract({ path: `public/GamesFiles/${file.name}` }))
            .on('close', () => {
              console.log('Extraction complete!');
  
              const initGamePath = path.join('public', 'GamesFiles', file.name, 'initGame.js');
              const imagesFolderPath = path.join('public', 'GamesFiles', file.name, 'images');
              const scriptsFolderPath = path.join('public', 'GamesFiles', file.name, 'scripts');
  
              fs.readFile(filepath, 'utf-8', (error, data) => {
                if (error) {
                  console.error(error);
                  return;
                }
  
                const containsInitGame = data.includes('initGame.js');
                const containsImagesFolder = fs.existsSync(imagesFolderPath);
                const containsScriptFolder = fs.existsSync(scriptsFolderPath);
  
                console.log(`File ${zipName} contains initGame.js: ${containsInitGame}`);
                console.log(`File ${zipName} contains images folder: ${containsImagesFolder}`);
                console.log(`File ${zipName} contains scripts folder: ${containsScriptFolder}`);
  
                if (containsInitGame & containsImagesFolder & containsScriptFolder) {
                  console.log("Zip correct");

                  const imgbuffer = Buffer.from(
                    file.img.data.replace(/^data:([A-Za-z-+/]+);base64,/, ''),
                    'base64'
                  );
                  
                  const folderPath = 'public/GamesImages/' + file.name;  
                  const imgPath = `public/GamesImages/${file.name}/${file.img.name}`;

                  fs.mkdir(folderPath, { recursive: true }, (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }
                    console.log(`La carpeta ha sido creada.`);

                    fs.writeFile(imgPath, imgbuffer, (error) => {
                      if (error) {
                        console.error(error);
                        return;
                      }
                    });
                  });
                }
                else {
                  console.log("Error validacion");
                  socket.emit("upload_error", "Error en la subida. El zip no contiene el script initGame o las carpetas images y scripts");
  
                  fs.rm(`./public/GamesFiles/${file.name}`, { recursive: true }, (err) => {
                    if (err) throw console.log("AAAA", err);;
                    console.log('path/file.txt was deleted');
  
                  });
                }
  
                fs.unlink(`./public/GamesFiles/${zipName}`, (err) => {
                  if (err) throw console.log("AAAA", err);;
                  console.log('path/file.txt was deleted');
                });

                let routes = {
                  initGame: `/GamesFiles/${file.name}/initGame.js`,
                  img: `/GamesImages/${file.name}/${file.img.name}`
                }

                socket.emit("extraction_complete", routes);

              });
            });
        });
      }
      else {
        console.log("Nombre no disponible");
      }
    }
    else {
      console.log("Nombre vacio");
    }

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

server.listen(PORT, host, () => {
  console.log("Listening on *:" + PORT);
});