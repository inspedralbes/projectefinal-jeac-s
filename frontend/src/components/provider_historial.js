import { useSelector, useDispatch } from 'react-redux';
import { store, actions } from './store'; // import the Redux store
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Container, NavLink } from 'react-bootstrap';
import routes from '../index.js';

const Historial = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const token = localStorage.getItem('access_token');
  const [playedGames, setPlayedGames] = useState([]);

  useEffect(() => {
    async function fetchPlayedGame() {
      if (isLoggedIn) {
        try {
          const response = await fetch(routes.fetchLaravel + `/api/showPlayedGame?userId=27`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const infoPlayedGame = await response.json();
          console.log(infoPlayedGame);
          setPlayedGames(infoPlayedGame);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchPlayedGame();
  }, []);

  return (
    <div>
      <h2>Historial</h2>
      {playedGames.map((game, userId) => (
        <Card key={userId}>
          <Card.Body>
            <Card.Title>Juego: {game.name}</Card.Title>
            <Card.Text>Puntos: {game.score}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};


export default Historial;
