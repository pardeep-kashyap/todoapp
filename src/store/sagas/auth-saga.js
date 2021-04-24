import Axios from 'axios';
import { toast } from 'react-toastify';
import * as endPoints from '../../constants/endPoints';

export function* logoutSaga(action){
    yield localStorage.removeItem('user');
    yield action.history.push('/');
   }

export function* authStartSaga(action){
   const userInformation={
    username: action.email,
    password: action.password
   }
   try{
    const response = yield Axios.post(endPoints.LOGIN_USER,userInformation);
    if(response.data.status === 'success'){
       yield localStorage.setItem("user",JSON.stringify(response.data.loginDetail))
       yield  toast.success(`Login successful`);

       yield action.history.push('/home');
    }
   }catch(error){

   }
}
export function* googleAuthStartSaga(action){
   const userInformation={
      idToken: action.idToken
   }
   try{
    const response = yield Axios.post(endPoints.USER_GOOGLE_LOGIN,userInformation);
    if(response.data.status === 'success'){
       yield localStorage.setItem("user",JSON.stringify(response.data.loginDetail))
       yield  toast.success(`Login successful`);
       yield action.history.push('/home');
    }
   }catch(error){

   }
}
export function* userSignupSaga(action){
   try{
    const response = yield Axios.post(endPoints.USER_CREATE,action.userDetail);
    if(response.data.status === 'success'){
       yield action.history.push('/');
    }
   }catch(error){

   }
}
