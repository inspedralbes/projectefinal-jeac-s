
import { useEffect } from "react";
import routes from "../index.js";

import { useState } from 'react'
import { $CombinedState } from 'redux';
import { Socket } from "socket.io-client";



function Game({ socket }) {

    const [lobbyId, setLobbyId] = useState("null");
    const [lobbyIdInput, setLobbyIdInput] = useState("");
    const [username, setUsername] = useState("");



    useEffect(() => {
        socket.on("lobby_info", (data) => {
            setLobbyId(data.lobbyIdentifier);
        });

        socket.on("lobby_info", (data) => {
            console.log(data);
        });

    }, []);

    return (
        <div className="game"><br></br>
            <h1>{lobbyId}</h1>
            
        </div>
    )
}

export default Game;



