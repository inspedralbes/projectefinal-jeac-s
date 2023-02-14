import { useSelector } from 'react-redux';

function GetId() {
  const data = useSelector(state => state.data);
  return data.id;
}

async function endGame(totalScore){
    console.log(totalScore);
    const id = GetId();
    try {
        const response = await fetch('http://localhost:8000/api/saveScore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ totalScore, id }),
        });
        const data = await response.json();

        
    } catch (error) {
        console.error(error);
    }
}

export {endGame};
