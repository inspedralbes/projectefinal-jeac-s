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
    fetch('http://localhost:7878/GamesFiles/ClickGame/initGame.js', {
      method: 'GET',
      mode: 'same-origin',
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

  function test() {
    var test = obj.enviar();
    obj.recibir(test);
    console.log(test);
  }

  /*socket.emit('datagame', data)

  socket.on('datagame', function (data) {
    console.log(data)
});*/

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

export default Game;