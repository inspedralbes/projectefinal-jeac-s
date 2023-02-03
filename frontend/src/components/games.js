import useScript from "./UseScript";



function Games() {
    // useScript('//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js', false)
    // useScript('frontend/Games/marioGame.js', true)
    

    const onClick = () => {
        const script = document.createElement('script');

        script.src = 'frontend/Games/marioGame.js';
        script.type = ('module')
        

        document.body.appendChild(script);
    }


    return (
        <div>
            <h1>Los JUEGUITOS</h1>

            <button onClick={onClick}>Play</button>

            <canvas id="canvas" className="canvasGame"></canvas>


        </div>
    )
}

export default Games;