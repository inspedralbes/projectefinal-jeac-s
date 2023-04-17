import { Card, Row, Col, Form, Button, Container, NavLink } from 'react-bootstrap';

function getGameStore() {
    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <br></br>
                    <Card className="px-4 rounded bg-dark text-light">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-2 text-center text-uppercase text-light ">
                                    Profile Cosmetics
                                </h2>
                                <div className="mb-3 mt-md-4">
                                <div class="text-center">
                                    <div>
                                        <img src="pf1.png" class="rounded-circle" alt="..." width="40%" height="40%"></img>
                                        <p>Funny and cute</p>
                                        <h4>200 Jeacs</h4>
                                    </div>
                                    <div>
                                        <img src="pf2.png" class="rounded-circle" alt="..." width="40%" height="40%"></img>
                                        <p>Hard Gamer</p>
                                        <h4>200 Jeacs</h4>
                                        
                                    </div>
                                    <div>
                                        <img src="pf3.png" class="rounded-circle" alt="..." width="40%" height="40%"></img>
                                        <p>The immortal one</p>
                                        <h4>250 Jeacs</h4>
                                    </div>
                                </div>
                            </div>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    )
}

export default getGameStore;