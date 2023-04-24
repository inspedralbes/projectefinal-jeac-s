import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SAVEDATA = 'SAVE_DATA';
const GET_STORE_ITEMS = 'GET_STORE_ITEMS';
const UPDATE_BOUGHT_ITEMS = 'UPDATE_BOUGHT_ITEMS';

const initialState = {
  isLoggedIn: false,
  data: {},
  storeIems: {},
  boughtItems: {}
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
      return { ...initialState, isLoggedIn: false };
    case 'SAVE_DATA':
      return { ...state, data: action.payload };
    case 'GET_STORE_ITEMS':
      return { ...state, storeItems: action.payload };
    case 'UPDATE_BOUGHT_ITEMS':
      return { ...state, boughtItems: action.payload };
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
  saveData: (data) => ({ type: SAVEDATA, payload: data }),
  saveStoreItems: (storeItems) => ({ type: GET_STORE_ITEMS, payload: storeItems }),
  saveBoughtItems: (boughtItems) => ({ type: UPDATE_BOUGHT_ITEMS, payload: boughtItems })
};

export { store, persistor, actions };
