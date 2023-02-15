import React from 'react';
import { Carousel } from 'react-bootstrap';

function Home() {
    return (
        <Carousel id="carouselExampleCaptions">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="valo.png"
                    alt="Slide 1"
                />
                <Carousel.Caption>
                    <h3>Slide 1</h3>
                    <p>This is the first slide.</p>
                </Carousel.Caption>
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