import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {store} from './store/store';
import persistStore from '../src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore}>
        <App />
      </PersistGate>
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

