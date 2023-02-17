import Navbar from '../components/navbar.js'
import {BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Games from '../components/games'
// import Game from '../components/game'
import Home from '../components/home'
import Profile from '../components/profile.js';
import Upload from '../components/upload.js';
import Signin from '../components/signin'
import LoginForm from '../components/login.js'
import Game from '../components/game.js'
import GetRanking from '../components/ranking.js'


function Main() {
  return (
    <div>
      <HashRouter>
        <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/games" element={<Games/>} />
            <Route path="/upload" element={<Upload/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/game" element={<Game/>} />
            <Route path="/ranking" element={<GetRanking/>} />

          </Routes>
      </HashRouter>
    </div>
  )
}

export default Main;