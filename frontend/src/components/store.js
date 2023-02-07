import { createStore, combineReducers } from 'redux';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case LOGIN:
      return true;
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

const reducers = combineReducers({
  isLoggedIn,
});

const store = createStore(reducers);

const actions = {
  login: () => ({ type: LOGIN }),
  logout: () => ({ type: LOGOUT }),
};

export { store, actions };
