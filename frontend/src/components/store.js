import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SAVEDATA = 'SAVE_DATA';
const GET_STORE_ITEMS = 'GET_STORE_ITEMS';
const UPDATE_BOUGHT_ITEMS = 'UPDATE_BOUGHT_ITEMS';
const GET_GAMEINFO = 'GET_GAMEINFO';
const GET_PATHGAME = 'GET_PATHGAME';
const GET_USERID = 'GET_USERID';
const GET_OTHERSINFO = 'GET_OTHERSINFO';

const initialState = {
  isLoggedIn: false,
  data: {},
  storeIems: {},
  boughtItems: {},
  gameInfo: {},
  pathGame: {},
  getUserId: {},
  dataOthers: {}
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
      return { ...state, isLoggedIn: false, data: {} };
    case 'SAVE_DATA':
      return { ...state, data: action.payload };
    case 'GET_STORE_ITEMS':
      return { ...state, storeItems: action.payload };
    case 'UPDATE_BOUGHT_ITEMS':
      return { ...state, boughtItems: action.payload };
    case 'GET_GAMEINFO':
      return { ...state, gameInfo: action.payload };
    case 'GET_PATHGAME':
      return { ...state, pathGame: action.payload };
    case 'GET_USERID':
      return { ...state, getUserId: action.payload };
    case 'GET_OTHERSINFO':
      return { ...state, dataOthers: action.payload };
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
  saveBoughtItems: (boughtItems) => ({ type: UPDATE_BOUGHT_ITEMS, payload: boughtItems }),
  saveGameInfo: (gameInfo) => ({ type: GET_GAMEINFO, payload: gameInfo }),
  savePathGame: (pathGame) => ({ type: GET_PATHGAME, payload: pathGame }),
  getUserId: (getUserId) => ({ type: GET_USERID, payload: getUserId }),
  dataOthers: (dataOthers) => ({ type: GET_OTHERSINFO, payload: dataOthers }),
};

export { store, persistor, actions };
