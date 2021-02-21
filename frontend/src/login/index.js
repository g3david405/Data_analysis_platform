import React, {Fragment, useState} from "react";
import {Route} from "react-router-dom";
import {Login} from "./Component/login";
import {Register} from "./Component/register";

export function LoginAndRegister(){
    return(
        <Fragment>
           <Route path='/login' exact component={Login}/>
           <Route path='/register' exact component={Register}/>
        </Fragment>
    )
}