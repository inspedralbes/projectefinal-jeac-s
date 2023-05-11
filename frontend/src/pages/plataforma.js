import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Socket } from "socket.io-client";
import ConnectedUsers from "../components/ConnectedUsers.js"

var Phaser = null;
var obj = null;
var ownerLobby;

import('phaser')
  .then((module) => {
    Phaser = module;
  })

function Game({ socket, sharedValue, sharedId }) {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const userInfo = useSelector((state) => state.data);

  const [lobbyId, setLobbyId] = useState("");
  const [lobbyIdInput, setLobbyIdInput] = useState("");
  const [displayCanvas, setDisplayCanvas] = useState(false);
  const [username, setUsername] = useState("");
  const [gameModeSelected, setGameModeSelected] = useState(false);
  const [singlePlayer, setSinglePlayer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [singlePlayerUserName, setSinglePlayerUserName] = useState(null);
  const [createRoomOwner, setcreateRoomOwner] = useState(null);
  const [optionSelected, setOptionSelected] = useState(false);

  // console.log(sharedValue)
  // console.log(sharedId)

  useEffect(() => {
    socket.on("lobby_info", (data) => {
      setLobbyId(data.lobbyIdentifier);
      ownerLobby = data;
      console.log(ownerLobby);
    });

    socket.on("start_game", () => {
      setDisplayCanvas(true);
      play();
    });

    socket.on('send_datagame_to_platform', (data) => {
      if (obj != null) {
        obj.recibirInfoFromPlatform(data);
      }
    });
    if (isLoggedIn) {
      setSinglePlayerUserName(userInfo.name);
    }
  }, [userInfo, isLoggedIn]);

  //Funciones lobby single player.
  function saveUsername() {
    if (singlePlayerUserName != null) {
      socket.emit("new_lobby", singlePlayerUserName);
    } else {
      console.log("El nombre no puede estar vacio");
    }
  };

  function handleSetSinglePlayerUsername(e) {
    setSinglePlayerUserName(e.target.value);
  }

  function handleSaveUsernameOnClick() {
    if (singlePlayerUserName != null) {
      socket.emit("new_lobby", singlePlayerUserName);
    } else {
      console.log("El nombre no puede estar vacio");
    }
  };
  //Hasta aqui single player

  //Funciones lobby multi player.

  function joinRoom() {
    setcreateRoomOwner(false);
    setOptionSelected(true);
  }

  function createRoom() {
    setcreateRoomOwner(true);
    setOptionSelected(true);
  }

  // function JoinLobby() {
  //   if (lobbyIdInput != null & username != null) {
  //     socket.emit("join_room", {
  //       lobbyIdentifier: lobbyIdInput,
  //       username: username,
  //     });
  //   }
  // }

  function startGame() {
    socket.emit("can_start_game");
    setGameStarted(true);
  }

  function play() {
    socket.emit("get_players_in_lobby");

    fetch('http://localhost:7878/GamesFiles/TestGame/juego.js', {
      method: 'GET',
      mode: 'same-origin',
    })
      .then(response =>
        response.text()
      )
      .then(scriptText => {
        const scriptFn = new Function(scriptText + '; return executeGame()');
        obj = scriptFn();
        obj.init(sendInfoGame, finalJuego);
        obj.recibirInfoLobby(ownerLobby);
      })
  }

  function sendInfoGame(infoGame) {
    socket.emit("datagame", infoGame);
  }

  function finalJuego() {
    alert("JUEGO ACABADO");
  }

  return (
    <div>
      {!gameModeSelected ?
        <div>
          <button onClick={() => { setGameModeSelected(true); setSinglePlayer(true); }}>Single Player</button>
          <button onClick={() => { setGameModeSelected(true); setSinglePlayer(false); }}>Multiplayer</button>
        </div>
        :
        <div>
          {singlePlayer ?
            <div>
              {isLoggedIn ?
                <div>
                  <p>SINGLE - Logged in</p>
                  {singlePlayerUserName && <p>{singlePlayerUserName}</p>}
                  <button onClick={() => { saveUsername(); startGame(); }}>PLAY</button>
                </div>
                :
                <div>
                  <p>SINGLE - No Logged in</p>
                  <label>
                    <div>
                      <input
                        id="singlePNotLoggedIn"
                        className="form__input"
                        onChange={handleSetSinglePlayerUsername}
                        placeholder="Username"
                        type="text"
                        required
                      />
                      <label>
                        Introduce your nickname
                      </label><br></br>
                      <button onClick={() => { handleSaveUsernameOnClick(); startGame(); }}>PLAY</button>
                    </div>
                  </label>
                </div>
              }
            </div>
            :
            <div>
              {!optionSelected ?
                <div>
                  <button onClick={createRoom}>Create lobby</button>
                  <button onClick={joinRoom}>Join lobby</button>
                </div> :
                <></>
              }
              {createRoomOwner ?
                <div>
                  {isLoggedIn ?
                    <p>OWNER - Logged in</p>
                    :
                    <p>OWNER - No Logged in</p>
                  }
                </div>
                :
                <></>
              }
            </div>
          }
        </div>
      }
      {displayCanvas ?
        <div>
          <div>
          </div>
          <div id="game">
            <canvas id="canvas" className="canvasGame"></canvas>
          </div>
        </div>
        :
        <></>
      }
    </div>
  )
}

export default Game;