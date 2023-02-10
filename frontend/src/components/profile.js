import React from 'react';
import { Provider } from 'react-redux';
import  UserInfo  from './provider_profile';
import { store } from './store';


const App = () => (
  <Provider store={store}>
    <UserInfo />
  </Provider>
);

export default App;
