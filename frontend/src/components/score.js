import { useSelector, useDispatch } from 'react-redux';
import { store, actions } from './store'; // import the Redux store

async function endGame(totalScore) {
  console.log(totalScore);
  const token = localStorage.getItem('access_token');

  try {
    const response = await fetch('http://localhost:8000/api/saveScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ totalScore }),
    });
    const data = await response.json();
    store.dispatch(actions.saveData(data));
  } catch (error) {
    console.error(error);
  }
}

export { endGame };
