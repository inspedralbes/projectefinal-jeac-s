
import React, { Component } from "react";
import { useState } from 'react'
import { NavLink } from 'react-router-dom';

import GameCard from '../components/gameCard.js';

import routes from "../index.js";

import { useEffect } from "react";

function GamesList({ socket }) {
    const [dataGames, setDataGames] = useState("");
    const [startToPlay, setStartToPlay] = useState(false);
    const [firstTime, setFirstTime] = useState(true);



    useEffect(() => {

        if (firstTime) {
            fetch(routes.fetchLaravel + '/api/gamesList', {
                method: 'GET'
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.games);
                setDataGames(data.games);
            });
            setFirstTime(true);
        }
    }, [firstTime]);


    function clickOnGame(){
        setStartToPlay(true);
    }

    if (!startToPlay) {
        return (
            <div>
                {dataGames ?
                    <div className="cartasGrid">
                        {dataGames.map((game) => (
                            <GameCard key={game.id} game={game} startPlaying={setStartToPlay} />
                        ))}
                    </div>
                    :
                    <></>
                }
            </div>
        )
    }

    else {
    }
}

export default GamesList;