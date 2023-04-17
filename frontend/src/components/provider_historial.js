import { useSelector, useDispatch } from 'react-redux';
import { store, actions } from './store'; // import the Redux store
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Container, NavLink } from 'react-bootstrap';
import routes from '../index.js';

const Historial = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const token = localStorage.getItem('access_token');
  const infoPlayedGame = useSelector((state) => state.data);
  const dispatch = useDispatch();

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
          const data = await response.json();
          dispatch(actions.saveData(data));
          console.log(data);

        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchPlayedGame();
  }, []);

  return (
    <div>
      {isLoggedIn ?
        <p className="ranking_font_size">Name: <h4>{infoPlayedGame}</h4></p>
        :
        <p className="ranking_font_size">You need to be logged in</p>
      }
    </div>
  );
};

export default Historial;
