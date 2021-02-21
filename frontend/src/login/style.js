import styled from "styled-components";
import img from '../static/login_background.jfif';

export const LeftArea = styled.div`
    text-align:center;
    line-height:80vh;
    height:100vh;
    float:left;
    width:65%;
    background-image:url(${img});
    background-size: cover;
`

export const RightArea = styled.div`
    height:100vh;
    text-align:center;
    line-height:30vh;
    float:left;
    width:35%;
`

export const LoginDescribe = styled.span`
    font-size: 24px;
    font-weight:500;
    height:20px;
`

export const FormWrapper = styled.div`
    text-align:center;
    height:auto;
`

export const LoginText = styled.div`
    height:auto;
    font-size: 30px;
    color: rgb(114, 114, 113);
`

export const InputLogin = styled.div`
    width:auto;
    height:50px;
    line-height:0;
`

export const InputDes = styled.span`
    margin-right:20px;
    line-height:0;
`

export const SubmitButton = styled.div`
    width:128px;
    height:36px;
    line-height:36px;
    background-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.26);
    margin:auto;
    margin-top:30px;
    &.able{
        background:#00adef;
        color: rgb(255, 255, 255);
        cursor:pointer;
    }
`

export const RegisterText = styled.div`
    height:30px;
`