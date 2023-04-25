import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store';
import Navbar from './navbar.js'
import { Routes, Route } from "react-router-dom";
import Games from '../pages/games'
// import Game from '../components/game'
import Home from '../pages/home'
import Profile from '../pages/userInfo.js';
import Upload from '../pages/upload.js';
import Signin from '../pages/signin'
import LoginForm from '../pages/login.js'
import Game from '../pages/game.js'
import GetRanking from '../pages/ranking.js'
import GetGameStore from '../pages/storeItems.js'
import socketIO from "socket.io-client";
import Historial from "../pages/historial.js"
import React, { useState, useEffect } from 'react';


function AsideNav() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const dispatch = useDispatch();
    const storeItems = useSelector((state) => state.storeItems);
    const boughtItems = useSelector((state) => state.boughtItems);
    const userInfo = useSelector((state) => state.data);
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

    function logout() {
        dispatch(actions.logout());
        localStorage.setItem('access_token', "0");
    }

    function avatar() {
        let imgAvatar = "";

        if (isLoggedIn) {
            if (boughtItems.length > 0) {
                const matchingItems = boughtItems.filter(item => item.avatar && item.userId === userInfo.id);
                if (matchingItems.length > 0) {
                    const userAvatarItem = storeItems.find(item => item.id === matchingItems[0].itemId);
                    imgAvatar = userAvatarItem.image_url;
                } else {
                    imgAvatar = "Controller.jpg";
                }
            }
        }
        return imgAvatar
    }

    return (
        <div class="h-screen w-full bg-white relative flex overflow-hidden">
            <aside class="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
                <NavLink to="/profile">
                    <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                        {isLoggedIn ?
                            <img class="h-10 w-12 rounded-full" src={avatar()} alt=""></img>
                            : <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
                        }

                    </div>
                </NavLink>

                <NavLink to="/games">
                    <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-controller" viewBox="0 0 16 16"> <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z" /> <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z" /> </svg>
                    </div>
                </NavLink>

                <NavLink to="/ranking">
                    <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bar-chart-line" viewBox="0 0 16 16">
                            <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />
                        </svg>
                    </div>
                </NavLink>

                <NavLink to="/">
                    <div onClick={() => logout()} class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </div>
                </NavLink>
            </aside>



            <div class="w-full h-full flex flex-col justify-between">

                <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/upload" element={<Upload socket={socket} />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/ranking" element={<GetRanking />} />
                    <Route path="/store" element={<GetGameStore />} />
                    <Route path="/historial" element={<Historial />} />
                </Routes>
            </div>

        </div>
    )

}

export default AsideNav;