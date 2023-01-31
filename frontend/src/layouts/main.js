import Navbar from '../components/navbar/navbar.js'
import {BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Games from '../components/games'
import Home from '../components/home'
import Signin from '../components/signin'
import Login from '../components/login'

function Main() {
  return (
    <div>
      <HashRouter>
        <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/games" element={<Games/>} />
            <Route path="/SignIn" element={<Signin/>} />
            <Route path="/LogIn" element={<Login/>} />
          </Routes>
      </HashRouter>
    </div>
  )
}

export default Main;