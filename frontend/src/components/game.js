//import {Ballgame} from '../Games/BallGame/BallGame/index.js';
// import {destroy} from '../../public/Games/BallGame/BallGame/index.js';
// import {destroy} from '../../public/Games/BallGame/BallGame/index.js';

import { useState } from 'react'
import { $CombinedState } from 'redux';

 function  load(){
    var jsFile = 'initGame.js';
    let Ballgame  = import(`/src/InitGames/${jsFile}`).then( (module) => {
        
        console.log(module) 
        window.myTest = module;

        console.log("Name => ", module.test);
       module.Ballgame();

    }).catch( (error)=>{
        console.log("ERROR LOADING MODULE =>", error);
    });  

}
//var str = "import {Ballgame} from  ";

//eval (str);

function Game() {
    const onClick= () => {
        load();
    }

       
    const refreshPage = () => {
        // window.location.reload();
        // $(document)
        // $('#canvas').load('http://localhost:3000/?#/game');
        // destroy();
        document.getElementById("game").innerHTML=`<canvas id="canvas" class="canvasGame"></canvas>`;
        

    } 

    return (
        <div className="game"><br></br>
               <div id="game">
               <canvas id="canvas" className="canvasGame"></canvas>
                </div>
               <button onClick={load}>Play</button>
               <button onClick={refreshPage}>Refresh</button>

        </div>
    )
}

export default Game;



