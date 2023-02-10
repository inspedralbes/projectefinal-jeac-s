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
        <div className="game">
               <h1>AQUÍ SE JUEGA</h1> 
               <canvas id="canvas" className="canvasGame"></canvas>
               <button onClick={onClick}>Adksaj</button>
               <button onClick={refreshPage}>Refresh</button>

        </div>
    )
}

export default Game;
