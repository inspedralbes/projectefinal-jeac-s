import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialState = {
  isLoggedIn: false,
  data: {}
};
const persistConfig = {
  key: 'root',
  storage,
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
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

const actions = {
  login: () => ({ type: LOGIN }),
  logout: () => ({ type: LOGOUT }),
};

export { store, persistor, actions };
