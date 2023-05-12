import express from "express";
import unzipper from "unzipper";
import path from "path";
import fs from "fs";
import multer from "multer";
import http from "http";
import { Server } from "socket.io";
import { log } from "console";

const app = express();
const upload = multer({ dest: 'public/GamesFiles/' });
const server = http.createServer(app);
const PORT = 7878;
const host = "0.0.0.0";
let i = 0;
let lobbies = [];

app.use(express.static('public'));

const random_hex_color_code = () => {
  let n = Math.floor(Math.random() * 999999);
  return n.toString().padStart(6, "0");
};

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

  i++;
  socket.data.id = i;
  socket.data.username = "";
  socket.data.token = null;
  socket.data.current_lobby = null;
  socket.on('disconnect', () => {
    console.log("socket disconected");
  });

  socket.on('datagame', (infoGame) => {

    lobbies.forEach((lobby) => {
      if (lobby.lobbyIdentifier == socket.data.current_lobby) {
        lobby.members.forEach((member) => {
          // console.log("member", member);
          // console.log("memberID", member.idUser);
          // console.log("socket.data.id", socket.data.id);
          if (member.idUser == socket.data.id) {
            socketIO.to(socket.data.current_lobby).emit("send_datagame_to_platform", {
              infoGame
            });
            //console.log(infoGame);
          }
        });
      }
    });
  });

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

        console.log("time", time)

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
  });

  socket.on("new_lobby", (test) => {
    let existeix = false;
    let newLobbyIdentifier;
    do {
      newLobbyIdentifier = random_hex_color_code();

      lobbies.forEach((element) => {
        if (element.lobbyIdentifier == newLobbyIdentifier) {
          existeix = true;
        }
      });
    } while (existeix);

    if (!existeix) {
      let lobbyData = {
        lobbyIdentifier: newLobbyIdentifier,
        ownerId: socket.data.id,
        yourId: socket.data.id,
        //maxMembers: config.max_players,
        members: [{
          idUser: socket.data.id,
          username: test,
          isOwner: true,
        }],
      };

      lobbies.push(lobbyData);
      socketIO.to(socket.id).emit("lobby_info", lobbyData);
      console.log("lobbyData", lobbyData);
      console.log("lobbyData", newLobbyIdentifier);

      socket.join(newLobbyIdentifier);
      socket.data.current_lobby = newLobbyIdentifier;

      sendUserList(socket.data.current_lobby);
    }
  });

  socket.on("join_room", (data) => {
    // if (data.username.length > 8) {
    //   socketIO.to(socket.id).emit("USR_NAME_TOO_LONG");
    // } else {
    //socket.data.username = data.username;
    console.log("data", data);
    joinLobby(socket, data.lobbyIdentifier, data.username);
    // }
  });
  
  socket.on("get_players_in_lobby", () => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    lobbies.forEach((lobby) => {
      if (lobby.lobbyIdentifier == socket.data.current_lobby) {
        console.log("lobbyAAAAAAAAA", lobby);

        let lobbyData = {
          lobbyIdentifier: socket.data.current_lobby,
          ownerId: lobby.ownerId,
          yourId: socket.data.id,
          //maxMembers: config.max_players,
          members: lobby.members
        };

        console.log("LOBIDATA", lobbyData);


        socketIO.to(socket.id).emit("lobby_info", lobbyData);    
      }
    });
  });

  socket.on("can_start_game", () => {
    console.log("Start game", socket.data.current_lobby);
    socketIO.to(socket.data.current_lobby).emit("start_game");
  });
  
});


server.listen(PORT, host, () => {
  console.log("Listening on *:" + PORT);
});

function sendUserList(room) {
  var list = [];

  lobbies.forEach((lobby) => {
    if (lobby.lobbyIdentifier == room) {
      lobby.members.forEach((member) => {
        list.push({
          name: member.username,
        });
      });
    }
  });

  socketIO.to(room).emit("lobby_user_list", {
    list: list,
    message: "user list",
  });
}

function joinLobby(socket, lobbyIdentifier, username) {
  var disponible = false;
  console.log("lobby", lobbies);
  lobbies.forEach((lobby) => {
    if (lobby.lobbyIdentifier == lobbyIdentifier) {
      disponible = true;
      lobby.members.forEach((member) => {
        console.log(lobby.ownerId, " / ", socket.data.id);
        console.log(member.username, " / ", username);
        // console.log(lobby.members.length, " / ", lobby.maxMembers);
        // if (lobby.members.length == lobby.maxMembers) {
        //   disponible = false;
        //   console.log("Can't add user");
        // }
        if (member.username == username || lobby.ownerId == socket.data.id) {
          disponible = false;
          console.log("Can't add user");
        }
      });

      if (disponible) {
        lobby.members.push({
          idUser: socket.data.id,
          username: username,
          isOwner: false,
        });
        lobby.yourId = socket.data.id;
        socketIO.to(socket.id).emit("lobby_info", lobby);
      } else {
        socketIO.to(socket.id).emit("USER_ALR_CHOSEN_ERROR");
      }
    }
  });

  if (disponible) {
    socket.join(lobbyIdentifier);
    socket.data.current_lobby = lobbyIdentifier;
    sendUserList(lobbyIdentifier);
  }
}