import React,{useState,useEffect} from 'react';
import {
    HeaderWrapper,
    Title,
    NavWrapper,
    NavItem,
    Icon,
    UserWrapper,
    UserName,
    ButtonLogout,
    AlertWrapper,
    LanWrapper,
    AlertItem,
    AlertContent
} from "./style";
import icon from "../static/icon.svg"
import 'antd/dist/antd.css';
import {useSelector,useDispatch} from "react-redux";
import * as actionCreators from "./store/actionCreators";
import { useTranslation } from 'react-i18next';
import {logout,logoutBackend} from "../login/store/actionCreators";
import {Link} from "react-router-dom";

export default function Header(){
    const { t, i18n } = useTranslation();
    const currentUser = useSelector(state => state.login.user);
    const [showUser,setShowUser] = useState(false);
    const [showDash,setShowDash] = useState(false);
    const [showLan,setShowLan] = useState(false);
    const dispatch = useDispatch();
    const [winWidth,setWinwidth] = useState(window.innerWidth);
    const show = useSelector(state => state.header.show);
    const lang = useSelector(state => state.header.lang);
    useEffect(()=>{
        window.addEventListener('resize', ()=>{setWinwidth(window.innerWidth)});
        document.addEventListener('click',()=>{HandleClick()});
        i18n.changeLanguage(lang);
    },[])

    function HandleClick(){
        setShowLan(false);
        setShowDash(false);
        setShowUser(false);
    }

    return(
        <div>
            <HeaderWrapper>
                <Icon className="iconfontToggle" onClick={()=>{dispatch(actionCreators.changeShow(!show))}}>&#xe770;</Icon>
                <img src={icon} />
                <Title>{t("title")}</Title>
                <NavWrapper>
                    <NavItem className="circle" onClick={(e)=>{
                            if(showUser|showLan|showDash){
                                HandleClick();
                            }
                        e.stopPropagation();
                        setShowUser(!showUser)}}>{currentUser[0]}
                        <UserWrapper style={{display:showUser?"":"none"}} onClick={(e)=>{e.stopPropagation()}}>
                            <UserName>{currentUser}</UserName>
                            <Link to={"/login"}>
                                <ButtonLogout onClick={()=>{
                                dispatch(logout());
                                dispatch(logoutBackend());
                                }}>登出</ButtonLogout>
                            </Link>
                        </UserWrapper>
                    </NavItem>
                    <NavItem
                        onClick={(e)=>{
                            if(showUser|showLan|showDash){
                                HandleClick();
                            }
                            e.stopPropagation();
                            setShowDash(!showDash)}
                        }>
                        <span className="iconfont">&#xe617;</span>
                        <AlertWrapper winWidth={winWidth} style={{display:showDash?"":"none"}} onClick={(e)=>{e.stopPropagation()}}>

                            <AlertItem className="title"><span style={{float:"left",fontSize:20}}>Today</span> <span style={{float:"right",fontSize:14,color:"#00ADEF"}}>clear all </span> </AlertItem>
                            <AlertItem>
                                <span className="iconfont alert">&#xe630;</span>
                                <AlertContent>資料數據-到期</AlertContent>
                                <AlertContent>FA淨重 - xx產線 001</AlertContent>
                                <AlertContent style={{color:"#727171"}}>12 minutes ago</AlertContent>
                            </AlertItem>
                            <AlertItem>
                                <span className="iconfont alert">&#xe630;</span>
                                <AlertContent>資料數據-到期</AlertContent>
                                <AlertContent>FA淨重 - xx產線 001</AlertContent>
                                <AlertContent style={{color:"#727171"}}>12 minutes ago</AlertContent>
                            </AlertItem>
                            <AlertItem>
                                <span className="iconfont alert">&#xe630;</span>
                                <AlertContent>資料數據-到期</AlertContent>
                                <AlertContent>FA淨重 - xx產線 001</AlertContent>
                                <AlertContent style={{color:"#727171"}}>12 minutes ago</AlertContent>
                            </AlertItem>
                        </AlertWrapper>
                    </NavItem>

                    <NavItem
                        onClick={(e)=>{
                            if(showUser|showLan|showDash){
                                HandleClick();
                            }
                            e.stopPropagation();
                            setShowLan(!showLan)}
                        }>
                        {lang==="taiwanise"?"繁":"简"}
                        <LanWrapper winWidth={winWidth} style={{display:showLan?"":"none"}} onClick={(e)=>{e.stopPropagation()}}>
                            <div className={lang==="taiwanise"?"select":""}
                                 onClick={(e)=>{
                                     i18n.changeLanguage("taiwanise");
                                     dispatch(actionCreators.changeLang("taiwanise"));
                                 }}
                                >{t("lang.taiwanise")}</div>
                            <div className={lang==="china"?"select":""}
                                onClick={()=>{
                                i18n.changeLanguage("china");
                                dispatch(actionCreators.changeLang("china"));
                            }}>{t("lang.china")}</div>
                        </LanWrapper>
                    </NavItem>
                </NavWrapper>

            </HeaderWrapper>
        </div>
    )
}