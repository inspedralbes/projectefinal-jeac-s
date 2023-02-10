import { createStore, combineReducers } from 'redux';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialState = {
  isLoggedIn: false,
  data: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'LOGIN':
          return { ...state, isLoggedIn: true };
      case 'LOGOUT':
          return { ...state, isLoggedIn: false };
      case 'SAVE_DATA':
          return { ...state, data: action.payload };
      default:
          return state;
  }
};

const store = createStore(reducer);

const actions = {
  login: () => ({ type: LOGIN }),
  logout: () => ({ type: LOGOUT }),
};

export { store, actions };
