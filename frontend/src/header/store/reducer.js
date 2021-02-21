import {fromJS} from 'immutable'
import * as actionTypes from "./actionTypes";


const defaultState = {
    show:true,
    loading:false,
    lang:"taiwanise",
}

export const HeaderReducer = (state = defaultState,action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case actionTypes.CHANGE_SHOW:
        {
            newState.show = action.value;
            return newState;
        }
        case actionTypes.CHANGE_LOAD:
        {
            newState.loading = action.value;
            return newState;
        }
        case actionTypes.CHANGE_LANG:
        {
            newState.lang = action.value;
            return newState;
        }
        default:
            return state;
    }
}