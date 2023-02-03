<<<<<<< HEAD
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import { NavLink } from'react-router-dom';

import './games.css';

const Games = ({ play }) => {

    return (
        <div className="games">
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
                </Card>
=======
import useScript from "./UseScript";



function Games() {
    // useScript('//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js', false)
    // useScript('frontend/Games/marioGame.js', true)
    

    const onClick = () => {
        const script = document.createElement('script');

        script.src = 'frontend/Games/marioGame.js';
        script.type = ('module')
        

        document.body.appendChild(script);
    }


    return (
        <div>
            <h1>Los JUEGUITOS</h1>

            <button onClick={onClick}>Play</button>

            <canvas id="canvas" className="canvasGame"></canvas>


>>>>>>> develop
        </div>
    )
}

export default Games;
