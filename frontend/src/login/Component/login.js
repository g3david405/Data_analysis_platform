import React, {Fragment, useState} from "react";
import {useDispatch} from "react-redux";
import {
    FormWrapper,
    InputDes,
    InputLogin,
    LeftArea,
    LoginDescribe,
    LoginText,
    RegisterText,
    RightArea,
    SubmitButton
} from "../style";
import icon from "../../static/icon.svg";
import {Input} from "antd";
import * as actionCreators from "../store/actionCreators";
import {Link, useHistory} from "react-router-dom";

export function Login(){
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const dispatch = useDispatch();
    const history = useHistory();
    return(
        <Fragment>
            <LeftArea>
                <div style={{height:50,marginBottom:10}}>
                    <img src={icon} />
                </div>
                <LoginDescribe> 智能分析平台</LoginDescribe>
            </LeftArea>
            <RightArea>
                <FormWrapper>
                    <LoginText> Login </LoginText>
                    <InputLogin>
                        <InputDes>帳號</InputDes>
                        <Input style={{width:240}} value={username} onChange={(e)=>{
                            setUsername(e.target.value);
                        }}/>
                    </InputLogin>
                    <InputLogin>
                        <InputDes>密碼</InputDes>
                        <Input.Password style={{width:240}}  value={password} onChange={(e)=>{
                            setPassword(e.target.value);
                        }}/>
                    </InputLogin>
                </FormWrapper>
                { username && password ?
                    <SubmitButton className={"able"} onClick={()=>{
                        dispatch(actionCreators.login(username,password,history));
                    }
                    }>登入</SubmitButton>:
                    <SubmitButton>登入</SubmitButton>
                }
                <RegisterText>還不是會員嗎?</RegisterText>
                <RegisterText>點擊<Link to={"/register"}>這裡</Link>以進行註冊</RegisterText>
            </RightArea>
        </Fragment>
    )
}