import * as actionTypes from './actionTypes';
import axios from "axios";
import {changeLoad} from "../../header/store/actionCreators";
import {message} from "antd";


export const login = (username,password,history) => {
    return (dispatch,getState)=>{
        const data = {
                username:username,
                password:password
            }
        dispatch(changeLoad(true));
        axios({
            method:'post',
            url:"/login",
            data:data
        }).then((res)=>{
            if(res.data.success === 100){
                const action = {
                    type:actionTypes.LOGIN,
                    user:res.data.username,
                    confirm:res.data.confirm,
                    admin:res.data.admin
                }
                localStorage.setItem("username",res.data.username);
                localStorage.setItem("admin",res.data.admin);
                localStorage.setItem("confirm",res.data.confirm);
                dispatch(action);
                history.push("/");
            }
            else{
                message.error(res.data.message)
            }
            dispatch(changeLoad(false));
        }).catch(()=>{
            dispatch(changeLoad(false))
        })
        }
    }

export const logout = () => ({
    type:actionTypes.LOGOUT
})

export const logoutBackend = () => {
    return () => {
        localStorage.removeItem('username');
        localStorage.removeItem('admin');
        localStorage.removeItem('confirm');
    }
}

export const register = (username,password,email) => {
    return (dispatch,getState)=>{
        dispatch(changeLoad(true))
        const data = {
            username:username,
            password:password,
            email:email
        }
        axios({
            method:"post",
            url:"/add_user",
            data:data
        }).then((res)=>{
            if (res.data.success === '100'){
                message.success("註冊成功，請置信箱中進行用戶驗證");
            }
            else{
                message.error(res.data.message);
            }
            dispatch(changeLoad(false));
        }).catch(()=>{
            message.error("失敗");
            dispatch(changeLoad(false));
        })
    }
}

