import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Game from '../pages/game';
import { lazy } from 'react';
import { useState } from 'react'

// import './App.css';

// import '../'

function GameCard({ game, startPlaying }) {
    let [img, setImg] = useState([])
    let [src, setSrc] = useState('')


    const onClick = () => {
        // const Game = lazy(() => import('../Games/BallGame/index.js'));

    }

    return (
        <div>
            <div>
                <NavLink to="/game" ><button>Create lobby</button></NavLink>
                <button>Join lobby</button>
            </div>
            <Card className='gameCard'>
                <Card.Img id='gameCard__bannerImg' variant="top" src={game.img} />
                <Card.Body>
                    <Card.Title>
                        <Button className='btn btn-danger'>Play {game.name} </Button>
                    </Card.Title>
                    <Card.Text>
                        {game.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {/*Aqui irá el nombre del creador del juego*/
                    }
                    {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                </Card.Footer>
            </Card>
        </div>
    )
}

export default GameCard;      