import {fromJS} from 'immutable'
import * as actionTypes from "./actionTypes";

const  defaultState = {
    product:"",
    dataTime:[],
    startDate:"",
    startHour:"",
    endDate:"",
    endHour:"",
    objectiveList:[],
    dataFeatureList:[],
    productList:[],
    source:"",
    visualizationFeature:[],
    detail:"",
    lenData:"",
    confidence:"",
    plotPredict:{"predict":[],"true":[]},
    collection:"",
    featureImportance:[],
    targetValue:[],
    featureValue:[],
    featureList:[],
    corrMatrix:[],
    imageClassificationResult:[]
}

export const ContentReducer = (state = defaultState,action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case actionTypes.CHANGE_RCA_SETTING:
        {
            newState.product = action.product;
            newState.startDate = action.startDate;
            newState.startHour = action.startHour;
            newState.endDate = action.endDate;
            newState.endHour = action.endHour;
            newState.source = action.source;
            return newState;
        }
        case  actionTypes.CHANGE_VISUALIZATION_FEATURE:
        {
            newState.visualizationFeature = action.value;
            return newState;
        }
        case actionTypes.CHANGE_FILE:
        {
            newState.detail = action.detail;
            return newState;
        }
        case actionTypes.CHANGE_COLLECTION:
        {
            newState.collection = action.value;
            //newState.OC = action.OC;
            newState.dataTime = action.dataTime;
            newState.objectiveList = action.objectiveList;
            newState.dataFeatureList = action.dataFeatureList;
            newState.productList = action.productList;
            return newState;
        }
        case actionTypes.CHANGE_MODE_RESULT:
        {
            newState.lenData = action.lenData;
            newState.confidence = action.confidence;
            newState.plotPredict = action.plotPredict;
            newState.featureImportance = action.featureImportance;
            newState.targetValue = action.targetValue;
            return newState;
        }
        case actionTypes.CHANGE_DASHBOARD:
        {
            //newState.featureValue = action.featureValue;
            newState.featureValue = action.featureValue;
            newState.featureList = action.featureList;
            newState.targetValue = action.targetValue;
            newState.corrMatrix = action.corrMatrix;
            return newState;
        }
        case actionTypes.CHANGE_IMAGE_RESULT:
        {
            newState.imageClassificationResult = action.imageClassificationResult;
            return newState;
        }
        default:
            return state;
    }
}