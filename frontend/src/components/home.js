import imgDemoGame from './img/imgDemoGame.png';
import imgUploadGame from './img/imgUploadGame.jpg';

import { NavLink } from "react-router-dom"


import './home.css';

function Home() {
    return (
        <div className="container">
            <div className="News">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100" src="games.jpg" alt="First slide"></img>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Welcome to JEAC'S</h5>
                        <p>JEAC'S is a web page that allows people to play browser games for free. You can create an
                        account to climb up the rankings and become the best in the world!</p>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src="valo.jfif" alt="Second slide"></img>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Shooter games</h5>
                        <p>Do you like shooter games? You think you are the best among your friends. Prove it in
                        JEAC'S. We have a huge amount of games where you can proof your value.</p>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src="mhw.png" alt="Third slide"></img>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Monster hunting</h5>
                        <p>If you prefer adventuring alone into unknown places this game is the one for you. Explore
                        the jungle and find who is behind the strange sounds</p>
                    </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>
            </div>

            <div className='landingPage__funcionalities'>
                <div className='funcionalities__play'>
                    <NavLink to="/games">
                        <img src={imgDemoGame} alt='KOKOKOKOK' className='img__funcionalities'></img>
                    </NavLink>
                </div>
            
                <div className='funcionalities__uploadGame' >
                    <NavLink to="/upload">
                        <img src={imgUploadGame} alt='KOKOKOKOK' className='img__funcionalities'></img>
                    </NavLink>

                    {/* <NavLink to='/game'><Button className='btn btn-danger'> Juego 1 </Button></NavLink> */}
                </div>
            </div>
        </div>
    )
}

export default Home;