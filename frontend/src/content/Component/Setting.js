import React, {useEffect,Fragment} from 'react';
import {ContentInnerWrapper, ContentTitle} from "../style";
import axios from 'axios';

export function SettingContent(){

    useEffect(()=>{

      axios.get("/test").then(res => {
        alert(res.data.result);
      })


        //window.location = "/rca";
    },[])
    return(
        <ContentInnerWrapper>
            <ContentTitle>Setting內容</ContentTitle>
        </ContentInnerWrapper>
    )
}