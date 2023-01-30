import Navbar from '../components/navbar/navbar.js'
import {BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Games from '../components/games'
import Home from '../components/home'
import Upload from '../components/upload.js';

function Main() {
  return (
    <div>
      <HashRouter>
        <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/games" element={<Games/>} />
            <Route path="/upload" element={<Upload/>} />

          </Routes>
      </HashRouter>
    </div>
  )
}

export default Main;