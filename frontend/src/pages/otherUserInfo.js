import React from 'react';
import { Provider } from 'react-redux';
import  OtherUserInfo  from '../components/provider_otherUserInfo';
import { store } from '../components/store';


const App = () => (
  <Provider store={store}>
    <OtherUserInfo />
  </Provider>
);

export default App;