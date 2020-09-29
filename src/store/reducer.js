import * as actionTypes from '../store/action';

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

const reducer =(state=initialState,action)=>{
    if(action.type === actionTypes.TOGGLE_MENU){
            const sideMenu={...state.sideMenu};
            sideMenu.opened=!sideMenu.opened;
            return {
                ...state,
                sideMenu
            }
        }else if(action.type === actionTypes.SHOW_BOX){
           const selectedObj = {...action.selectedObj}
            return {
                ...state,
                selectedObj
            }
        }else{
            return state
        }
    }

export default reducer;