
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import './index.scss';
import App from './App';

import createSagaMiddleware from 'redux-saga';
import { watchAuth } from './store/sagas/root_saga';
import reducer from './store/reducers/reducer';

import Axios from 'axios';
Axios.defaults.baseURL="http://localhost:5000/api/";
Axios.defaults.headers.post['Content-Type']= 'application/json';
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;


const sagaMiddleWare = createSagaMiddleware();
const store = createStore(reducer,
    composeEnhancers( applyMiddleware(sagaMiddleWare)));
sagaMiddleWare.run(watchAuth);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
