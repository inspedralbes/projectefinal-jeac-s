// import {game} from '../Games/marioGameModule.js';
// import {game2} from '../Games/marioGame.js';
// import {Ballgame} from '../Games/BallGame/index.js';

import React from "react";
import AddTripButton from './ChangeComponentOnClick.js';
import { useState } from 'react'
import Upload from './upload.js';
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import { NavLink } from'react-router-dom';

import './games.css';
import GameCard from './gameCard.js';



// function Games() {

//     const [state, setState] = useState('start')
//     const games = [
//             {
//                 id: 1,  
//                 name: 'BallGame',
                
//             },
//             {
//                 id: 2,  
//                 name: 'MarioGame',
               
//             },
//             {
//                 id: 3,  
//                 name: 'Food Shopping',
               
//             },
//         ]
        


//     const onClick1 = () => {

//         game2();
//     }

//     const onClick2 = () => {

//         Ballgame();
//     }


//     return (
//         <div>   
//             <h1>Los JUEGUITOS</h1>


//             {games.map(( game) => (
//                 <button>{game.name}</button>
//             ))}
//             {state === 'start' && (
//                 <AddTripButton addTrip={() => setState('add-trip') } />
//             )}

//             {state === 'add-trip' && <Upload />}
//             {/* <button onClick={onClick1}>Mario Game</button>
//             <button onClick={onClick2}>BallGame</button> */}





//             <canvas id="canvas" className="canvasGame"></canvas>

//             <canvas id="canvas2" className="canvasGame2"></canvas>



const Games = ({ play }) => {
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

    return (
        <div className="games">
                
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />

                ))}
                
                
                
                
                
                {/* <Card className='gameCard'>
        <div className="games" style={{ width: '18rem'}}>
                <Card className='gameCard'>
                    <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ56p-a6_szW03gPqT8FZJEAqyg-tznGlwcSA&usqp=CAU" />
                    <Card.Body>
                        <Card.Title>
                            <NavLink to='/game'><Button className='btn btn-danger'> Juego 1 </Button></NavLink>
                        </Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in
                            to additional content. This content is a little bit longer.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card> */}
        </div>
    )
}

export default Games;
