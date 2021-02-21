import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {LeftNav,LeftNavItem} from "./style";
import {Link,useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

export function LeftNavMain(){
    const show = useSelector(state => state.header.show);
    const collection = useSelector(state => state.content.collection);
    const location = useLocation();
    const { t, i18n } = useTranslation();
    // <Link to='/event' style={{color:'rgb(114, 113, 113)'}}><LeftNavItem location={location.pathname} route='/event'><span className="iconfontLeft">&#xe7c4;</span> {t("leftNav.event")}</LeftNavItem></Link>

    return(
        <Fragment>
        {show?
            <LeftNav>
                <Link to='/spc' style={{color:'rgb(114, 113, 113)'}}><LeftNavItem location={location.pathname} route='/spc'><span className="iconfontLeft">&#xe6b5;</span> {t("leftNav.spc")}</LeftNavItem></Link>
                <Link to={collection?'/rca/set':'/rca'} style={{color:'rgb(114, 113, 113)'}}><LeftNavItem location={location.pathname} route='/rca'><span className="iconfontLeft">&#xe649;</span> {t("leftNav.rca")}</LeftNavItem></Link>
                <Link to='/image' style={{color:'rgb(114, 113, 113)'}}><LeftNavItem location={location.pathname} route='/image'><span className="iconfontLeft">&#xe618;</span> {t("leftNav.image")}</LeftNavItem></Link>
                <Link to='/user' style={{color:'rgb(114, 113, 113)'}}><LeftNavItem location={location.pathname} route='/user'><span className="iconfontLeft">&#xe603;</span> {t("leftNav.user")}</LeftNavItem></Link>
            </LeftNav>:
                <Fragment></Fragment>
            }
        </Fragment>
    )
}