import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Container, NavLink } from 'react-bootstrap';
import routes from '../index.js';

function GetRanking() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(routes.fetchLaravel + '/api/getRanking', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p className="ranking_font_size">Loading...</p>
      ) : (
        <Container>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <br></br>
              <Card className="px-4 rounded bg-dark text-dark align-items-center">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-center text-uppercase text-light ">
                      Profile
                    </h2>
                    <div className="mb-3 mt-md-4">
                      <table>
                        <thead>
                          <tr>
                            <th className="ranking_font_size">#</th>
                            <th className="ranking_font_size">Name</th>
                            <th className="ranking_font_size">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => (
                            <tr key={user.id}>
                              <td className="ranking_font_size">
                                {index < 3 ? (
                                  index === 0 ? (
                                    <img src="oro.png" alt="oro" class="imagen_ranking" />
                                  ) : index === 1 ? (
                                    <img src="plata.png" alt="plata" class="imagen_ranking" />
                                  ) : (
                                    <img src="bronce.png" alt="gold" class="imagen_ranking" />
                                  )
                                ) : (
                                  index + 1
                                )}
                              </td>
                              <td className="ranking_font_size">{user.name}</td>
                              <td className="ranking_font_size">{user.totalScore}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container >
      )}
    </div>
  );
}

export default GetRanking;
