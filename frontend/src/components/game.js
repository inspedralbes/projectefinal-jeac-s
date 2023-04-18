//import {Ballgame} from '../Games/BallGame/BallGame/index.js';
// import {destroy} from '../../public/Games/BallGame/BallGame/index.js';
// import {destroy} from '../../public/Games/BallGame/BallGame/index.js';
import { useEffect } from "react";
import routes from "../index.js";



import { useState } from 'react'
import { $CombinedState } from 'redux';

function  load(){
    var jsFile = 'initGame.js';
    //let Ballgame  = import(`/src/InitGames/${jsFile}`).then( (module) => {
        
        // let Ballgame  = import(`http://localhost:7878/${jsFile}`).then( (module) => {
            
        //     console.log(module) 
        //     window.myTest = module;

        //     console.log("Name => ", module.test);
        //     module.game2();
            
        // }).catch( (error)=>{
        //     console.log("ERROR LOADING MODULE =>", error);
        // });  
        
    }
    //var str = "import {Ballgame} from  ";
    
    //eval (str);
    
    function Game() {
        useEffect(() => {
            importModule();
        });
        
        async function importModule() {
            const module = import(routes.wsNode + '/initGame.js');
            // hacer algo con el módulo importado
          }

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



