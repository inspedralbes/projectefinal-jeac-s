import Navbar from '../components/navbar/navbar.js'
import {BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Games from '../components/games'
// import Game from '../components/game'
import UploadGame from '../components/UploadGame'
import Home from '../components/home'
import Signin from '../components/signin'
import LoginForm from '../components/login'


function Main() {
<<<<<<< HEAD
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
=======
  return (
    <div>
      <HashRouter>
        <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/games" element={<Games/>} />
            <Route path="/SignIn" element={<Signin/>} />
            <Route path="/login" element={<LoginForm/>} />
          </Routes>
      </HashRouter>
    </div>
>>>>>>> develop
  )
}

export default Main;