import { useEffect, useState } from "react";
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
  const [lobbyId, setLobbyId] = useState("");
  const [lobbyIdInput, setLobbyIdInput] = useState("");
  const [username, setUsername] = useState("");
  const [displayCanvas, setDisplayCanvas] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

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
  }, []);

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
  }

  function handleChangeLobbyId(e) {
    setLobbyIdInput(e.target.value);
  }

  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  function startGame() {
    socket.emit("can_start_game");
  }

  function createRoom() {
    socket.emit("new_lobby");
  }
  
  function play() {
    socket.emit("get_players_in_lobby");

    fetch('http://localhost:7878/GamesFiles/Starfinder/juego.js', {
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
        <button onClick={startGame}>Set Lobby</button>
      </div>

      {displayForm ?
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
              ></input>
              <span className="form__inputBar"></span>
              <label className="form__inputlabel">
                Introduce your nickname
              </label>
            </div>
          </label>

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
