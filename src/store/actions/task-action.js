import { FETCH_TASKS,SET_TASKS,SHOW_TASK_PREVIEW,DELETE_TASK,SAVE_NEW_TASK,SET_TASK_NAME_INPUT,UPDATE_TASK } from './types-action';

export const fetchTasks=(email)=>{
    return {
        type:FETCH_TASKS,
        email
    }
}

export const setTaskPreview=(selectedObj)=>{
    return {
        type:SHOW_TASK_PREVIEW,
        selectedObj
    }
}

export const setTasks=(taskList)=>{
    return {
        type:SET_TASKS,
        taskList
    }
}

export const deleteTask=(taskId)=>{
    return {
        type:DELETE_TASK,
        taskId
    }
}

export const saveNewTask=(payload)=>{
    return {
        type:SAVE_NEW_TASK,
        payload
    }
}

export const setPreviewTextBox=(text)=>{
    return {
        type:SET_TASK_NAME_INPUT,
        text
    }
}
export const updateTask=(task)=>{
    return {
        type:UPDATE_TASK,
        payload:task
    }
}

