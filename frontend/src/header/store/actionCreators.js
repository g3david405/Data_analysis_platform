import * as actionTypes from "./actionTypes";

export const changeShow = (boo) => ({
    type:actionTypes.CHANGE_SHOW,
    value:boo
})

export const changeLoad = (load) => ({
    type:actionTypes.CHANGE_LOAD,
    value:load
})

export const changeLang = (lang) => ({
   type:actionTypes.CHANGE_LANG,
   value:lang
})