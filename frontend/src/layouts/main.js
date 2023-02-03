import Navbar from '../components/navbar/navbar.js'
import {BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Games from '../components/games'
import Home from '../components/home'
import Upload from '../components/upload.js';
import Signin from '../components/signin'
import LoginForm from '../components/login'


function Main() {
  return (
    <div>
      <HashRouter>
        <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/games" element={<Games/>} />
            <Route path="/upload" element={<Upload/>} />

            <Route path="/SignIn" element={<Signin/>} />
            <Route path="/login" element={<LoginForm/>} />
          </Routes>
      </HashRouter>
    </div>
  )
}

export default Main;