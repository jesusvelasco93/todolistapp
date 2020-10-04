/* Polyfill IE11 */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
/* Basic */
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
/* Aditional components/services */
import AppComponent from './components/app/App.component';
/* Custom CSS */
import './style/custom.scss';
import 'open-iconic/font/css/open-iconic-bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <AppComponent/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
