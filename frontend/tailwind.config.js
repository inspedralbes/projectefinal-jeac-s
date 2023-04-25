import { useSelector, useDispatch } from 'react-redux';
import { store, actions } from './store'; // import the Redux store
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Container } from 'react-bootstrap';
import routes from '../index.js';
import { NavLink } from 'react-router-dom';

function avatar() {
  const [storeItems, setStoreItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  let imgAvatar = "";


  const matchingItems = boughtItems.filter(item => item.avatar && item.userId === userInfo.id);
  const userAvatarItem = storeItems.find(item => item.id === matchingItems[0].itemId);
  imgAvatar = userAvatarItem.image_url;

  return imgAvatar
}




/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
    "./src/pages/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'image-all': `url('../public/${avatar()}')`,
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
