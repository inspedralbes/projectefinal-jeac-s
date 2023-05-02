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
var cont = 0;
var recibir = "Enviando de la plataforma al juego";
var prova = 0;

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
  var obj = null;

  function clickGame() {
    fetch('http://localhost:7878/GamesFiles/ClickGame/initGame.js', {
      method: 'GET',
      mode: 'same-origin',
    })
      .then(response => response.text())
      .then(scriptText => {
        console.log(scriptText);
        const scriptFn = new Function(scriptText + '; return executeGame()'); // se agrega el "return doThis()" para obtener el objeto
        obj = scriptFn();
        obj.init();
        obj.enviar(cont);
        obj.recibir(recibir);
        console.log(obj);
      })
      .catch(error => console.error('Error al recuperar y ejecutar el script:', error));
  }

  return (
    <div className="game"><br></br>
      <div id="game">
        <canvas id="canvas" className="canvasGame border-4 border-red-500"></canvas>
      </div>
      <button onClick={clickGame}>ClickGame</button>
    </div>
  )
}

export default Game;



