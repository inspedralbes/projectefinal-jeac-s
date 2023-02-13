
async function endGame(score){
    console.log(score);
    
    try {
        const response = await fetch('http://localhost:8000/api/saveScore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ score }),
        });
        const data = await response.json();
        console.log(data);

        console.log(data.score);
  
        
    } catch (error) {
        console.error(error);
    }
}

export {endGame};