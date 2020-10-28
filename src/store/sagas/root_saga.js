import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { authStartSage } from './auth'

export function* watchAuth(){
    yield takeEvery(actionTypes.AUTH_START,authStartSage);
}