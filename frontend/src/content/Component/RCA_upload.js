import React, {Fragment, useState} from "react";
import {
    ContentInnerWrapper,
    ContentTitle,
    Describe,
    SelectItem,
    StepContent,
    StepWrapper,
    SubmitButton,
    TopWrapper
} from "../style";
import {Input} from "antd";
import * as actionCreators from "../store/actionCreators";
import {useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';
import {useTranslation} from "react-i18next";


export function RCAUploadContent(){
    const { t, i18n } = useTranslation();
    const [file,setFile] = useState();
    const [detail,setDetail] = useState();
    const {TextArea} = Input;
    const dispatch = useDispatch();
    const history = useHistory();
    return(
        <Fragment>
            <TopWrapper>
                <ContentTitle>{t("contentTitle.rca")}</ContentTitle>
                <StepWrapper>
                    <StepContent className='circle select'>1</StepContent>
                    <StepContent className='word select'>{t("RCAStep.upload")}</StepContent>
                    <StepContent className="line" />
                    <StepContent className='circle'>2</StepContent>
                    <StepContent className='word'>{t("RCAStep.objective")}</StepContent>
                    <StepContent className="line" />
                    <StepContent className='circle'>3</StepContent>
                    <StepContent className='word'>{t("RCAStep.model")}</StepContent>
                    <StepContent className="line" />
                    <StepContent className='circle'>4</StepContent>
                    <StepContent className='word'>{t("RCAStep.dashboard")}</StepContent>
                </StepWrapper>
            </TopWrapper>
            <ContentInnerWrapper>
                <SelectItem style={{height:60}}>
                    <Describe>{t("RCAUpload.dataUpload")}</Describe>
                    <label htmlFor="filePicker" style={{ position:"relative",top:-4,background:"#00adef",color:"rgb(255,255,255)", padding:"5px 10px", cursor:"pointer",height:32}}>
                        <span className="iconfontUpload" style={{marginRight:8}}>&#xe607;</span>{t("RCAUpload.upload")}
                    </label>
                    <span style={{marginLeft:18,position:"relative",top:-4}}>{file?file.name:""}</span>

                    <input type={'file'}
                           id={"filePicker"}
                           accept={".xls,.csv,.xlsx"}
                           style={{visibility:"hidden"}}
                           onChange={(e)=>{setFile(e.target.files[0])}} />
                </SelectItem>
                    <Describe>{t("RCAUpload.describe")}</Describe>
                    <TextArea placeholder={t("RCAUpload.describePlaceholder")} onChange={(e)=>{
                        setDetail(e.target.value);
                    }}
                    style={{width:"60%",height:100}}
                    value={detail}
                    />
                {file?
                    //<Link to="rca/set" style={{width:128}}>
                        <SubmitButton
                            className={"able"}
                            onClick={()=>{
                                dispatch(actionCreators.changeFile(file,detail));
                                dispatch(actionCreators.sentFileToBackEnd(file,history));
                            }}
                        >{t("submit")}</SubmitButton>
                    //</Link>
                    :
                    <SubmitButton>{t("submit")}</SubmitButton>
                    }
            </ContentInnerWrapper>
        </Fragment>
    )
}