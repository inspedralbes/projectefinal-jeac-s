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

console.log(Phaser);

//var str = "import {Ballgame} from  ";

//eval (str);


function Game({socket}) {
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
  
    //aaa();
  
    // const script = document.createElement("script");
  
    // script.src = routes.wsNode + '/initGame.js';
    // script.async = true;
    // script.type = 'module';
  
  
    // document.body.appendChild(script);
  
    // let Ballgame  = import(`/src/InitGames/${jsFile}`).then( (module) => {
  
    // let Ballgame  = import(`http://localhost:7878/${jsFile}`).then( (module) => {
  
    //     console.log(module) 
    //     window.myTest = module;
  
    //     console.log("Name => ", module.test);
    //     module.Ballgame(); 
  
    // }).catch( (error)=>{
    //     console.log("ERROR LOADING MODULE =>", error);
    // });  
  
  }

  function load2() {
    var jsFile = 'initGame.js';
  
    const scriptUrl = routes.wsNode + '/hola.txt';
  
    fetch('http://localhost:7878/GamesFiles/CopiaMario/initGame.js', {
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

  // const refreshPage = () => {
  //   // window.location.reload();
  //   // $(document)
  //   // $('#canvas').load('http://localhost:3000/?#/game');
  //   // destroy();
  //   document.getElementById("game").innerHTML = `<canvas id="canvas" class="canvasGame"></canvas>`;


  // }
  return (
    <div className="game"><br></br>
      <div id="game">
        <canvas id="canvas" className="canvasGame border-4 border-red-500"></canvas>
      </div>
      <button onClick={load}>BallGame</button>
      <button onClick={load2}>CopiaMario</button>
    </div>
  )
}

export default Game;



