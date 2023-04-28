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

  return (
    <div className="game"><br></br>
      <div id="game">
        <canvas id="canvas" className="canvasGame border-4 border-red-500"></canvas>
      </div>
      <button onClick={load}>BallGame</button>
      <button onClick={clickGame}>Play Click Game</button>
    </div>
  )
}

export default Game;



