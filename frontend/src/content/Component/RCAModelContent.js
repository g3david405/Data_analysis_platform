import React, {Fragment,useState,useEffect} from 'react'
import {
    BottomTableWrapper,
    ConfidenceDes,
    ConfidencePlot,
    ConfidenceWrapper,
    ContentInnerWrapper,
    ContentTitle,
    GrayWrapper, PlotTableWrapper,
    RCALineDes, ResultPlotWrapper,
    StepContent,
    StepWrapper,
    TableTitle,
    TinyCircle,
    TopWrapper,
    VisualizationButton,
} from "../style";
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Progress, Table} from "antd";
import Plot from "react-plotly.js";
import * as actionCreators from '../store/actionCreators'
import {useTranslation} from "react-i18next";

export function RCAModelContent(){
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const product = useSelector(state => state.content.product);
    const startDate = useSelector(state => state.content.startDate);
    const startHour = useSelector(state => state.content.startHour);
    const endDate = useSelector(state => state.content.endDate);
    const endHour = useSelector(state => state.content.endHour);
    const source = useSelector(state => state.content.source);
    const confidence = useSelector(state => state.content.confidence);
    const plotPredict = useSelector(state => state.content.plotPredict);
    const featureImportance = useSelector(state => state.content.featureImportance);
    const OC = useSelector(state => state.content.OC);
    const lenData = useSelector(state => state.content.lenData);
    const dispatch = useDispatch();
    const [tableData,setTableData] = useState([]);
    const [selectCol,setSelectCol] = useState(0);
    const [featureList,setFeatureList] = useState([]);
    const columns = [
      {
        title: t("RCAModel.parameter"),
        dataIndex: 'feature',
        sorter: (a, b) => a.feature.localeCompare(b.feature)
      },
      {
        title: t("RCAModel.featureImportance"),
        dataIndex: 'importance',
          sorter: (a, b) => a.importance- b.importance,
      },
      {
        title: t("RCAModel.max"),
        dataIndex: 'max',
      },
      {
        title: t("RCAModel.min"),
        dataIndex: 'min',
      },
      {
        title: t("RCAModel.avg"),
        dataIndex: 'average',
      },
        {
        title: t("RCAModel.std"),
        dataIndex: 'std',
      }
    ];

    useEffect(()=>{
        const data = []
        for(let i = 0;i < featureImportance.length;i++){
            data.push({key:i+1,
                feature:featureImportance[i].variable,
                importance:featureImportance[i].featureImportance,
                max:featureImportance[i].max,
                min:featureImportance[i].min,
                average:featureImportance[i].avg,
                std:featureImportance[i].std,
            })
        }
        setTableData(data);
    },[featureImportance])


    const rowSelection = {onChange:(selectedRowKeys, selectedRows) =>{
            const feature = [];
            for(let i=0; i < selectedRows.length;i++){
                feature.push(selectedRows[i].feature);
            }
            setSelectCol(selectedRows.length);
            setFeatureList(feature);
        },onSelect:(record, selected, selectedRows) => {

        }
    }

    return(
        <Fragment>
            <GrayWrapper>
                <Link to={"/rca/set"}>
                    <span className="iconfont" style={{marginRight:10,color:"#727171",cursor:"pointer"}}>&#xe602;</span>
                </Link>
                <ContentTitle>{t("contentTitle.rca")}</ContentTitle>
                <RCALineDes className='first'>{t("RCAModel.product")} : {product}</RCALineDes>
                <RCALineDes>{t("RCAModel.timeAnalysis")} : {startDate + " " + startHour + " ~ " + endDate + " " + endHour}</RCALineDes>
                <RCALineDes>{t("RCAModel.dataLen")} : {lenData}</RCALineDes>

            </GrayWrapper>
            <TopWrapper>
                <StepWrapper>
                    <StepContent className='circle'>1</StepContent>
                    <StepContent className='word'>{t("RCAStep.upload")}</StepContent>
                    <StepContent className="line" />
                    <StepContent className='circle'>2</StepContent>
                    <StepContent className='word'>{t("RCAStep.objective")}</StepContent>
                    <StepContent className="line" />
                    <StepContent className='circle select'>3</StepContent>
                    <StepContent className='word select'>{t("RCAStep.model")}</StepContent>
                    <StepContent className="line" />
                    <StepContent className='circle'>4</StepContent>
                    <StepContent className='word'>{t("RCAStep.dashboard")}</StepContent>
                </StepWrapper>
            </TopWrapper>
            <ContentInnerWrapper>
                <RCALineDes className='down'>{t("RCAModel.objectiveSource")} : {source}</RCALineDes>
                <RCALineDes className='down' style={{marginTop:8,marginBottom:16}}>{t("RCAModel.describe")} : 信心度為{confidence}  {confidence>0.7?"已達標準值":"未達標準值"}</RCALineDes>
                <PlotTableWrapper>
                    <ConfidenceWrapper>
                        <TableTitle>{t("RCAModel.confidence")}</TableTitle>
                        <ConfidencePlot>
                            <Progress className={confidence>0.7?"reach":"noReach"} type="circle" format={percent => parseInt(percent)/100} percent={confidence*100} width={140} style={{marginBottom:14,width:'100%',paddingBottom:24,borderBottom:"0.5px solid rgba(0, 0, 0, 0.16)"}} strokeColor={confidence>0.7?"#85DF71":"#F0C13A"}>
                            </Progress>
                            <ConfidenceDes>{t("RCAModel.confidenceStandard")} :</ConfidenceDes>
                            <ConfidenceDes><TinyCircle className={"green"}/><span>{t("RCAModel.enough")}</span><span style={{float:"right"}}> > 0.7以上</span></ConfidenceDes>
                            <ConfidenceDes><TinyCircle className={"yellow"}/><span>{t("RCAModel.lack")}</span><span style={{float:"right"}}> {"<= 0.7以下"}</span></ConfidenceDes>
                        </ConfidencePlot>
                    </ConfidenceWrapper>
                    <ResultPlotWrapper>
                        <TableTitle className={'title'}>{t("RCAModel.predictPlot")}</TableTitle>
                        <Plot
                       data={[
                          {
                            x: Array.from(Array(plotPredict.predict.length).keys()),
                            y: plotPredict.predict,
                            name: 'Predict',
                            type: 'scatter',
                            mode: 'lines+points',
                            line:{width: 1}
                          },
                           {
                               x:Array.from(Array(plotPredict.true.length).keys()),
                               y:plotPredict.true,
                            name: 'True',
                            type: 'scatter',
                            mode: 'lines+points',
                            line:{width: 1}
                           }
                        ]}
                       layout={{legend: {orientation: "h",yanchor:"bottom",y:-0.4,xanchor:"right",x:0.65},
                           margin:{l:55,r:10,b:40,t:40,pad:6},
                           xaxis:{title:{text:t("RCAModel.dataNumber"),standoff:15 },zeroline:false,linewidth: 1,linecolor:"rgba(0, 0, 0, 0.5)"},
                           yaxis:{title:{text:t("RCAModel.value"),standoff: 20},zeroline:false,linewidth:1,linecolor:"rgba(0, 0, 0, 0.5)"},
                           font:{size:10}}}
                       className="plotly"
                       config={{displayModeBar: false}}
                        />
                    </ResultPlotWrapper>
                </PlotTableWrapper>
                <BottomTableWrapper>
                    <TableTitle>{t("RCAModel.importance")}<span style={{color:"#00ADEF"}}> {selectCol} item selected</span>
                        {selectCol>0
                            ?
                                <VisualizationButton onClick={()=>{
                                    window.scrollTo(0,0);
                                    dispatch(actionCreators.getVisualizationPlot(featureList,history));
                                    dispatch(actionCreators.changeVisualizationFeature(featureList));
                            }
                            }>{t("RCAModel.visualization")}</VisualizationButton>
                            :<VisualizationButton className={"dis"}>{t("RCAModel.visualization")}</VisualizationButton>
                        }</TableTitle>
                        <Table columns = {columns} rowSelection={rowSelection} dataSource={tableData} bordered>
                        </Table>
                </BottomTableWrapper>
            </ContentInnerWrapper>
        </Fragment>
    )
}