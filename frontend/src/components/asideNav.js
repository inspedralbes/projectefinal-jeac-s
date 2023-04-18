import React from 'react';
import { Provider } from 'react-redux';
import AsideNav from './provider_asideNav';
import { store } from './store';


const App = () => (
  <Provider store={store}>
    <AsideNav />
  </Provider>
);

export default App;