import * as actionTypes from "./actionTypes";
import {CHANGE_LOGIN} from "../../store/actionTypes";
import {CHANGE_CONFIRM} from "../../content/store/actionTypes";
import {SET_USER} from "../../store/actionTypes";

const defaultState = {
    user:"",
    confirm:false,
    admin:false
}

export const LoginReducer = (state = defaultState,action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case actionTypes.LOGIN:
        {
            newState.user = action.user;
            newState.confirm = action.confirm;
            newState.admin = action.admin;
            return newState;
        }
        case CHANGE_CONFIRM:
        {
            newState.confirm = action.confirm;
            return newState;
        }
        case SET_USER:
        {
            newState.user = action.username;
            newState.confirm = action.confirm;
            newState.admin = action.admin;
            return newState;
        }
        default:
            return state;
    }
}