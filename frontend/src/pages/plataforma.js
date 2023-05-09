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

function Game({ socket }) {
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

  useEffect(() => {
    socket.on("lobby_info", (data) => {
      setLobbyId(data.lobbyIdentifier);
      ownerLobby = data;
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
    }
  }, [userInfo, isLoggedIn]);

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
      console.log("El nombre del owner no puede estar vacioo");
      setOwnerNameSubmitted(false);
    }
  };

  function createRoom() {
    setcreateRoomOwner(true);
    setOptionSelected(true)
  }

  function play() {
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
      {createRoomOwner ?
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

      {createRoomOwner ?
        <div>
          {ownerNameSubmitted ?
            <div>
              {!gameStarted ?
                <button onClick={startGame}>Play</button>
                :
                <></>
              }
            </div> :
            <div>
              <input
                id="nickOwner"
                value={ownerName}
                onChange={handleOwnerNameChange}
                className="form__input"
                placeholder="Username"
                type="text"
                required
              />
              <button onClick={handleSaveClick}>Guardar</button><br></br><br></br>
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
  )
}

export default Game;