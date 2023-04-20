import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';

import Navbar from './components/navbar.js'
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Games from './pages/games'
// import Game from '../components/game'
import Home from './pages/home'
import UserInfo from './pages/userInfo.js';
import Historial from './pages/historial.js';
import Upload from './pages/upload.js';
import Signin from './pages/signin'
import LoginForm from './pages/login.js'
import Game from './pages/game.js'
import GetRanking from './pages/ranking.js'
import Store from './pages/storeItems.js'
import socketIO from "socket.io-client";

import './App.css';

const routes = {
  fetchLaravel: "http://localhost:8000",
  wsNode: "http://localhost:7878",
};

var socket = socketIO(routes.wsNode, {
  withCredentials: true,
  cors: {
    origin: "*",
    credentials: true,
  },
  path: "/node/",
  transports: ["websocket"],
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <HashRouter>
        <Navbar></Navbar>
        {console.log("socket 1", socket)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/upload" element={<Upload socket={socket} />} />
          <Route path="/userInfo" element={<UserInfo />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/game" element={<Game />} />
          <Route path="/ranking" element={<GetRanking />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </HashRouter>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


export default routes;