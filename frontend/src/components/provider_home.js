import React from 'react';
import { Carousel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <Carousel id="carouselExampleCaptions"  >
            <Carousel.Item>
                <NavLink to="/game">
                    <img
                        className="d-block w-100"
                        src="imgDemoGame.png"
                        alt="Slide 1"
                    />
                </NavLink>
                {/* <Carousel.Caption>
                        <h3>BallGame</h3>
                        <p>You can play the BallGame by clicking this image.</p>
                    </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="mhw.png"
                    alt="Slide 2"

                />
                <Carousel.Caption>
                    <h3>Slide 2</h3>
                    <p>This is the second slide.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="games.png"
                    alt="Slide 3"

                />
                <Carousel.Caption>
                    <h3>Slide 3</h3>
                    <p>This is the third slide.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Home;