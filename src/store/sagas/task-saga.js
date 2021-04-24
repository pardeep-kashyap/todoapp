import Axios from "axios";
import { put } from "redux-saga/effects";
import { UPDATE_TASK } from "../actions/types-action";
import * as endPoints from '../../constants/endPoints';
import * as actions from './../actions/index-action';

export function* fetchTaskSaga(action) {
    try{
        const response = yield  Axios.get(`${endPoints.FETCH_ALL_TASKS}?email=${action.email}`);
        if(response.data.success){
          yield put(actions.setTasks(response.data.data));
        }
    }catch(error){

    }
}

export function* deleteTaskSaga(action) {
    try{
        const response = yield  Axios.delete(`${endPoints.DELETE_TASK}?taskId=${action.taskId}`);
        if(response.data.success){
          yield put(actions.fetchTasks(response.data.data.email));
        }
    }catch(error){

    }
}

export function* saveNewTaskSaga(action) {
    try{
        const response = yield  Axios.post(endPoints.SAVE_TASK,action.payload);
        if(response.data.success){
          if(action.type !== UPDATE_TASK){
            yield put(actions.setPreviewTextBox(''));  
          }
          yield put(actions.fetchTasks(response.data.data.email));
        }
    }catch(error){

    }
}