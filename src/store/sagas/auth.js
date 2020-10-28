import Axios from 'axios';
import { put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as endPoints from './../../constants/endPoints';

export function* logoutSaga(action){
    yield localStorage.removeItem('user');
    yield put({
        type:actionTypes.LOGOUT
    })
}

export function* authStartSage(action){
   const userInformation={
    username: action.email,
    password: action.password
   }
   try{
    const response = yield Axios.post(endPoints.LOGIN_USER,userInformation);
    if(response.data.status === 'success'){
       yield localStorage.setItem("user",JSON.stringify(response.data.loginDetail))
       yield put(action.history.push('/home'));
    }
   }catch(error){

   }
}