import express from "express";
import unzipper from "unzipper";
import path from "path";
import fs from "fs";
import multer from "multer";
import http from "http";
import { Server } from "socket.io";

const app = express();
const upload = multer({ dest: 'public/GamesFiles/' });
const server = http.createServer(app);
const PORT = 7878;
const host = "0.0.0.0";
let i = 0;
let lobbies = [];

const random_hex_color_code = () => {
  let n = Math.floor(Math.random() * 9999);
  return n.toString().padStart(4, "0");
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
    console.log("socket disconected", socket.data.id);
    leaveLobby(socket);
  });

  socket.on('datagame', (infoGame) => {

    lobbies.forEach((lobby) => {
      if (lobby.lobbyIdentifier == socket.data.current_lobby) {
        lobby.members.forEach((member) => {
          if (member.idUser == socket.data.id) {
            socketIO.to(socket.data.current_lobby).emit("send_datagame_to_platform", {
              infoGame
            });
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

          fs.createReadStream(filepath)
            .pipe(unzipper.Extract({ path: `public/GamesFiles/${file.name}` }))
            .on('close', () => {
              console.log('Extraction complete!');

              const initGamePath = path.join('public', 'GamesFiles', file.name, 'game.js');

              fs.readFile(filepath, 'utf-8', (error, data) => {
                if (error) {
                  console.error(error);
                  return;
                }

                const containsInitGame = data.includes('game.js');

                console.log(`File ${zipName} contains game.js: ${containsInitGame}`);

                if (containsInitGame) {
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

                    fs.writeFile(imgPath, imgbuffer, (error) => {
                      if (error) {
                        console.error(error);
                        return;
                      }
                    });
                
                  });
                  socket.emit("message_error", "Uploaded successfully");
                }
                else {
                  console.log("Error validacion");
                  socket.emit("upload_error", "Error en la subida. El zip no contiene el script game.js o las carpetas images y scripts");
                  socket.emit("message_error", "The zip does not contain the game.js file ");


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
                  initGame: `/GamesFiles/${file.name}/game.js`,
                  img: `/GamesImages/${file.name}/${file.img.name}`
                }

                socket.emit("extraction_complete", routes);

              });
            });
        });
      }
      else {
        console.log("Nombre no disponible");
        socket.emit("message_error", "Name already in use");

      }
    }
    else {
      console.log("Nombre vacio");
      socket.emit("message_error", "Name cannot be empty");

    }
  });

  socket.on('file_update', (file) => {
    console.log("File", file);

    let existNameFolder = false;
    if (file.newName != '') {
      const NameFolderExist = path.join('public', 'GamesFiles', file.newName);
      existNameFolder = fs.existsSync(NameFolderExist);
    }

    if (!existNameFolder) {

      if (file.img) {
        console.log("Tiene IMAGEN");

        const imgbuffer = Buffer.from(
          file.img.data.replace(/^data:([A-Za-z-+/]+);base64,/, ''),
          'base64'
        );

        let imgPath = `public/GamesImages/${file.currentName}/${file.img.name}`;
        let folderPath = 'public/GamesImages/' + file.currentName;

        fs.writeFile(imgPath, imgbuffer, (error) => {
          if (error) {
            console.error(error);
            return;
          }
        });

        fs.readdir(folderPath, (err, images) => {
          if (err) throw err;

          for (const image of images) {

            if (image != file.img.name) {
              fs.unlink(path.join(folderPath, image), (err) => {
                if (err) throw err;
              });
            }
          }
        });
      }
      if (file.zip) {
        extracZip(file);
      }

      if (file.newName != '' && !file.zip) {
        renameFolders(file);
      }
      else if (file.newName == '') {

        let routes = {
          initGame: `/GamesFiles/${file.currentName}/game.js`,
        }

        if (file.img) {
          routes.img = `/GamesImages/${file.currentName}/${file.img.name}`
        }
        socket.emit("update_complete", routes);
      }
    }
    else {
      console.log("NOMBRE YA EXISTE");
      socket.emit("message_error", "Name already in use");

    }
  });

  socket.on('update_zip', (file) => {
    console.log("File to update", file);
  })

  socket.on("new_lobby", (data) => {
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
        gameID: data.gameId,
        ownerId: socket.data.id,
        yourId: socket.data.id,
        maxMembers: data.max_players,
        members: [{
          idUser: socket.data.id,
          username: data.username,
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
      console.log("New Lobby");
    }
  });

  socket.on("join_room", (data) => {
    console.log("data", data);
    joinLobby(socket, data.lobbyIdentifier, data.username, data.gameID);
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
          members: lobby.members
        };
        console.log("LOBIDATA", lobbyData);
        socketIO.to(socket.id).emit("lobby_info", lobbyData);
      }
    });
  });

  socket.on("can_start_game", () => {
    lobbies.forEach((lobby) => {
      if (lobby.lobbyIdentifier == socket.data.current_lobby) {
        if (lobby.members.length > 1) {
          console.log("Start game", socket.data.current_lobby);
          socketIO.to(socket.data.current_lobby).emit("start_game");
        }

        else {
          socketIO.to(socket.id).emit("message_error_start_game", "You cannot play alone");
        }

      }
    });
  });

  socket.on("leave_lobby", () => {
    leaveLobby(socket);
  });

  socket.on("delete_game", (game) => {
    fs.rm(`./public/GamesFiles/${game}`, { recursive: true }, (err) => {
      if (err) throw console.log("AAAA", err);;
      console.log('path/file.txt was deleted');

    });
    fs.rm(`./public/GamesImages/${game}`, { recursive: true }, (err) => {
      if (err) throw console.log("AAAA", err);;
      console.log('path/file.txt was deleted');

    });
  })  
});


