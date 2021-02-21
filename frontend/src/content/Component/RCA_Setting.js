import React, {Fragment,useState,useEffect} from 'react';
import * as actionCreators from '../store/actionCreators';
import moment from 'moment';
import {
    ContentInnerWrapper,
    ContentTitle,
    StepContent,
    StepWrapper,
    TopWrapper,
    SelectItem,
    Describe,
    InputList,
    ListItem, SubmitButton, GrayWrapper, RCALineDes,
} from "../style";
import {DatePicker,message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {useTranslation} from "react-i18next";

export function RCASettingContent(){
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const dataTime = useSelector(state => state.content.dataTime);
    const objectiveList = useSelector(state => state.content.objectiveList);
    const productList = useSelector(state => state.content.productList);
    const [product,setProduct] = useState();
    const [startDate,setStartDate] = useState(dataTime[0]);
    const [startHour,setStartHour] = useState(dataTime[1]);
    const [endDate,setEndDate] = useState(dataTime[2]);
    const [endHour,setEndHour] = useState(dataTime[3]);
    const [source,setSource] = useState();
    const dispatch = useDispatch();
    const disabledDate = current => {
    if (!startDate) {
      return false;
    }
    const start = moment('2020-01-01','YYYY-MM-DD');
    return current < moment(startDate) || current>moment(endDate);
  };
    useEffect(()=>{
        if(startDate && endDate){
            if(startDate > endDate){
                message.error("開始時間不能早於結束時間");
                setEndDate();
            }
            else if(startDate === endDate && startHour >= endHour)
            {
                message.error("開始時間不能早於結束時間");
                setEndDate();
            }
        }
    },[startDate,endDate])
    useEffect(()=>{
        if(startDate && endDate && startHour && endHour){
            if(startDate == endDate && startHour >= endHour){
                message.error("開始時間不能早於結束時間");
                setStartDate();
                setEndDate();
                setStartHour();
                setEndHour();
            }
            else if(startDate > dataTime[2] || endDate < dataTime[0]){
                message.error("選取時間未包含資料，請重新選取時間段");
                setStartDate();
                setEndDate();
                setStartHour();
                setEndHour();
            }
        }
    },[startHour,endHour,startDate,endDate])




    return(
        <Fragment>
            <GrayWrapper>
                <Link to={"/rca"}>
                    <span className="iconfont" style={{marginRight:10,color:"#727171",cursor:"pointer"}}>&#xe602;</span>
                </Link>
                <ContentTitle>{t("contentTitle.rca")}</ContentTitle>
                <RCALineDes className='first'>{t("RCASetting.dataTime")}{"  :  " + " " + dataTime[0] + " " + dataTime[1] + " ~ " + dataTime[2] + " " + dataTime[3]}</RCALineDes>
            </GrayWrapper>
            <TopWrapper>
                <StepWrapper>
                    <StepContent className='circle'>1</StepContent>
                    <StepContent className='word'>{t("RCAStep.upload")}</StepContent>
                    <StepContent className="line" />
                    <StepContent className='circle select'>2</StepContent>
                    <StepContent className='word select'>{t("RCAStep.objective")}</StepContent>
                    <StepContent className="line" />
                    <StepContent className='circle'>3</StepContent>
                    <StepContent className='word'>{t("RCAStep.model")}</StepContent>
                    <StepContent className="line" />
                    <StepContent className='circle'>4</StepContent>
                    <StepContent className='word'>{t("RCAStep.dashboard")}</StepContent>
                </StepWrapper>
            </TopWrapper>
            <ContentInnerWrapper>
                <SelectItem>
                    <Describe>{t("RCASetting.product")}</Describe>
                    <InputList onChange={(e)=>{
                        setProduct(e.target.value);
                    }}
                    value={product}>
                        <ListItem className='disable'  disabled selected>{t("RCASetting.productSelect")}</ListItem>
                        {productList.map((item,index)=>{
                            return(<ListItem key={index}>{item}</ListItem>)
                        })}
                    </InputList>
                </SelectItem>
                <SelectItem>
                    <Describe>{t("RCASetting.time")}</Describe>
                    <DatePicker
                        disabledDate = {disabledDate}
                        placeholder={t("RCASetting.timeSelect")} style={{color:"black",border:"1px solid rgb(118,118,118)",width:130}}
                        onChange={(e,d)=>{
                            setStartDate(d);
                        }}
                                value={startDate?moment(startDate,'YYYY-MM-DD'):""}
                    />
                    <InputList className={"Hour"} onChange={(e)=>{
                        setStartHour(e.target.value);
                    }}
                        value={startHour?startHour:"dis"}
                    >
                        <ListItem className='disable' value={"dis"} disabled selected>{t("RCASetting.startHour")}</ListItem>
                        <ListItem>00:00</ListItem>
                        <ListItem>01:00</ListItem>
                        <ListItem>02:00</ListItem>
                        <ListItem>03:00</ListItem>
                        <ListItem>04:00</ListItem>
                        <ListItem>05:00</ListItem>
                        <ListItem>06:00</ListItem>
                        <ListItem>07:00</ListItem>
                        <ListItem>08:00</ListItem>
                        <ListItem>09:00</ListItem>
                        <ListItem>10:00</ListItem>
                        <ListItem>11:00</ListItem>
                        <ListItem>12:00</ListItem>
                        <ListItem>13:00</ListItem>
                        <ListItem>14:00</ListItem>
                        <ListItem>15:00</ListItem>
                        <ListItem>16:00</ListItem>
                        <ListItem>17:00</ListItem>
                        <ListItem>18:00</ListItem>
                        <ListItem>19:00</ListItem>
                        <ListItem>20:00</ListItem>
                        <ListItem>21:00</ListItem>
                        <ListItem>22:00</ListItem>
                        <ListItem>23:00</ListItem>
                    </InputList>
                    <span style={{margin:"0px 2%"}}>至</span>
                    <DatePicker
                        disabledDate = {disabledDate}
                        placeholder={t("RCASetting.timeDateEnd")} style={{color:"black",border:"1px solid rgb(118,118,118)",width:130}}
                            onChange={(e,d)=>{
                                    setEndDate(d);
                            }}
                                value={endDate?moment(endDate,'YYYY-MM-DD'):""}
                    />
                    <InputList  className={"Hour"} onChange={(e)=>{
                        setEndHour(e.target.value);
                    }}
                               value={endHour?endHour:"dis"}
                    >
                        <ListItem className='disable'  value={"dis"} disabled selected>{t("RCASetting.endHour")}</ListItem>
                        <ListItem>00:00</ListItem>
                        <ListItem>01:00</ListItem>
                        <ListItem>02:00</ListItem>
                        <ListItem>03:00</ListItem>
                        <ListItem>04:00</ListItem>
                        <ListItem>05:00</ListItem>
                        <ListItem>06:00</ListItem>
                        <ListItem>07:00</ListItem>
                        <ListItem>08:00</ListItem>
                        <ListItem>09:00</ListItem>
                        <ListItem>10:00</ListItem>
                        <ListItem>11:00</ListItem>
                        <ListItem>12:00</ListItem>
                        <ListItem>13:00</ListItem>
                        <ListItem>14:00</ListItem>
                        <ListItem>15:00</ListItem>
                        <ListItem>16:00</ListItem>
                        <ListItem>17:00</ListItem>
                        <ListItem>18:00</ListItem>
                        <ListItem>19:00</ListItem>
                        <ListItem>20:00</ListItem>
                        <ListItem>21:00</ListItem>
                        <ListItem>22:00</ListItem>
                        <ListItem>23:00</ListItem>
                    </InputList>
                </SelectItem>
                <SelectItem>
                    <Describe>{t("RCASetting.source")}</Describe>
                    <InputList onChange={(e)=>{
                        setSource(e.target.value);
                    }}>
                        <ListItem className='disable'  disabled selected>{t("RCASetting.sourceSelect")}</ListItem>
                        {objectiveList.map((item,index)=>{
                            return (<ListItem key={index}>{item}</ListItem>)
                        })}

                    </InputList>
                </SelectItem>
                {source && startDate && startHour && endDate && endHour && product?
                        <SubmitButton
                            className={"able"}
                            onClick={()=>{
                                dispatch(actionCreators.changeRCASetting(product,startDate,startHour,endDate,endHour,"",source));
                                dispatch(actionCreators.backEndModeling(history));
                            }}
                        >{t("submit")}</SubmitButton>
                    :
                    <SubmitButton>{t("submit")}</SubmitButton>
                    }

            </ContentInnerWrapper>
        </Fragment>
    )
}