import routes from '../index.js'

var Phaser = null;
let data = [];

import('phaser')
  .then((module) => {
    Phaser = module;
    console.log(Phaser);
  })

function Game() {
  var obj = null;

  function play() {
    fetch(`${routes.wsNode}/GamesFiles/ClickGame/initGame.js`, {
      method: 'GET',
      mode: 'no-cors',
    })
      .then(response => response.text())
      .then(scriptText => {
        console.log(scriptText);
        const scriptFn = new Function(scriptText + '; return executeGame()');
        obj = scriptFn();
        obj.init();
        console.log(obj);
      })
  }

  function load2() {
    var jsFile = 'initGame.js';

    const scriptUrl = routes.wsNode + '/hola.txt';

    fetch(`${routes.wsNode}/public/GamesFiles/CopiaMario/initGame.js`, {
      method: 'GET',
      cors: {
        origin: "*",
        credentials: true,
      },
    })
      .then(response => response.text())
      .then(scriptText => {
        console.log(scriptText);
        //eval(scriptText);
        const scriptFn = new Function(scriptText);
        scriptFn();
        console.log('Script ejecutado exitosamente.');
      })
      .catch(error => console.error('Error al recuperar y ejecutar el script:', error));
    function test() {
      var test = obj.enviar();
      obj.recibir(test);
      console.log(test);
    }


    return (
      <div className="game"><br></br>
        <div id="game">
          <canvas id="canvas" className="canvasGame border-4 border-red-500"></canvas>
        </div>
        <button onClick={play}>PLAY</button><br></br>
        <button onClick={test}>ENVIAR</button>

      </div>
    )
  }
}

export default Game;