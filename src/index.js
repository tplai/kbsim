import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './features/main/Main';
import store from './features/store/store.js';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

require('./assets/images/favicon.ico');
require('file-loader?name=[name].[ext]!./index.html');


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
