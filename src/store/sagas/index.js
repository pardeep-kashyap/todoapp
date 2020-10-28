import { put } from 'redux-saga/effects';
import * as actionTypes from '../action';

export function* logoutSaga(action){
    yield localStorage.removeItem('user');
    yield put({
        type:actionTypes.LOGOUT
    })
}
