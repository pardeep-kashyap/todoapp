
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './store/reducer';
import './index.scss';
import App from './App';

import Axios from 'axios';
Axios.defaults.baseURL="/api/";
Axios.defaults.headers.post['Content-Type']= 'application/json';

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
