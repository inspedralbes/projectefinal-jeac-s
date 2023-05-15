import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Socket } from "socket.io-client";
import ConnectedUsers from "../components/ConnectedUsers.js"
import routes from '../index';
import { store, actions } from '../components/store.js'; // import the Redux store

var Phaser = null;
var obj = null;
var ownerLobby;

import('phaser')
  .then((module) => {
    Phaser = module;
  })

function Game({ socket }) {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const userInfo = useSelector((state) => state.data);
  const gameInfo = useSelector((state) => state.gameInfo);
  const pathGame = useSelector((state) => state.pathGame);

  const [lobbyId, setLobbyId] = useState(null);
  const [lobbyIdInput, setLobbyIdInput] = useState(null);
  const [displayCanvas, setDisplayCanvas] = useState(false);
  const [gameModeSelected, setGameModeSelected] = useState(false);
  const [singlePlayer, setSinglePlayer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [singlePlayerUserName, setSinglePlayerUserName] = useState(null);
  const [multiPlayerUserName, setMultiPlayerUserName] = useState(null);
  const [createRoomOwner, setcreateRoomOwner] = useState(null);
  const [notRoomOwner, setNotRoomOwner] = useState(null);
  const [optionSelected, setOptionSelected] = useState(false);
  const [lobbyStarted, setLobbyStarted] = useState(false);
  const [lobbyJoined, setLobbyJoined] = useState(false);
  const token = localStorage.getItem('access_token');


  useEffect(() => {
    socket.on("lobby_info", (data) => {
      setLobbyId(data.lobbyIdentifier);
      ownerLobby = data;
    });

    socket.on("start_game", () => {
      setDisplayCanvas(true);
      play();
      console.log(ownerLobby);
    });

    socket.on('send_datagame_to_platform', (data) => {
      if (obj != null) {
        obj.recibirInfoFromPlatform(data);
      }
    });
    if (isLoggedIn) {
      setSinglePlayerUserName(userInfo.name);
      setMultiPlayerUserName(userInfo.name);
    }
  }, [userInfo, isLoggedIn]);

  //Funciones lobby single player.
  function saveUsername() {
    if (singlePlayerUserName != null) {
      socket.emit("new_lobby", singlePlayerUserName);
      setLobbyStarted(true);
    } else {
      setDisplayCanvas(false)
      console.log("El nombre no puede estar vacio");
    }
  };

  function handleSetSinglePlayerUsername(e) {
    setSinglePlayerUserName(e.target.value);
  }

  function handleSaveUsernameOnClick() {
    if (singlePlayerUserName != null) {
      socket.emit("new_lobby", singlePlayerUserName);
      setLobbyStarted(true);
    } else {
      console.log("El nombre no puede estar vacio");
      setDisplayCanvas(false)
    }
  };

  //Funciones lobby multi player.
  function joinRoom() {
    setcreateRoomOwner(false);
    setNotRoomOwner(true);
    setOptionSelected(true);
  }

  function createRoom() {
    setcreateRoomOwner(true);
    setNotRoomOwner(false);
    setOptionSelected(true);
  }

  function handleSetLobbyIdNoOwner(e) {
    setLobbyIdInput(e.target.value);
  }

  function handleSetMultiPlayerUsername(e) {
    setMultiPlayerUserName(e.target.value);
  }

  function joinLobby() {
    if (lobbyIdInput != null && multiPlayerUserName != null) {
      setLobbyJoined(true);
      socket.emit("join_room", {
        lobbyIdentifier: lobbyIdInput,
        username: multiPlayerUserName,
      });
    }
  }

  function startGame() {
    if (singlePlayerUserName != null || multiPlayerUserName != null) {
      socket.emit("can_start_game");
      setGameStarted(true);
    } else {
      setGameStarted(false);
      setDisplayCanvas(false)
      console.log("El nombre no puede estar vacio");
    }
  }

  function play() {
    socket.emit("get_players_in_lobby");

    fetch('http://localhost:7878/GamesFiles/' + pathGame + '/juego.js', {
      method: 'GET',
      mode: 'same-origin',
    })
      .then(response =>
        response.text()
      )
      .then(scriptText => {
        const scriptFn = new Function(scriptText + '; return executeGame()');
        obj = scriptFn();
        obj.init(sendInfoGame, finalJuego);
        obj.recibirInfoLobby(ownerLobby);
      })
  }

  function sendInfoGame(infoGame) {
    console.log(infoGame);
    socket.emit("datagame", infoGame);
  }

  async function finalJuego(points) {
    var totalScore = points;
    var gameId = gameInfo;
    var score = totalScore;

    if (isLoggedIn) {
      try {
        const response = await fetch(routes.fetchLaravel + '/api/saveScore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ totalScore }),
        });
        const data = await response.json();
        store.dispatch(actions.saveData(data));
        const userId = data.id;

        await fetch(routes.fetchLaravel + '/api/createPlayedGame', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, gameId, score }),
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div class="flex h-screen justify-center items-center min-h-screen bg-image-all bg-cover bg-no-repeat bg-center bg-fixed">
      <div class="g-6 flex h-full flex-wrap items-center justify-center">
        <div class="block rounded-lg bg-gray-800 shadow-lg dark:bg-neutral-800">
          <div class="p-4">
            <div class="md:m-6 md:p-12">
              <div class="text-center">
                {!gameModeSelected ?
                  <div>
                    <h3 class="text-white">Choose the gamemode</h3>
                    <br></br>
                    <div>
                      <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setGameModeSelected(true); setSinglePlayer(true); }}>Single Player</button>
                      <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setGameModeSelected(true); setSinglePlayer(false); }}>Multiplayer</button>
                    </div>
                  </div>
                  :
                  <div>
                    {singlePlayer && !gameStarted ?
                      <div>
                        {isLoggedIn ?
                          <div>
                            <h3 class="text-white">Players:</h3>
                            <div>
                              {singlePlayerUserName && <p class="text-white">{singlePlayerUserName}</p>}
                              <br></br>
                              <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" onClick={() => { saveUsername(); startGame(); }}>PLAY</button>
                            </div>
                          </div>
                          :
                          <div>
                            <label>
                              <div>
                                <input
                                  class="text-white peer block min-h-[auto] w-full border-2 border-fuchsia-600 rounded bg-transparent px-3 py-[0.32rem] 
                                          leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 
                                          data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 
                                          [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  id="singlePNotLoggedIn" type="text"
                                  required placeholder="Username" onChange={handleSetSinglePlayerUsername} />

                                <label className="text-white">
                                  Introduce your nickname
                                </label><br></br>
                                <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" onClick={() => { handleSaveUsernameOnClick(); startGame(); }}>PLAY</button>
                              </div>
                            </label>
                          </div>
                        }
                      </div>
                      :
                      <div>
                        {!optionSelected && !gameStarted ?
                          <div>
                            <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" onClick={createRoom}>Create lobby</button>
                            <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" onClick={joinRoom}>Join lobby</button>
                          </div> :
                          <></>
                        }
                        {createRoomOwner ?
                          <div>
                            <h1 className="text-white">{lobbyId}</h1>
                            <ConnectedUsers socket={socket} />
                            {isLoggedIn ?
                              <div>
                                {!lobbyStarted ?
                                  <div>
                                    {singlePlayerUserName && <p class="text-white">{singlePlayerUserName}</p>}
                                    <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" onClick={() => { saveUsername() }}>Set Lobby</button>
                                  </div>
                                  :
                                  <div>
                                    {!gameStarted ?
                                      <div>
                                        <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" onClick={() => { startGame(); }}>PLAY</button>
                                      </div>
                                      :
                                      <></>
                                    }
                                  </div>
                                }
                              </div>
                              :
                              <div>
                                {!lobbyStarted ?
                                  <div>
                                    <label>
                                      <div>
                                        <input
                                          class="text-white peer block min-h-[auto] w-full border-2 border-fuchsia-600 rounded bg-transparent px-3 py-[0.32rem] 
                                          leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 
                                          data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 
                                          [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                          id="singlePNotLoggedIn" type="text"
                                          required placeholder="Username" onChange={handleSetSinglePlayerUsername} />
                                        <label className="text-white">
                                          Introduce your nickname
                                        </label><br></br>
                                        <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" onClick={() => { handleSaveUsernameOnClick() }}>Set Lobby</button>
                                      </div>
                                    </label>
                                  </div>
                                  :
                                  <div>
                                    {!gameStarted ?
                                      <div>
                                        <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" onClick={() => { startGame(); }}>PLAY</button>
                                      </div>
                                      :
                                      <></>
                                    }
                                  </div>
                                }
                              </div>
                            }
                          </div>
                          :
                          <></>
                        }
                        {notRoomOwner ?
                          <div>
                            {!lobbyJoined ?
                              <div>
                                {isLoggedIn ?
                                  <div>
                                    {multiPlayerUserName && <p>{multiPlayerUserName}</p>}
                                    <input
                                      class="text-white peer block min-h-[auto] w-full border-2 border-fuchsia-600 rounded bg-transparent px-3 py-[0.32rem] 
                                          leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 
                                          data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 
                                          [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                      id="singlePNotLoggedIn" type="text"
                                      required placeholder="Lobby ID" value={lobbyIdInput} onChange={handleSetLobbyIdNoOwner} />
                                    <label className="text-white">Introduce lobby ID</label><br></br>
                                    <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" onClick={() => { joinLobby() }}>Join Lobby</button>
                                  </div>
                                  :
                                  <div>
                                    <label>
                                      <div>
                                        <label>
                                          <div>
                                            <input
                                              class="text-white peer block min-h-[auto] w-full border-2 border-fuchsia-600 rounded bg-transparent px-3 py-[0.32rem] 
                                          leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 
                                          data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 
                                          [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                              id="multiPNotLoggedIn" type="text"
                                              required placeholder="Username" value={multiPlayerUserName} onChange={handleSetMultiPlayerUsername} />
                                            <label className="text-white">
                                              Introduce your nickname
                                            </label><br></br>
                                          </div>
                                        </label>
                                        <input
                                          class="text-white peer block min-h-[auto] w-full border-2 border-fuchsia-600 rounded bg-transparent px-3 py-[0.32rem] 
                                          leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 
                                          data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 
                                          [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                          id="singlePNotLoggedIn" type="text"
                                          required placeholder="Lobby ID" value={lobbyIdInput}      onChange={handleSetLobbyIdNoOwner} /> 
                                        <label className="text-white">Introduce lobby ID</label><br></br>
                                        <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" onClick={() => { joinLobby() }}>Join Lobby</button>
                                      </div>
                                    </label>
                                  </div>
                                }
                              </div> :
                              <ConnectedUsers socket={socket} />
                            }
                          </div>
                          :
                          <></>
                        }
                      </div>
                    }
                  </div >
                }
                {displayCanvas ?
                  <div>
                    <div>
                    </div>
                    <div id="game">
                      <canvas id="canvas" className="canvasGame"></canvas>
                    </div>
                  </div>
                  :
                  <></>
                }
              </div >
            </div></div></div></div></div>
  )
}

export default Game;