server.listen(PORT, host, () => {
  console.log("Listening on *:" + PORT);
});


function extracZip(file) {
  const buffer = Buffer.from(
    file.zip.data.replace(/^data:([A-Za-z-+/]+);base64,/, ''),
    'base64'
  );

  const zipName = `${Date.now()}-${file.zip.name}`;
  const date = Date.now();

  const filepath = `public/GamesFiles/${zipName}`;

  fs.writeFile(filepath, buffer, (error) => {
    if (error) {
      console.error(error);
      return;
    }

    fs.createReadStream(filepath)
      .pipe(unzipper.Extract({ path: `public/GamesFiles/${file.currentName}_${date}` }))
      .on('close', () => {

        const initGamePath = path.join('public', 'GamesFiles', file.currentName, 'game.js');

        fs.readFile(filepath, 'utf-8', (error, data) => {
          if (error) {
            console.error(error);
            return;
          }

          const containsInitGame = data.includes('game.js');

          console.log(`File ${zipName} contains game.js: ${containsInitGame}`);

          if (containsInitGame) {
            console.log("Zip correct");

            fs.createReadStream(filepath)
              .pipe(unzipper.Extract({ path: `public/GamesFiles/${file.currentName}` }))
              .on('close', () => {
                const folderPath = 'public/GamesImages/' + file.currentName;
              });
          }
          else {
            console.log("Error validacion");
            socketIO.emit("upload_error", "Error en la subida. El zip no contiene el script game.js o las carpetas images y scripts");
          }

          fs.rm(`./public/GamesFiles/${file.currentName}_${date}`, { recursive: true }, (err) => {
            if (err) throw console.log("AAAA", err);
            console.log('path/file.txt was deleted');
          });

          fs.unlink(`./public/GamesFiles/${zipName}`, (err) => {
            if (err) throw console.log("AAAA", err);
            console.log('path/file.txt was deleted');
          });

          if (file.newName != '') {
            renameFolders(file);
          }
        });
      });
  });
}

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

