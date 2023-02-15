//import {Ballgame} from '../Games/BallGame/BallGame/index.js';
import {destroy} from '../Games/BallGame/BallGame/index.js';
import { useState } from 'react'
import { $CombinedState } from 'redux';

var Ballgame = load();
async function  load(){
    Ballgame  = await import('../Games/BallGame/BallGame/index.js');   
}
//var str = "import {Ballgame} from  ";

//eval (str);

function Game() {
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
        <div className="game"><br></br>
               <div id="game">
               <canvas id="canvas" className="canvasGame"></canvas>
                </div>
               <button onClick={onClick}>Play</button>
               <button onClick={refreshPage}>Refresh</button>

        </div>
    )
}

export default Game;



