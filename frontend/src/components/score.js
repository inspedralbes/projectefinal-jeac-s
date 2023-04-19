import { useSelector, useDispatch } from 'react-redux';
import { store, actions } from './store'; // import the Redux store
import routes from '../index';

async function endGame(totalScore) {
  console.log(totalScore);
  const token = localStorage.getItem('access_token');
  const userId = 29;
  const gameId = 8;
  const score = totalScore;

  if (token)
    if (token != "0") {
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

        const createPlayedGame = await fetch(routes.fetchLaravel + '/api/createPlayedGame', {
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



export { endGame };
