import * as actionTypes from './actionTypes';
import axios from "axios";
import {message} from "antd";
import {changeLoad} from "../../header/store/actionCreators";

export const changeRCASetting = (product,startDate,startHour,endDate,endHour,OC,source) => ({
    type:actionTypes.CHANGE_RCA_SETTING,
    product:product,
    startDate:startDate,
    startHour:startHour,
    endDate:endDate,
    endHour:endHour,
    source:source
})

export const changeVisualizationFeature = (feature) => ({
    type:actionTypes.CHANGE_VISUALIZATION_FEATURE,
    value:feature
})

export const changeFile = (file,detail) => ({
    type:actionTypes.CHANGE_FILE,
    detail:detail
})

export const sentFileToBackEnd = (file,history) => {
    return (dispatch,getState)=>{
        const form_data = new FormData();
        const state = getState();
        form_data.append('files',file);
        form_data.append('filename',file.name);
        dispatch(changeLoad(true));
        axios({
            method:'post',
            url:"/saveExcel",
            data:form_data
        }).then(res => {
            console.log(res.data.featureList);
            const action = {
                type:actionTypes.CHANGE_COLLECTION,
                value:res.data.collection,
                //OC:res.data.OC,
                dataTime:res.data.dataTime,
                dataFeatureList:res.data.featureList,
                objectiveList:res.data.objectiveList,
                productList : res.data.productList
            }
            dispatch(action);
            dispatch(changeLoad(false));
            history.push("/rca/set");
        }).catch(()=>{
            dispatch(changeLoad(false));
            message.error("上傳失敗");
        })
    }
}

export const backEndModeling = (history) => {
    return (dispatch,getState)=>{
        const state = getState();
        dispatch(changeLoad(true));
        axios({
            method:'post',
            url:"/Modeling",
            data: {
                "collection":state.content.collection,
                "source":state.content.source,
                "startDate":state.content.startDate,
                "startHour":state.content.startHour,
                "endDate":state.content.endDate,
                "endHour":state.content.endHour,
                "detail":state.content.detail,
                "product":state.content.product
            }
        }).then((res)=> {
            if (res.data.success === "400") {
                message.error("資料筆數不足，請重新選取時間區間");
                dispatch(changeLoad(false));
            } else if (res.data.success === "100") {
                console.log(res.data);
                const action = {
                    type: actionTypes.CHANGE_MODE_RESULT,
                    lenData:res.data.lenData,
                    confidence: res.data.confidence,
                    plotPredict: res.data.plotPredict,
                    featureImportance: res.data.featureImportance,
                    targetValue: res.data.targetValue,
                }
            dispatch(action);
            dispatch(changeLoad(false));
            history.push("/rca/model");
        }
        }).catch(()=>{
            dispatch(changeLoad(false));
            message.error("失敗");
        })
    }
}

export const getVisualizationPlot = (featureList,history) => {
    return (dispatch,getState)=>{
        const state = getState();
        dispatch(changeLoad(true));
            axios({
                method:"post",
                url:"/Dashboard",
                data: {
                    "featureList":featureList,
                    "collection":state.content.collection,
                    "source":state.content.source,
                    "startDate":state.content.startDate,
                    "startHour":state.content.startHour,
                    "endDate":state.content.endDate,
                    "endHour":state.content.endHour,
                    "product":state.content.product
                }
            }).then((res)=>{
                const action = {
                    type:actionTypes.CHANGE_DASHBOARD,
                    targetValue:res.data.targetValue,
                    featureValue:res.data.featureValue,
                    corrMatrix:res.data.corrMatrix,
                    featureList:res.data.featureList
                }
                console.log(res.data.featureValue);
                dispatch(action);
                dispatch(changeLoad(false));
                history.push("/rca/visualization");
            }).catch(()=>{
                dispatch(changeLoad(false));
                message.error("錯誤，請重新選取視覺化參數");
            })
    }
}

export const getEvent = (setEventTable) => {
    return (dispatch) => {
        axios({
                method:"get",
                url:"/GetEvent",
            }).then((res)=>{
                const tableData = res.data.result;
                const data = [];
                for(let i = 0;i < tableData.Confidence.length; i++){
                    const description = tableData.Description[i];
                    data.push({key:i+1,
                        Confidence:tableData.Confidence[i],
                        Collection:tableData.Collection[i],
                        DataLen:tableData.DataLen[i],
                        OC:tableData.OC[i],
                        Source:tableData.Source[i],
                        Description:tableData.Description[i] === "undefined"?"無說明":tableData.Description[i],
            })
                }
                setEventTable(data);
        }).catch(()=>{

            })

    }
}

export const getUserList = (setUserTable) => {
    return () => {
        axios({
            method:"get",
            url:"/userList"
        }).then((res)=>{
            let result = res.data.result
            for (let i = 0;i<result.length;i++){
                result[i] = {...result[i],key:i+1}
            }
            setUserTable(result);
        }).catch(()=>{
            message.error("失敗");
        })
    }
}

export const checkUserConfirm = () => {
    return (dispatch,getState)=>{
        const state = getState();
        axios({
            method:"post",
            url:"/checkConfirm",
            data:{
                username:state.login.user
            }
        }).then((res)=>{
            if (res.data.confirm){
                const action = {
                type:actionTypes.CHANGE_CONFIRM,
                confirm:res.data.confirm
            }
            dispatch(action);
            }
            else{
                message.error("使用者仍然未驗證");
            }

        }).catch(()=>{
            message.error("錯誤");
        })
    }
}

export const ImageClassification = (image,trueClass) => {
    return (dispatch,getState) => {
        dispatch(changeLoad(true));
        const state = getState();
        const form_data = new FormData();
        form_data.append('image',image);
        form_data.append("trueClass",trueClass);
        axios({
            method:"post",
            url:"/classification",
            data:form_data
        }).then((res)=>{
            const result = [...state.content.imageClassificationResult , {predict:res.data.class,correct:res.data.correct,true:trueClass}];
            const action = {
                type:actionTypes.CHANGE_IMAGE_RESULT,
                imageClassificationResult:result
            }
            dispatch(action);
            dispatch(changeLoad(false));
        }).catch(()=>{
            message.error("失敗");
            dispatch(changeLoad(false));
        })
    }
}

export const deleteUser = (selectUser)=> {
    return (dispatch,getState) => {
        dispatch(changeLoad(true));
        axios({
            method:"post",
            url:"/deleteUser",
            data: {
                selectedUser: selectUser
            }
        }).then(()=>{
            message.success("刪除成功");
            dispatch(changeLoad(false));
        }).catch(()=>{
            dispatch(changeLoad(false));
            message.error("失敗");
        })

    }
}

export const adminUser = (selectUser)=> {
    return (dispatch,getState) => {
        dispatch(changeLoad(true));
        axios({
            method:"post",
            url:"/adminUser",
            data: {
                selectedUser: selectUser
            }
        }).then(()=>{
            message.success("升級成功");
            dispatch(changeLoad(false));
        }).catch(()=>{
            dispatch(changeLoad(false));
            message.error("失敗");
        })

    }
}
