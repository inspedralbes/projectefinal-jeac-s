import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';

import Navbar from './components/navbar.js'
import {BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Games from './components/games'
// import Game from '../components/game'
import Home from './components/home'
import Profile from './components/profile.js';
import Upload from './components/upload.js';
import Signin from './components/signin'
import LoginForm from './components/login.js'
import Game from './components/game.js'
import GetRanking from './components/ranking.js'
import GetGameStore from './components/gameStore.js'
import { io, socketIO} from "socket.io-client";
import './App.css';

const routes = {
  fetchLaravel: "http://localhost:8000",
  wsNode: "http://localhost:7878",
};

//const socket = io(routes.wsNode);
const socket = io();




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <div>
      <HashRouter>
        <Navbar></Navbar>
        {console.log("socket 1", socket)}
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/games" element={<Games/>} />
            <Route path="/upload" element={<Upload socket={socket}/>}/>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/game" element={<Game/>} />
            <Route path="/ranking" element={<GetRanking/>} />
            <Route path="/gameStore" element={<GetGameStore/>} />
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