import React, {Fragment, useEffect, useState} from "react";
import {
    ContentInnerWrapper,
    ContentTitle,
    Describe,
    InputList,
    ListItem,
    SelectItem,
    SubmitButton, TableTitle,
    TopWrapper
} from "../style";
import {useTranslation} from "react-i18next";
import dog from "../../static/dog.jfif"
import cat from "../../static/cat.jfif"
import * as actionCreators from "../store/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {Table} from "antd";

export function ImageClassficationContent(){
    const { t, i18n } = useTranslation();
    const [file,setFile] = useState();
    const [trueClass,setTrueClass] = useState();
    const [tableData,setTableData] = useState([]);
    const dispatch = useDispatch();
    const result = useSelector(state => state.content.imageClassificationResult);
    const columns = [
      {
        title: t("ImageClassification.imageTrueClass"),
        dataIndex: 'true',
      },
      {
        title: t("ImageClassification.modelPredict"),
        dataIndex: 'predict',
      },
      {
        title: t("ImageClassification.correct"),
        dataIndex: 'correct_word',
        render(text,record){
            return{
                props: {
                    style: {color: text === "正確" ? "green" : "red"}
                },
                children: <div>{text}</div>
            }
        }
      }
    ];
    useEffect(()=>{
        const data = []
        for(let i = 0;i < result.length;i++){
            if (result[i].correct === true){
                result[i] = {...result[i],"correct_word":"正確"}
            }
            else{
                result[i] = {...result[i],"correct_word":"錯誤"}
            }
            data.push(result[i]);
        }
        setTableData(data);
    },[result])
    return(
        <Fragment>
            <TopWrapper>
                <ContentTitle>{t("contentTitle.image")}</ContentTitle>
                <div style={{textAlign:"center",marginTop:30}}>
                    <img src={dog} style={{height:300,width:300,marginRight:80}}/>
                    <span style={{position:"relative",top:-150,fontSize:32}}>vs</span>
                    <img src={cat} style={{height:300,width:300,marginLeft:80}}/>
                </div>
            </TopWrapper>
            <ContentInnerWrapper>
                <SelectItem style={{height:40}}>
                        <Describe>{t("ImageClassification.imageUpload")}</Describe>
                        <label htmlFor="filePicker" style={{ position:"relative",top:-3,background:"#00adef",color:"rgb(255,255,255)", padding:"5px 10px", cursor:"pointer",height:32}}>
                            <span className="iconfontUpload" style={{marginRight:8}}>&#xe607;</span>{t("ImageClassification.imageUploadClick")}
                        </label>
                        <span style={{marginLeft:18,position:"relative",top:-5}}>{file?file.name:""}</span>

                        <input type={'file'}
                               id={"filePicker"}
                               accept={".jpg,.png,.jfif"}
                               style={{visibility:"hidden"}}
                               onChange={(e)=>{setFile(e.target.files[0])}} />
                    </SelectItem>
                <SelectItem style={{height:40}}>
                    <Describe>{t("ImageClassification.imageTrueClass")}</Describe>
                    <InputList onChange={(e)=>{
                        setTrueClass(e.target.value);
                    }}>
                        <ListItem className='disable'  disabled selected>{t("ImageClassification.imageTrueClassSelect")}</ListItem>
                        <ListItem value={"狗狗"}>{t("ImageClassification.dog")}</ListItem>
                        <ListItem value={"貓貓"}>{t("ImageClassification.cat")}</ListItem>
                        <ListItem value={"都不是"}>{t("ImageClassification.neither")}</ListItem>
                    </InputList>
                </SelectItem>
                {file && trueClass?
                    //<Link to="rca/set" style={{width:128}}>
                        <SubmitButton
                            className={"able"}
                            onClick={()=>{
                                dispatch(actionCreators.ImageClassification(file,trueClass));
                            }}
                        >{t("submit")}</SubmitButton>
                    //</Link>
                    :
                    <SubmitButton>{t("submit")}</SubmitButton>
                    }
                {
                    result.length > 0 ?
                        <Fragment>
                            <TableTitle>{t("ImageClassification.result")}</TableTitle>
                            <Table columns = {columns} dataSource={tableData} bordered />
                        </Fragment>:
                        <Fragment></Fragment>
                }
            </ContentInnerWrapper>
        </Fragment>
    )
}