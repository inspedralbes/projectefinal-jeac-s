//import {Ballgame} from '../Games/BallGame/BallGame/index.js';
// import {destroy} from '../../public/Games/BallGame/BallGame/index.js';
// import {destroy} from '../../public/Games/BallGame/BallGame/index.js';
import { useEffect } from "react";
import routes from "../index.js";

import { useState } from 'react'
import { $CombinedState } from 'redux';
import { Socket } from "socket.io-client";

//import Phaser from "phaser";
//var imports = "import Phaser from 'phaser'";
//eval (imports)
var Phaser = null;

import('phaser')
  .then((module) => {
    // use the imported module here
    Phaser = module;
    console.log(Phaser);
  })
  .catch((error) => {
    // handle any errors that occur while loading the module
  });


function Game({ socket }) {

  const [lobbyId, setLobbyId] = useState("null");
  const [lobbyIdInput, setLobbyIdInput] = useState("");
  const [username, setUsername] = useState("");



  useEffect(() => {
    socket.on("lobby_info", (data) => {
      setLobbyId(data.lobbyIdentifier);
    });

    socket.on("lobby_info", (data) => {
  console.log(data);      

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

  function handleChangeLobbyId(e) {
    setLobbyIdInput(e.target.value);
  }

  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  function load() {
    var jsFile = 'initGame.js';

    const scriptUrl = routes.wsNode + '/hola.txt';

    fetch('http://localhost:7878/GamesFiles/BallGame/initGame.js', {
      method: 'GET',
      mode: 'same-origin',
    })
      .then(response => response.text())
      .then(scriptText => {
        console.log(scriptText);
        //eval(scriptText);
        const scriptFn = new Function(scriptText);
        scriptFn();
        console.log('Script ejecutado exitosamente.');
      })
      .catch(error => console.error('Error al recuperar y ejecutar el script:', error));
  }

  function clickGame() {
    fetch('http://localhost:7878/GamesFiles/ClickGame/initGame.js', {
      method: 'GET',
      mode: 'same-origin',
    })
      .then(response => response.text())
      .then(scriptText => {
        console.log(scriptText);
        const scriptFn = new Function(scriptText);
        scriptFn();
        console.log(scriptFn);
        console.log('Script ejecutado exitosamente.');
      })
      .catch(error => console.error('Error al recuperar y ejecutar el script:', error));
  }

  function createRoom() {
    socket.emit("new_lobby");
  }

  return (
    <div className="game"><br></br>
      <h1>{lobbyId}</h1>
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


      <div id="game">
        <canvas id="canvas" className="canvasGame border-4 border-red-500"></canvas>
      </div>
      <button onClick={load}>BallGame</button>
      <button onClick={clickGame}>ClickGame</button>
      <button onClick={createRoom}>createRoom</button>

    </div>
  )
}

export default Game;



