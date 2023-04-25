import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <div class="flex h-screen justify-center items-center min-h-screen bg-space-planet bg-cover bg-no-repeat bg-center bg-fixed" >
            <div class="text-center">
                <img src="LogoBuenoSNB.PNG" class="inline-flex items-center rounded-full scale-125"></img>

                <p class="mb-6 mt-6 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"> Social web page where you can enjoy playing games, upload your own and compete to gain cosmetics!</p>

                <NavLink to="/games">
                    <a href="#" class="w-1/2 h-20 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-gradient-to-r from-violet-400 to-fuchsia-800 rounded-full hover:bg-violet-400 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Play Now!
                        <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                </NavLink>
            </div>
        </div>
    );
}

export default Home;