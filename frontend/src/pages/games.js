import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { actions } from '../components/store.js';

function Games({ sharedValue, onSharedValueChange, onSharedIdChange }) {
    const [fetchData, setFetchData] = useState([]);
    const [isLoading, setLoading] = useState(false);
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
                setLoading(false);
            } catch (error) {
                //this.setError(error);
            }
        }
        fetchGames();
    }, []);

    function visitarPerfil(id) {
        dispatch(actions.getUserId({ id: id, visitor: true, tab: "tab4" }));
        navigate("/otherProfile")
    }

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
                                            <div class="m-5 border-fuchsia-600 border-2 w-1/4 rounded overflow-hidden shadow-lg">
                                                <img class="w-full" src={process.env.REACT_APP_NODE_FITXERS_URL + game.img} alt="Game Image" />
                                                <div class="bg-purple-300 px-6 py-4">
                                                    <p class="text-black">{game.name}</p>
                                                    <p class="text-black">{game.description}</p>
                                                    <br></br>
                                                    <button class="bg-violet-500 hover:bg-fuchsia-400 font-bold py-2 px-4 border-b-4 border-fuchsia-700 hover:violet-fuchsia-500 rounded text-white"
                                                        onClick={() => handleInputChange(game.path, game.id)}>
                                                        Play
                                                    </button>
                                                    <p class="text-black " onClick={() => visitarPerfil(game.user.id)}>Creador: <a class="hover:text-white cursor-pointer">{game.user.name}</a></p>
                                                </div>

                                            </div>
                                        ))}
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
