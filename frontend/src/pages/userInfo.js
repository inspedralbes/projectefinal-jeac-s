import React from 'react';
import { Provider } from 'react-redux';
import  UserInfo  from '../components/provider_userInfo';
import { store } from '../components/store';


const App = () => (
  <Provider store={store}>
    <UserInfo />
  </Provider>
);

export default App;
