import React from 'react';
import { Provider } from 'react-redux';
import  Historial  from '../components/provider_historial';
import { store } from '../components/store';


const App = () => (
  <Provider store={store}>
    <Historial />
  </Provider>
);

export default App;
