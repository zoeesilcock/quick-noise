/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import axios from 'axios';

import { store, persistor } from './store';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const port = process.env.REACT_APP_API_PORT || 5000;
axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
