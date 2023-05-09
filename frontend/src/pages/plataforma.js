import { useEffect } from "react";
import { useState } from 'react'
import { Socket } from "socket.io-client";
import ConnectedUsers from "../components/ConnectedUsers.js"
import routes from "../index.js";

var Phaser = null;
var obj = null;
var ownerLobby;

import('phaser')
  .then((module) => {
    Phaser = module;
    console.log(Phaser);
  })

function Game({ socket, sharedValue}) {

  const [lobbyId, setLobbyId] = useState("");
  const [lobbyIdInput, setLobbyIdInput] = useState("");
  const [username, setUsername] = useState("");
  const [displayCanvas, setDisplayCanvas] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [usersScores, setUsersScores] = useState([]);

  console.log(sharedValue)
  var obj = null;

  useEffect(() => {
    socket.on("lobby_info", (data) => {
      setLobbyId(data.lobbyIdentifier);
    });

    socket.on("lobby_info", (data) => {
      ownerLobby = data;
    });

    socket.on("start_game", () => {
      setDisplayCanvas(true);
      setDisplayForm(false);
    });

    socket.on('send_datagame_to_game', (score) => {
      setUsersScores(prevScores => {
        const index = prevScores.findIndex(s => s.member === score.member);
        if (index !== -1) {
          // Usuario ya existe en la lista, actualizar su puntaje
          const updatedScore = { member: score.member, score: score.puntuacion, gameOwner: score.owner };
          const newScores = prevScores.map((s, i) => i === index ? updatedScore : s);
          return newScores;
        } else {
          // Usuario no existe en la lista, agregar nuevo puntaje
          const newScore = { member: score.member, score: score.puntuacion, gameOwner: score.owner };
          const newScores = [...prevScores, newScore];
          return newScores;
        }
      });
    });

    socket.on('objectGame_to_platform', (objectGame) => {
      if (obj != null) {
        obj.recibirObjetoDePlataforma(objectGame);
      }
    })
  }, []);

  useEffect(() => {
    if (obj != null) {
      obj.recibir(usersScores);
    }
  }, [usersScores]);

  function JoinLobby() {
    if (lobbyIdInput != null & username != null) {
      socket.emit("join_room", {
        lobbyIdentifier: lobbyIdInput,
        username: username,
      });
    }
    else {
      console.log("You need to fill both input fields.");
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

  function play() {
    console.log("Shared value ===", sharedValue);
    fetch(sharedValue, {
      method: 'GET',
      mode: 'same-origin'
    })
      .then(response =>
        //  console.log("Response == ", response.text())
        response.text()
      )
      .then(scriptText => {
        console.log("ScriptText ===", scriptText);
        const scriptFn = new Function(scriptText + '; return executeGame()');
        obj = scriptFn();
        obj.init(sendObjetToPlatform, sendInfoGame, finalJuego);
        obj.recibirInfoLobby(ownerLobby);
      })
  }

  function startGame() {
    socket.emit("can_start_game");
  }

  function createRoom() {
    socket.emit("new_lobby");
  }

  function sendInfoGame(puntos_juego) {
    let score = puntos_juego;
    socket.emit('datagame', score);
  }

  function sendObjetToPlatform(objeto) {
    let object = objeto;
    socket.emit('objectGame', object);
  }

  function finalJuego() {
    alert("JUEGO ACABADO");
  }

  console.log(usersScores);

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