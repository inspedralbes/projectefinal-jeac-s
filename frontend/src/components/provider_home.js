import imgDemoGame from './img/imgDemoGame.png';
import imgUploadGame from './img/imgUploadGame.jpg';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom"

function Home() {
    const data = useSelector(state => state.data);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    return (
        <div>
            {isLoggedIn ? <p>Username: {data.name}</p> : <p>You are not logged in</p>}

            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="games.jpg" class="d-block w-100" alt="..."></img>
                        <div class="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="mhw.png" class="d-block w-100" alt="..."></img>
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="valo.jfif" class="d-block w-100" alt="..."></img>
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
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
        </div >
    )
}

export default Home;