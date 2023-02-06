import {game} from '../Games/marioGameModule.js';
import {game2} from '../Games/marioGame.js';
import {Ballgame} from '../Games/BallGame/index.js';

import React from "react";
import AddTripButton from './ChangeComponentOnClick.js';
import { useState } from 'react'
import Upload from './upload.js';




function Games() {

    const [state, setState] = useState('start')
    const games = [
            {
                id: 1,  
                name: 'BallGame',
                
            },
            {
                id: 2,  
                name: 'MarioGame',
               
            },
            {
                id: 3,  
                name: 'Food Shopping',
               
            },
        ]
        


    const onClick1 = () => {

        game2();
    }

    const onClick2 = () => {

        Ballgame();
    }


    return (
        <div>   
            <h1>Los JUEGUITOS</h1>


            {games.map(( game) => (
                <button>{game.name}</button>
            ))}
            {state === 'start' && (
                <AddTripButton addTrip={() => setState('add-trip') } />
            )}

            {state === 'add-trip' && <Upload />}
            {/* <button onClick={onClick1}>Mario Game</button>
            <button onClick={onClick2}>BallGame</button> */}





            <canvas id="canvas" className="canvasGame"></canvas>

            <canvas id="canvas2" className="canvasGame2"></canvas>



        </div>
    )
}

export default Games;