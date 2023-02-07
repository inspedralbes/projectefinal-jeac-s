import React from 'react';
import { Provider } from 'react-redux';
import LoginForm from './provider';
import { store } from './store';


const App = () => (
  <Provider store={store}>
    <LoginForm />
  </Provider>
);

export default App;
