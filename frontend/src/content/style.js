import styled from "styled-components";

export const ContentTitle = styled.span`
    font-size:24px;
    font-family:"Roboto", "Helvetica", "Arial", sans-serif;
    font-weight:bold;
    line-height:32px;
`
export const ConfirmText = styled.div`
    text-align:center;
    font-size:28px;
    font-weight:bold;
    margin-top:24px;
`

export const ConfirmButton = styled.span`
    color:blue;
    cursor:pointer;
`

export const SelectItem = styled.div`
    height:32px;
    margin-top:28px;
    margin-bottom:28px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height:32px;
    letter-spacing: 0.00938em;
    &.calculate{
        padding-left:20px;
    }
`

export const InputList = styled.select.attrs(props => ({
    disabled:props.disable
}))`
    width:230px;
    height:32px;
    font-size:12px;
    &.SPC{
        width:180px;
    }
    &.Hour{
        width:80px;
        margin-left:2%;
    }
`

export const ListItem = styled.option.attrs(props=>({
    value:props.value
}))`
    font-size:12px;
    height:32px;
    padding-top:30px;
    padding-bottom:30px;
    text-indent:15px; 
    line-height:28px;
    &.disable{
        color:#B5B7BC;
    }
    &.disableTitle{
        font-size:20px;
        font-weight:bold;
    }
`

export const Describe = styled.div`
    float:left;
    width:90px;
    height:24px;
    &.SPC{
        width:50px;
    }
`

export const SubmitWrapper = styled.div`
    padding-top:40px;
    padding-bottom:40px;
    width:100%;
    background:rgb(250, 250, 250);
`

export const SubmitButton = styled.div`
    width:128px;
    height:36px;
    text-align:center;
    line-height:36px;
    background-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.26);
    margin-top:18px;
    margin-bottom:24px;
    &.able{
        background:#00adef;
        color: rgb(255, 255, 255);
        cursor:pointer;
    }
`

export const ContentWrapper = styled.div`
    min-height:100vh;
    width:100%;
    float:left;
`

export const ContentInnerWrapper = styled.div`
    padding:20px 24px;
    height:auto;
    .Tabs{
        width:100%;
        text-align:center;
        height:auto;
    }
    .ant-tabs-tab{
        margin:0 80px 0 80px;
    }
`



export const TopWrapper = styled.div`
    width:100%;
    height:auto;
    padding:24px 20px;
    padding-bottom:10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
    &.image{
        background:grey;
    }
`

export const RightItem = styled.div`
    float:right;
    line-height:32px;
    font-size:14px;
    padding-bottom:7px;
    margin-right:4px;
`

export const Wrapper = styled.div`
    margin-top:24px;
    height:auto;
    line-height:32px;
    
`
export const TopWord = styled.span`
    color:rgb(0, 173, 239);
    font-size:14px;
`


export const LineRate = styled.div`
    margin: 12px 0px 0px 8px;
    float:left;
    border: 1px solid rgb(239, 239, 239);
    background-color: rgb(250, 250, 250);
    width:120px;
    text-align:center;
    line-height:35px;
    height:70px;  
`


export const PlotlyDiv = styled.div`
    float:left;
    width:65%;
    height:500px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px;
    background-size:contain;
    .plotly{
        width:100%;
        displayModeBar: false;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px;
        background-size:contain;
    }
`

export const TableTitle = styled.div`
    width:100%;
    height:40px;
    background:rgb(239, 239, 239);
    line-height:40px;
    padding-left:20px;
    color:rgb(114, 113, 113);
`

export const SubTable = styled.div`
    width:50%;
    padding-left:20px;
    height:34px;
    line-height:34px;
    float:left;
    font-size:14px;
    &.top{
    border: 1px solid rgb(239, 239, 239);
    }
`


export const ButtonSave = styled.div`
    background:rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.26);
    width:86px;
    height:36px;
    float:right;
    line-height:36px;
    margin-top:10px;
    text-align:center;
    &.able{
        background:#00adef;
        color:rgb(255, 255, 255);
        cursor:pointer;
    }
`

export const SettingLimitInput = styled.input.attrs(props => ({
    type:"number"
}))`
    float:left;
    width:260px;
    height:26px;
    margin-top:17px;
`

export const PlotTableWrapper = styled.div`
    width:100%;
    height:auto;
    overflow:hidden;
`

export const TableWrapper = styled.div`
    width:40%;
    height:500px;
    float:left;
    border-left:0.5px solid rgba(0, 0, 0, 0.16);
    border-bottom:0.5px solid rgba(0, 0, 0, 0.16);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px;
`

