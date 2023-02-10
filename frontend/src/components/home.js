import imgDemoGame from './img/imgDemoGame.png';
import imgUploadGame from './img/imgUploadGame.jpg';

import { NavLink } from "react-router-dom"

function Home() {
    return (
        <div>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="games.jpg" className="d-block w-100" alt="..."></img>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                    </div>
                    <div className="carousel-item">
                        <img src="mhw2.png" className="d-block w-100" alt="..."></img>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                    </div>
                    <div className="carousel-item">
                        <img src="valo.jfif" className="d-block w-100" alt="..."></img>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the third slide.</p>
                            </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
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