
import ReactDOM from 'react-dom';
import './index.scss';
import {App} from './App';
import * as serviceWorker from './serviceWorker';
import Axios from 'axios';
Axios.defaults.baseURL="http://localhost:5000/api/";
Axios.defaults.headers.post['Content-Type']= 'application/json';

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
