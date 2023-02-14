
async function endGame(totalScore){
    console.log(totalScore);
    try {
        const response = await fetch('http://localhost:8000/api/saveScore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ totalScore }),
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

export {endGame};
