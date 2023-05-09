import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Socket } from "socket.io-client";
import ConnectedUsers from "../components/ConnectedUsers.js"

var Phaser = null;
var obj = null;
var ownerLobby;
var ownerName;

import('phaser')
  .then((module) => {
    Phaser = module;
  })

function Game({ socket }) {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [lobbyId, setLobbyId] = useState("");
  const [lobbyIdInput, setLobbyIdInput] = useState("");
  const [username, setUsername] = useState("");
  const [displayCanvas, setDisplayCanvas] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [createRoomOwner, setcreateRoomOwner] = useState(false);
  const userInfo = useSelector((state) => state.data);
  const [ownerName, setOwnerName] = useState(null);
  const [ownerNameSubmitted, setOwnerNameSubmitted] = useState(false);

  useEffect(() => {
    socket.on("lobby_info", (data) => {
      setLobbyId(data.lobbyIdentifier);
      ownerLobby = data;
    });

    socket.on("start_game", () => {
      setDisplayCanvas(true);
      setDisplayForm(false);
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
    } else {
      console.log("El nombre del owner no puede estar vacio");
    }
    setOwnerNameSubmitted(true);
  };

  function createRoom() {
    setcreateRoomOwner(true)
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
      <h1>{lobbyId}</h1>
      <div>
        <button onClick={createRoom}>Create lobby</button>
        <button onClick={toggleForm}>JoinLobby</button>
        <ConnectedUsers socket={socket} />
      </div>

      {displayForm && !createRoomOwner ?
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
              <button onClick={startGame}>Set Lobby</button>
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
            <canvas id="canvas" className="canvasGame border-4 border-red-500"></canvas>
          </div>
          <button onClick={play}>PLAY</button>
        </div>
        :
        <></>
      }
    </div>
  )
}

export default Game;