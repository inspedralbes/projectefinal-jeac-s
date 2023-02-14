import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import { NavLink } from'react-router-dom';
import Game from './game';
import { lazy } from 'react';
import { useState } from 'react'




function GameCard({game}) {
    let [img, setImg] = useState([])
    let [src, setSrc] = useState('')


    const onClick = () => {
        // const Game = lazy(() => import('../Games/BallGame/index.js'));

    }

    function loadImg(){
        // let base64String = btoa(String.fromCharCode(...new Uint8Array(game.img)));
        // setImg(base64String);
        // var base64String = btoa(
        //     String.fromCharCode(...new Uint8Array(game.img ?.ProductImage.data))
        //     );
        //     setImg(base64String);
            
    }

    function click2(){
        // var base64EncodedStr = btoa(game.img);
        // setImg(base64EncodedStr);
        // console.log("img", setImg);
        // setSrc("data:image/png;base64," + setImg)
        // document.getElementById("banner_img").src = 'data:image/png;base64,' + setImg;

        //const reader = new FileReader();
            // reader.onloadend = () => {
            //     console.log(reader.result);
            //     // Logs data:image/jpeg;base64,wL2dvYWwgbW9yZ...

            //     // Convert to Base64 string
            //     const base64 = getBase64StringFromDataURL(reader.result);
            //     console.log("base", base64);
            //     // Logs wL2dvYWwgbW9yZ...
            // };
            // reader.readAsDataURL(game.img);

            // const reader = new FileReader();
            // reader.readAsDataURL(game.img);
            // reader.onloadend = () => {
            //     const base64data = reader.result;
            //     console.log('========== Blob to Base64 ==========');
            //     console.log(game.img);
            //     console.log(base64data);
            //     const image = document.createElement('img');
            //     image.src = image;
            //     document.getElementById("game").appendChild(image);

            let blob = new Blob([game.img], {type: 'image/png'});
            let img = document.getElementById("banner_img");
            
            let reader = new FileReader();
            reader.readAsDataURL(blob); // converts the blob to base64 and calls onload
            
            reader.onload = function() {
                img.src = reader.result;
            };

      };

    
    return (
        <Card className='gameCard'>
                        <button onClick={click2}>AAAAAA</button>

                    <Card.Img id='banner_img' variant="top" src="" />
                    <Card.Body>
                        <Card.Title>
                            <NavLink to='/game'><Button className='btn btn-danger' onClick={onClick}> {game.name} </Button></NavLink>
                        </Card.Title>
                        <Card.Text>
                           {game.description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                    
        </Card>
    )
}

export default GameCard;      