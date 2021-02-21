import {combineReducers} from "redux";
import {HeaderReducer} from "../header/store/reducer";
import {ContentReducer} from "../content/store/reducer";
import {LoginReducer} from "../login/store/reducers";

export const rootReducer = (state,action) => {
    if (action.type === "logout"){
        state = undefined
    }
    return appReducer(state,action)
}

export const appReducer = combineReducers({
    header:HeaderReducer,
    content:ContentReducer,
    login:LoginReducer
})
