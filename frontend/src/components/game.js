import {Ballgame} from '../Games/BallGame/BallGame/index.js';
import {destroy} from '../Games/BallGame/BallGame/index.js';
import { useState } from 'react'
import { $CombinedState } from 'redux';
 





function Game(game) {
    const onClick= () => {
        Ballgame();


    }

       
    const refreshPage = () => {
        // window.location.reload();
        // $(document)
        // $('#canvas').load('http://localhost:3000/?#/game');
        destroy();
        document.getElementById("game").innerHTML=`<canvas id="canvas" class="canvasGame"></canvas>`;
        

    } 

    return (
        <div className="game">
               <h1>AQUÍ SE JUEGA</h1> 
               <div id="game">
               <canvas id="canvas" className="canvasGame"></canvas>
                </div>
               <button onClick={onClick}>Adksaj</button>
               <button onClick={refreshPage}>Refresh</button>

        </div>
    )
}

export default Game;
