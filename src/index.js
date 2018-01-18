import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import store from './state'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
,
  document.getElementById('root')
);

registerServiceWorker();
