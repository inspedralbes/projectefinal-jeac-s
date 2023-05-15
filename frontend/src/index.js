import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

import AsideNav from './components/asideNav.js';
import {HashRouter} from "react-router-dom";

import './App.css';

const routes = {
  fetchLaravel: "http://front.jeacsg.alumnes.inspedralbes.cat/../laravel/public",
  wsNode: "http://front.jeacsg.alumnes.inspedralbes.cat:7878",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <HashRouter>
        <AsideNav></AsideNav>
      </HashRouter>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


export default routes;