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
        <div className="overflow-auto bg-image-all bg-cover bg-no-repeat bg-center bg-fixed flex h-screen justify-center items-center">
            <div className="text-center container h-full w-3/4 p-10">
                <div className="block rounded-lg bg-gray-800 shadow-lg dark:bg-neutral-800">
                    <div className="p-4">
                        <h2 className="font-mono text-white text-4xl mt-10 font-bold">GAMES</h2>
                        <div className="md:m-6 md:p-12">
                            <div>
                                {fetchData.games ?
                                    <div className="justify-center text-center flex flex-wrap">
                                        {fetchData.games.map((game) => (
                                            <div key={game.id} classNameName="m-5 border-fuchsia-600 border-2 w-1/4 rounded overflow-hidden shadow-lg">
                                                <img classNameName="h-52 w-full" src={process.env.REACT_APP_NODE_FITXERS_URL + game.img} alt="Game Image" />
                                                <div classNameName="h-full bg-purple-300 px-6 py-4">
                                                    <p classNameName="text-black text-3xl font-bold mb-4">{game.name}</p>
                                                    <p classNameName="text-black break-words">{game.description}</p>
                                                    <br></br>
                                                    <button classNameName="bg-violet-500 hover:bg-fuchsia-400 font-bold py-4 px-12 border-b-4 border-fuchsia-700 hover:violet-fuchsia-500 rounded text-white text-3xl"
                                                        onClick={() => handleInputChange(game.path, game.id)}>
                                                        Play
                                                    </button>
                                                    <br></br><br></br>
                                                    <div>
                                                        <hr classNameName="border-black mt-4 mb-4"></hr>
                                                        <p classNameName="text-black text-xl font-bold">
                                                            Juego creado por:<br></br>
                                                            <a onClick={() => visitarPerfil(game.user.id)} classNameName="hover:text-white cursor-pointer">{game.user.name}</a>
                                                        </p>
                                                    </div>
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
