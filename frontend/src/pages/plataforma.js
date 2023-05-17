import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Socket } from "socket.io-client";
import ConnectedUsers from "../components/ConnectedUsers.js"
import routes from "../index.js";

var Phaser = null;
var obj = null;
var ownerLobby;

import('phaser')
  .then((module) => {
    Phaser = module;
  })

function Game({ socket , sharedValue, sharedId}) {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const userInfo = useSelector((state) => state.data);

  const [lobbyId, setLobbyId] = useState("");
  const [lobbyIdInput, setLobbyIdInput] = useState("");
  const [username, setUsername] = useState("");
  const [displayCanvas, setDisplayCanvas] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [createRoomOwner, setcreateRoomOwner] = useState(false);
  const [optionSelected, setOptionSelected] = useState(false);
  const [ownerName, setOwnerName] = useState(null);
  const [userJoinedLobbyName, setUserJoinedLobbyName] = useState(false);
  const [ownerNameSubmitted, setOwnerNameSubmitted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameModeSelected, setGameModeSelected] = useState(false);
  const [singlePlayer, setSinglePlayer] = useState(false);

  console.log(sharedValue)
  console.log(sharedId)

  useEffect(() => {
    socket.on("lobby_info", (data) => {
      setLobbyId(data.lobbyIdentifier);
      ownerLobby = data;
      console.log(ownerLobby);
    });

    socket.on("start_game", () => {
      setDisplayCanvas(true);
      setDisplayForm(false);
      play();
    });

    socket.on('send_datagame_to_platform', (data) => {
      if (obj != null) {
        obj.recibirInfoFromPlatform(data);
      }
    });
    if (isLoggedIn) {
      setUsername(userInfo.name);
      setOwnerName(userInfo.name)
    }
  }, [userInfo, isLoggedIn]);


  function gameMode() {
    setGameModeSelected(true);
  }
  function JoinLobby() {
    setUserJoinedLobbyName(true);
    if (lobbyIdInput != null & username != null) {
      socket.emit("join_room", {
        lobbyIdentifier: lobbyIdInput,
        username: username,
      });
    }
  }

  function toggleForm() {
    setDisplayForm(true);
    setcreateRoomOwner(false);
    setOptionSelected(true);
  }

  function handleChangeLobbyId(e) {
    setLobbyIdInput(e.target.value);
  }

  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  function startGame() {
    if (ownerName != null) {
      socket.emit("can_start_game");
      setGameStarted(true);
    } else {
      console.log("El nombre del owner no puede estar vacio");
    }
  }

  const handleOwnerNameChange = (event) => {
    setOwnerName(event.target.value);
  };

  const handleSaveClick = () => {
    if (ownerName != null) {
      socket.emit("new_lobby", ownerName);
      setOwnerNameSubmitted(true);
    } else {
      console.log("El nombre del owner no puede estar vacio");
    }
  };

  function createRoom() {
    setcreateRoomOwner(true);
    setOptionSelected(true)
  }

  function play() {
    socket.emit("get_players_in_lobby");

    fetch("http://jeacsgames.jeacsg.alumnes.inspedralbes.cat/node", {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Request-Method":"POST, GET, PUT, OPTIONS"
      //'Access-Control-Allow-Headers': 'API-Key'
      },
    })
      .then(response =>
        //  console.log("Response == ", response.text())
        response.text()
      )
      .then(scriptText => {
        console.log("ScriptText ===", scriptText.length);
        console.log("ScriptText FI");
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
          <button onClick={() => { gameMode(); setSinglePlayer(true); }}>Single Player</button>
          <button onClick={() => { gameMode(); setSinglePlayer(false); }}>Multiplayer</button>
        </div>
        :
        <div>
          {!singlePlayer ?
            <div>
              {createRoomOwner && !gameStarted ?
                <h1>{lobbyId}</h1> :
                <></>
              }
              <div>
                {!optionSelected ?
                  <div>
                    <button onClick={createRoom}>Create lobby</button>
                    <button onClick={toggleForm}>JoinLobby</button>
                  </div> :
                  <></>
                }
                <ConnectedUsers socket={socket} />
              </div>

              {displayForm && !createRoomOwner && !userJoinedLobbyName ?
                <div>
                  {!isLoggedIn ?
                    <div id="join_lobby_form">
                      <br></br>
                      <label className="JoinLobby__nickname--grid">
                        <div className="form__inputGroup">
                          <input
                            id="nickname"
                            value={username}
                            className="form__input"
                            onChange={handleChangeUsername}
                            placeholder=" "
                            type="text"
                            required
                          />
                          <span className="form__inputBar"></span>
                          <label className="form__inputlabel">
                            Introduce your nickname
                          </label>
                        </div>
                      </label>
                    </div> :
                    <p>{userInfo.name}</p>
                  }

                  <label>
                    <div>
                      <input
                        value={lobbyIdInput}
                        onChange={handleChangeLobbyId}
                        placeholder="Introduce id"
                        type="text"
                        required
                      ></input>
                      <label>Introduce lobby ID</label>
                    </div>
                  </label>
                  <button onClick={JoinLobby}>Join lobby</button>
                </div>
                :
                <></>
              }
            </div> :
            <div>
              {!isLoggedIn ?
                <input
                  id="nickOwner"
                  value={ownerName}
                  onChange={handleOwnerNameChange}
                  className="form__input"
                  placeholder="Username"
                  type="text"
                  required
                /> :
                <p>{ownerName}</p>
              }
              {!gameStarted ?
                <div>
                  <button onClick={handleSaveClick}>Aceptar</button><br></br><br></br>
                  <button onClick={startGame}>Play</button>
                </div>
                :
                <></>
              }
            </div>
          }
          {createRoomOwner ?
            <div>
              {ownerNameSubmitted ?
                <div>
                  {!gameStarted ?
                    <div>
                      <button onClick={startGame}>Play</button>
                    </div>
                    :
                    <></>
                  }
                </div> :
                <div>
                  {!isLoggedIn ?
                    <input
                      id="nickOwner"
                      value={ownerName}
                      onChange={handleOwnerNameChange}
                      className="form__input"
                      placeholder="Username"
                      type="text"
                      required
                    /> :
                    <p>{ownerName}</p>
                  }
                  <button onClick={handleSaveClick}>Aceptar</button><br></br><br></br>
                </div>
              }
            </div> :
            <></>
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
      }
    </div>
  )
}

export default Game;