import React from 'react';
import { Carousel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <div class="flex h-screen justify-center items-center min-h-screen bg-[url('../public/akihabaraNeo.jpg')] bg-cover bg-no-repeat bg-center bg-fixed" >
            <div class="p-10 opacity-90 text-center bg-purple-300 rounded-lg">
                <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-violet-800 md:text-5xl lg:text-6xl dark:text-white">JEAC'S GAMES</h1>
                <p class="mb-6 text-lg font-normal text-fuchsia-950 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"> Pagina web social on pots disfrutar de jocs, pujar els teus propis i competir per cosmetics!</p>
                <NavLink to="/games">
                    <a href="#" class=" inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-emerald-700 rounded-lg hover:bg-violet-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Play Now!
                        <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                </NavLink>
            </div>
        </div>
    );
}

export default Home;