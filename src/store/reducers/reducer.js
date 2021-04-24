import * as actionTypes from '../actions/types-action';
import { updateObject } from './../../utils/util'
const initialState={
    taskNameTextBox:'',
    sideMenu:{
        opened:false
    },
    selectedObj:{
        important:false,
        _id:"",
        __v:0,
        created_at:"",
        taskName:"",
        descriptions:"",
        email:'',
        
        status:false
    },
    taskList:[]
}

const toggleMenu=(state,action)=>{
    const sideMenu={...state.sideMenu};
    sideMenu.opened=!sideMenu.opened;
    return {
        ...state,
        sideMenu
    }
}

const showBox =(state,action)=>{
    const selectedObj = {...action.selectedObj}
            return {
                ...state,
                selectedObj
            }
}

const setTaskList = (state,action)=>{
    state= updateObject(state,{taskList:action.taskList});   
    if(action.taskList && action.taskList.length){
        state= updateObject(state,{selectedObj:action.taskList[0]}); 
    }
    return state;
}

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.TOGGLE_MENU:return toggleMenu(state,action);
        case actionTypes.SHOW_TASK_PREVIEW:return showBox(state,action);
        case actionTypes.SET_TASKS:return setTaskList(state,action); 
        case actionTypes.SET_TASK_NAME_INPUT:return updateObject(state,{taskNameTextBox:action.text})
        default:return state;
    }
}
export default reducer;