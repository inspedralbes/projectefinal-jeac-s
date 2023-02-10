import {Ballgame} from '../Games/BallGame/BallGame/index.js';
import { useState } from 'react'
 
function Game(game) {
    const onClick= () => {
        Ballgame();
    }

    const refreshPage = () => {
        window.location.reload();
    } 

    return (
        <div className="game"><br></br>
               <canvas id="canvas" className="canvasGame"></canvas>
               <button onClick={onClick}>Play</button>
               <button onClick={refreshPage}>Refresh</button>
        </div>
    )
}

export default Game;
