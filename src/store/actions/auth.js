import { AUTH_START,LOGOUT, USER_SIGNUP, GOOGLE_AUTH_START } from "./types-action"

export const authStart=(email,password,history)=>{
    return {
        type:AUTH_START,
        email,
        password,
        history
    }
}

export const googleSign=(idToken,history)=>{
    return {
        type:GOOGLE_AUTH_START,
        idToken,
        history
    }
}

export const logout=(history)=>{
    return {
        type:LOGOUT,
        history
    }
}

export const userSignup=(userDetail,history)=>{
    return {
        type:USER_SIGNUP,
        userDetail,
        history
    }
}
