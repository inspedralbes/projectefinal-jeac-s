import React from 'react';
import { Provider } from 'react-redux';
import NavBar from './navbar_provider';
import { store } from './store';


const App = () => (
  <Provider store={store}>
    <NavBar />
  </Provider>
);

export default App;
