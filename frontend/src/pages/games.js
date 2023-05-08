import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import routes from "../index.js";


function Games({ sharedValue, onSharedValueChange}) {

    const [fetchData, setFetchData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    
    function handleInputChange(name){
        console.log("HELLO: " + name);
        onSharedValueChange(name);
        
      };
    
    useEffect(() => {
        async function fetchGames() {

            try {
                const response = await fetch(routes.fetchLaravel + '/api/gamesList', {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = await response.json();
                console.log(data)
                setFetchData(data)
                setLoading(false);
            } catch (error) {
                //this.setError(error);

            }
        }
        fetchGames();
    }, []);

    return (
        <div class="overflow-auto bg-image-all bg-cover bg-no-repeat bg-center bg-fixed flex h-screen justify-center items-center ">
            <div class="text-center container h-full w-3/4 p-10">
                <div class="block rounded-lg bg-gray-800 shadow-lg dark:bg-neutral-800">
                    <div class="p-4">
                        <h2 class="font-mono text-white text-4xl mt-10 font-bold">GAMES</h2>
                        <div class="md:m-6 md:p-12">
                            <div>
                                {fetchData.games ?
                                    <div class="justify-center text-center flex flex-wrap">
                                        {fetchData.games.map((game) => (
                                            <div class="m-5 border-fuchsia-600 border-2 w-1/4 rounded overflow-hidden shadow-lg ">
                                                <img class="w-full" src="Controller.jpg" alt="Sunset in the mountains" />
                                                <div class="bg-purple-300   px-6 py-4">
                                                    <p class="text-black">{game.name}</p>
                                                    <p class="text-black">{game.description}</p>
                                                    <br></br>
                                                        <button class="bg-violet-500 hover:bg-fuchsia-400 font-bold py-2 px-4 border-b-4 border-fuchsia-700 hover:violet-fuchsia-500 rounded text-white"
                                                        onClick={handleInputChange(game.description)}>Play</button>
                                                </div>
                                            </div>

                                        ))
                                        }
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Games;  
