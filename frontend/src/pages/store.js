import React from 'react';
import { Provider } from 'react-redux';
import  Store  from '../components/provider_store';
import { store } from '../components/store';


const App = () => (
  <Provider store={store}>
    <Store />
  </Provider>
);

export default App;