export const PlotWrapper = styled.div`
    width:57%;
    height:auto;
    margin-left:3%;
    float:left;
    border:0.5px solid rgba(0, 0, 0, 0.16);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px;
`

export const PlotContent = styled.div`
    height:210px;
    width:100%;
    .plotly{
        width:100%;
        height:100%;
        displayModeBar: false;
        background-size:contain;
    }
`

export const BottomTableWrapper = styled.div`
    width:100%;
    height:auto;
    margin-top:20px;
`
export const StepWrapper = styled.div`
    height:auto;
    line-height:90px;
    overflow:hidden;
`

export const StepContent = styled.div`
    display:inline;
    float:left;
    margin-right:1%;
    margin-left:1%;
    &.circle{
        background:#BDBDBD;
        color:#FAFAFA;
        border-radius: 50%;
        text-align:center;
        height:36px;
        width:36px;
        line-height:36px;
        margin-top:27px;
        &.select{
            background:#00adef;
        }
    }
    &.word{
        color:#BDBDBD;
        width:auto;
        margin-left:0px;
        &.select{
            color:black;
            font-weight:bold;
        }
    }
    &.line{
        width:10%;
        border-top:0.5px solid rgba(0, 0, 0, 0.25);
        margin-top:45px;
    }
`

export const GrayWrapper = styled.div`
    width:100%;
    height:auto;
    background:#EFEFEF;
    padding:24px 20px;
    padding-bottom:16px;
`

export const RCALineDes = styled.div`
    padding-left:36px;
    font-size:16px;
    height:36px;
    line-height:36px;
    &.first{
        margin-top:20px;
    }
    &.down{
        height:36px;
        line-height:36px;
        font-size:18px;
    }
`

export const ConfidenceWrapper = styled.div`
    width:35%;
    height:auto;
    float:left;
    border:0.5px solid rgba(0, 0, 0, 0.16);
`

export const ResultPlotWrapper = styled.div`
    width:60%;
    margin-left:5%;
    height:auto;
    float:left;
    border:0.5px solid rgba(0, 0, 0, 0.16);
    text-align:center;
    .plotly{
        width:95%;
        height:320px;
    }
    .title{
        text-align:left;
    }
`

export const ConfidencePlot = styled.div`
    text-align:center;
    padding:6px 18px 20px 18px;
    width:100%;
    height:327px;
    line-height:200px;
    border:0.5px solid rgba(0, 0, 0, 0.16);
    .reach .ant-progress-text{
        font-size:24px;
        color:#85DF71;
        
    }
    .noReach .ant-progress-text{
        font-size:24px;
        color:#F0C13A;
    }
`
export const ConfidenceDes = styled.div`
    height:32px;
    line-height:32px;
    text-align:left;
    font-size:14px;
`

export const TinyCircle = styled.div`
    float:left;
    width:8px;
    height:8px;
    border-radius:50%;
    margin-top:11px;
    margin-right:10px;
    &.green{
        background:#85DF71;
    }
    &.yellow{
        background:#F0C13A;
    }
`
export const VisualizationButton = styled.span`
    float:right;
    width:auto;
    text-align:center;
    padding:0 12px;
    height:24px;
    margin-top:8px;
    margin-right:22px;
    cursor:pointer;
    line-height:24px;
    background:#00adef;
    color: rgb(255, 255, 255);
    font-size:11px;
    &.dis{
        background-color: rgba(0, 0, 0, 0.12);
        color: rgba(0, 0, 0, 0.26);   
        cursor:auto;
    }
`

export const VisualPlotWrapper = styled.div`
    float:right;
    width:100%;
    height:300px;
    border:0.5px solid rgba(0, 0, 0, 0.16);
    margin-bottom:16px;
    margin-top:12px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px;
    .heatmap{
        height:100%;
        width:100%;
    }
`

export const EachPlot = styled.div`
    width:33.3%;
    height:260px;
    float:left;
    .plotly{
        width:95%;
        height:95%;
    }
`

export const FeatureSelectWrapper = styled.div`
    float:right;
    height:auto;
    width:180px;
`

export const FeatureSelect = styled.div.attrs(props => ({

}))`
    height:28px;
    width:100%;
    line-height:28px;
    text-align:left;
    border:0.5px solid rgba(0, 0, 0, 0.16);
    margin:0 0;
    cursor:pointer;
    padding-left:14px;
    padding-right:12px;
`
export const FeatureList = styled.div`
    z-index:1005;
    height:auto;
    width:180px;
    border:0.5px solid rgba(0, 0, 0, 0.16);
    border-top:none;
    position:absolute;
    background:rgb(255,255,255);
`
export const FeatureItem = styled.div`
    width:100%;
    height:32px;
    line-height:32px;
    text-align:left;
`




