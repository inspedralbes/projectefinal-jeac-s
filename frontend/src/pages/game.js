
// program to generate random strings

// declare all characters
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

var Phaser = null;

import('phaser')
  .then((module) => {
    Phaser = module;
    console.log(Phaser);
  })

function Game() {
  var obj = null;
  var score = 0;

  function play() {
    fetch('http://localhost:7878/GamesFiles/ClickGame/initGame.js', {
      method: 'GET',
      mode: 'same-origin',
    })
      .then(response => response.text())
      .then(scriptText => {
        const scriptFn = new Function(scriptText + '; return executeGame()');
        obj = scriptFn();
        obj.init(generateString(5), sendInfoGame, finalJuego);
      })
  }

  function sendInfoGame(idGame, puntos_juego) {
    score = puntos_juego;
    console.log("id" + idGame + " | " + "Score " + score)
  }

  function finalJuego() {
    alert("JUEGO ACABADO");
  }

  return (
    <div className="game"><br></br>
      <div id="game">
        <canvas id="canvas" className="canvasGame border-4 border-red-500"></canvas>
      </div>
      <button onClick={play}>PLAY</button><br></br>
    </div>
  )
}

export default Game;