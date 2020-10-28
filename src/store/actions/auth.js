import { AUTH_START } from "./actionTypes"

export const authStart=(email,password,history)=>{
    return {
        type:AUTH_START,
        email,
        password,
        history
    }
}
