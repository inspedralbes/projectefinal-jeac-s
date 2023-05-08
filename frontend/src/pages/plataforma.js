import { useEffect } from "react";
import { useState } from 'react'
import { Socket } from "socket.io-client";
import ConnectedUsers from "../components/ConnectedUsers.js"

// program to generate random strings

// declare all characters
// const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// function generateString(length) {
//   let result = ' ';
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

var Phaser = null;

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
      console.log(data);
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
          const updatedScore = { member: score.member, scoreEnemy: score.scoreEnemy };
          const newScores = prevScores.map((s, i) => i === index ? updatedScore : s);
          return newScores;
        } else {
          // Usuario no existe en la lista, agregar nuevo puntaje
          const newScore = { member: score.member, scoreEnemy: score.scoreEnemy };
          const newScores = [...prevScores, newScore];
          return newScores;
        }
      });
    });
  }, []);

  function JoinLobby() {
    console.log("Join");
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
    fetch('http://localhost:7878/GamesFiles/'+ sharedValue + '/juego.js', {
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
        socket.emit("can_start_game");
      })
  }

  function createRoom() {
    socket.emit("new_lobby");
  }

  function sendInfoGame(puntos_juego) {
    let score = puntos_juego;
    socket.emit('datagame', score);
    obj.recibir(score);
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
        <button onClick={play}>Play</button>
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
            {usersScores.map((userScore, index) => (
              <p key={index}>{userScore.member}: {userScore.scoreEnemy}</p>
            ))}
          </div>
          <div id="game">
            <canvas id="canvas" className="canvasGame border-4 border-red-500"></canvas>
          </div>
        </div>
        :
        <></>
      }
    </div>
  )
}

export default Game;