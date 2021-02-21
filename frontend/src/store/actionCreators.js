
import * as actionTypes from "./actionTypes";


export const setUser = (username,confirm,admin) => ({
    type:actionTypes.SET_USER,
    username:username,
    admin:admin,
    confirm:confirm
})