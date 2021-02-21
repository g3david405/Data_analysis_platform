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
import {Input,Form,message} from "antd";
import * as actionCreators from "../store/actionCreators";
import {Link} from "react-router-dom";

export function Register(){
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [email,setEmail] = useState();
    const dispatch = useDispatch();
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
                    <LoginText> Register </LoginText>
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
                    <InputLogin>
                        <InputDes>信箱</InputDes>
                        <Input style={{width:240}}  value={email} onChange={(e)=>{
                            setEmail(e.target.value);
                        }}/>
                    </InputLogin>
                </FormWrapper>
                { username && password && email?
                    <SubmitButton className={"able"} onClick={()=>{
                        if(email.includes("@") && email.includes(".com")){
                            dispatch(actionCreators.register(username,password,email));
                        }
                        else{
                            message.error("信箱格式不正確")
                        }
                    }
                    }>註冊</SubmitButton>:
                    <SubmitButton>註冊</SubmitButton>
                }
                <div style={{height:30}}>按下<Link to={"/login"}>這裡</Link>以返回登入頁面</div>
            </RightArea>
        </Fragment>
    )
}