function joinLobby(socket, lobbyIdentifier, username, gameID) {
  var disponible = false;
  console.log("lobby", lobbies);
  lobbies.forEach((lobby) => {
    if (lobby.lobbyIdentifier == lobbyIdentifier) {
      disponible = true;
      lobby.members.forEach((member) => {
        console.log(lobby.ownerId, " / ", socket.data.id);
        console.log(member.username, " / ", username);
        console.log("members", lobby.members.length, " / ", lobby.maxMembers);
        console.log("IDs", lobby.gameID, " / ", gameID);

        if (lobby.members.length >= lobby.maxMembers || lobby.gameID != gameID || member.username == username || lobby.ownerId == socket.data.id) {
          disponible = false;
          console.log("Can't add user");
          if (lobby.members.length >= lobby.maxMembers) {
            socketIO.to(socket.id).emit("message_error", "Can't join lobby. Lobby full");
          }
          else if (lobby.gameID != gameID) {
            socketIO.to(socket.id).emit("message_error", "Can't join lobby. Wrong Lobby");
          }
          else if (member.username == username) {
            socketIO.to(socket.id).emit("message_error", "Can't join lobby. Name already in use");
          }
          else if (lobby.ownerId == socket.data.id) {
            socketIO.to(socket.id).emit("message_error", "Can't join lobby.");
          }
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
        console.log("User added");
      } else {
        socketIO.to(socket.id).emit("USER_ALR_CHOSEN_ERROR");
      }
    }
    else {
      socketIO.to(socket.id).emit("message_error", "Can't join lobby. Wrong lobby indetifier");
    }
  });
  if (disponible) {
    socket.join(lobbyIdentifier);
    socket.data.current_lobby = lobbyIdentifier;
    sendUserList(lobbyIdentifier);
  }
}

function leaveLobby(socket) {
  lobbies.forEach((lobby, ind_lobby) => {
    if (lobby.lobbyIdentifier == socket.data.current_lobby) {
      lobby.members.forEach((member, index) => {
        if (member.idUser == socket.data.id) {
            console.log("User left: ", member);
            socketIO.to(socket.data.current_lobby).emit("user_left_lobby", member);
            lobby.members.splice(index, 1);
        }
        if (lobby.members.length == 0) {
          console.log("Lobby with 0 users");
          lobbies.splice(ind_lobby, 1);
        }
      }); 
    }
  });
  socket.leave(socket.data.current_lobby);
  socket.data.current_lobby = null;
  socketIO.to(socket.id).emit("YOU_LEFT_LOBBY");
}

// function deleteLobby(socket) {
//   lobbies.forEach((lobby, ind_lobby) => {
//     if (lobby.lobbyIdentifier == socket.data.current_lobby) {
//       lobbies.splice(ind_lobby, 1);
//       socketIO.to(lobby.lobbyIdentifier).emit("lobby_deleted", {
//         message: "Lobby has been deleted by the owner",
//       });
//     }
//   });

//   socket.leave(socket.data.current_lobby);
//   socket.data.current_lobby = null;
// }


function renameFolders(file) {
  const folderPathImg = `public/GamesImages/${file.currentName}`;
  const newPathImg = `public/GamesImages/${file.newName}`;

  fs.access(folderPathImg, fs.constants.W_OK, (err) => {
    if (err) {
      console.error('No tienes permisos para realizar la operación de cambio de nombre.');
      return;
    }
  });

  fs.rename(folderPathImg, newPathImg, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log("Successfully renamed the directory.")
    }
  })

  const folderPathScript = `public/GamesFiles/${file.currentName}`;
  const newPathScripts = `public/GamesFiles/${file.newName}`;

  fs.rename(folderPathScript, newPathScripts, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log("Successfully renamed the directory.")
    }
  })

  let routes;

  if (file.img) {
    routes = {
      initGame: `/GamesFiles/${file.newName}/game.js`,
      img: `/GamesImages/${file.newName}/${file.img.name}`
    }
  }
  else {
    let folderPath = 'public/GamesImages/' + file.currentName;

    fs.readdir(folderPath, (err, images) => {
      if (err) throw err;
      let aux = true;
      for (const image of images) {
        if (aux) {
          routes = {
            initGame: `/GamesFiles/${file.newName}/game.js`,
            img: `/GamesImages/${file.newName}/${image}`

          }
          console.log("image", routes);
          socketIO.emit("update_complete", routes);
        }
        aux = false;
      }
    });
  }
}