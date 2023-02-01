import Navbar from '../components/navbar/navbar.js'
import {BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Games from '../components/games'
// import Game from '../components/game'
import UploadGame from '../components/UploadGame'
import Home from '../components/home'

function Main() {
    return (
        <div>
            <HashRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/games" element={<Games/>} />
                    <Route path="/UploadGame" element={<UploadGame/>} />
                </Routes>
            </HashRouter>

        </div>
  )
}

export default Main;