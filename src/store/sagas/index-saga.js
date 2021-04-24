import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/types-action';
import { authStartSaga,logoutSaga,userSignupSaga,googleAuthStartSaga } from './auth-saga';
import { fetchTaskSaga,deleteTaskSaga, saveNewTaskSaga } from './task-saga'

export function* watchAuth(){
    yield takeEvery(actionTypes.AUTH_START, authStartSaga);
    yield takeEvery(actionTypes.GOOGLE_AUTH_START, googleAuthStartSaga);
    yield takeEvery(actionTypes.LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.USER_SIGNUP, userSignupSaga);
}

export function* task(){
    yield takeEvery(actionTypes.FETCH_TASKS, fetchTaskSaga);
    yield takeEvery(actionTypes.DELETE_TASK, deleteTaskSaga);
    yield takeEvery(actionTypes.SAVE_NEW_TASK, saveNewTaskSaga);
    yield takeEvery(actionTypes.UPDATE_TASK, saveNewTaskSaga);
}
