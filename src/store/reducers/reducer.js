import * as actionTypes from '../actions/actionTypes';

const initialState={
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
        status:false
}
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

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.TOGGLE_MENU:return toggleMenu(state,action);
        case actionTypes.SHOW_BOX:return showBox(state,action);
        default:return state;
    }
}
export default reducer;