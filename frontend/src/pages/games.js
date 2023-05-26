import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { actions } from '../components/store.js';

function Games({ onSharedValueChange, onSharedIdChange }) {
    const [fetchData, setFetchData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (path, id) => {
        onSharedValueChange(path);
        onSharedIdChange(id)
        navigate('/game');
    };

    useEffect(() => {
        async function fetchGames() {
            try {
                const response = await fetch(process.env.REACT_APP_LARAVEL_URL + '/api/gamesList', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setFetchData(data)
            } catch (error) {
                this.setError(error);
            }
        }
        fetchGames();
    }, []);

    function visitarPerfil(id) {
        dispatch(actions.getUserId({ id: id, visitor: true, tab: "tab4" }));
        navigate("/otherProfile")
    }

    return (
        <div class=" bg-image-arcade bg-cover bg-no-repeat bg-center flex h-screen justify-center items-center overflow-auto">
            <div class="flex container w-3/4 p-10">
                <div class="flex grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 ">
                    {fetchData.games ?
                        fetchData.games.map((game) => (
                            <div key={game.id} class="flex flex-col h-full rounded-lg bg-gray-800 shadow-lg p-4">
                                <img class="flex h-36 w-48  object-cover rounded-t-lg md:rounded-none md:rounded-l-lg" src={process.env.REACT_APP_NODE_FITXERS_URL + game.img} alt="Game Image" />
                                <div class="flex flex-col justify-start p-6">
                                    <p class="mb-2 text-xl font-medium text-white">{game.name}</p>
                                    <p class="mb-4 text-base text-gray-400">{game.description}</p>
                                    <button class="bg-purple-500 hover:bg-purple-600 font-bold py-2 px-4 rounded text-white text-lg mt-auto self-end">
                                        Play
                                    </button>
                                    <div className="text-center">
                                        <hr class="border-gray-600 mt-4 mb-4"></hr>
                                        <p class="text-white text-lg font-bold relative group">
                                            Juego creado por:<br></br>
                                            <a onClick={() => visitarPerfil(game.user.id)} class="cursor-pointer uppercase text-sm text-gray-400 group-hover:text-purple-500 transition-colors duration-300">{game.user.name}</a>
                                            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        <></>
                    }
                </div>
            </div>
        </div>






    )
}

export default Games;  
