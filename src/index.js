
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import './index.scss';
import App from './App';

import createSagaMiddleware from 'redux-saga';
import { watchAuth,task } from './store/sagas/index-saga';
import reducer from './store/reducers/reducer';

import Axios from 'axios';
Axios.defaults.baseURL="http://localhost:5000/api/";
Axios.defaults.headers.post['Content-Type']= 'application/json';
let composeEnhancers = null;
if (process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
} else {
    composeEnhancers = compose;
}
const sagaMiddleWare = createSagaMiddleware();
const store = createStore(reducer,
    composeEnhancers( applyMiddleware(sagaMiddleWare)));
sagaMiddleWare.run(watchAuth);
sagaMiddleWare.run(task);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
