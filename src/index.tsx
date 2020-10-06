/* Polyfill IE11 */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
/* Basic */
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
/* Redux */
import { Provider } from 'react-redux';
import { createStore, Store } from "redux";
/* Aditional components/services */
import AppComponent from './components/app/App.component';
import questionsPageReducer from './store/reducer';
import { QuestionPageAction, QuestionPageState } from './store/type';
/* Custom CSS */
import './style/custom.scss';
import 'open-iconic/font/css/open-iconic-bootstrap.css';

/* STORE */
const store: Store<QuestionPageState, QuestionPageAction> = createStore(questionsPageReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppComponent/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
