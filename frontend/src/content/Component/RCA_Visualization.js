import React, {Fragment,useState,useEffect} from "react";
import {
    ContentInnerWrapper,
    ContentTitle, EachPlot, FeatureItem, FeatureList, FeatureSelect, FeatureSelectWrapper,
    GrayWrapper,
    RCALineDes,
    StepContent,
    StepWrapper, TableTitle,
    TopWrapper, VisualPlotWrapper
} from "../style";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Tabs, Select, Checkbox} from "antd";
import Plot from "react-plotly.js";
import {useTranslation} from "react-i18next";

export function RCAVisualizationContent(){
    const { t, i18n } = useTranslation();
    const product = useSelector(state => state.content.product);
    const startDate = useSelector(state => state.content.startDate);
    const startHour = useSelector(state => state.content.startHour);
    const endDate = useSelector(state => state.content.endDate);
    const endHour = useSelector(state => state.content.endHour);
    const visualizationFeature = useSelector(state => state.content.featureList);
    const targetValue = useSelector(state => state.content.targetValue);
    const featureValue = useSelector(state => state.content.featureValue);
    const corrMatrix = useSelector(state => state.content.corrMatrix);
    const lenData = useSelector(state => state.content.lenData);
    const [showFeatureList,setShowFeatureList] = useState(false);
    const [plotFeature,setPlotFeature] = useState([]);
    const [dropDown,setDropDown] = useState([]);
    const {TabPane} = Tabs;
    const {Option} = Select;

    useEffect(()=>{
        document.addEventListener('click',()=>{HandleClick()});
        return(document.removeEventListener('click',()=>{HandleClick()}));
    },[])

    useEffect(()=>{
        const temp = [...visualizationFeature];
        temp.splice(visualizationFeature.length-1,1);
        setDropDown(temp);
        setPlotFeature(temp);
    },[visualizationFeature])
    function HandleClick(){
        setShowFeatureList(false);
    }
    function Delete(arr,item){
        const temp = [...arr]
        const index = temp.indexOf(item);
        temp.splice(index,1);
        return temp;
    }
    return(
        <Fragment>
            <GrayWrapper>
                <Link to={"/rca/model"}>
                    <span className="iconfont" style={{marginRight:10,color:"#727171",cursor:"pointer"}}>&#xe602;</span>
                </Link>
                <ContentTitle>{t("contentTitle.rca")}</ContentTitle>
                <RCALineDes className='first'>{t("RCAVisualization.product")} : {product}</RCALineDes>
                <RCALineDes>{t("RCAVisualization.timeAnalysis")} : {startDate + " " + startHour + " ~ " + endDate + " " + endHour}</RCALineDes>
                <RCALineDes>{t("RCAVisualization.dataLen")} : {lenData}</RCALineDes>
            </GrayWrapper>
            <TopWrapper>
                <StepWrapper>
                    <StepContent className='circle'>1</StepContent>
                    <StepContent className='word'>{t("RCAStep.upload")}</StepContent>
                    <StepContent className="line" />
                    <StepContent className='circle'>2</StepContent>
                    <StepContent className='word'>{t("RCAStep.objective")}</StepContent>
                    <StepContent className="line" />
                    <StepContent className='circle'>3</StepContent>
                    <StepContent className='word'>{t("RCAStep.model")}</StepContent>
                    <StepContent className="line" />
                    <StepContent className='circle select'>4</StepContent>
                    <StepContent className='word select'>{t("RCAStep.dashboard")}</StepContent>
                </StepWrapper>
            </TopWrapper>
            <ContentInnerWrapper>

                <Tabs defaultActiveKey="plot" className={"Tabs"} centered={true} size={"large"}>
                    <TabPane tab={t("RCAVisualization.plot")} key="plot">
                        <FeatureSelectWrapper>
                            <FeatureSelect onClick={(e)=>{
                                                e.stopPropagation();
                                                setShowFeatureList(!showFeatureList);
                                            }}
                            >{plotFeature.length} item selected {showFeatureList?<span className="iconfont down" style={{float:"right"}}>&#xe79e;</span>:<span className="iconfont down" style={{float:"right"}}>&#xe65d;</span>}</FeatureSelect>
                            <FeatureList onClick={(e)=>{
                                e.stopPropagation();
                            }} style={{display: showFeatureList ? "block":"none"}}>
                                {dropDown.map((item,index)=>{
                                    return(
                                        <FeatureItem key={index}>
                                            <Checkbox style={{marginRight:10,marginLeft:10}} value={item} defaultChecked={true} onChange={(e)=>{
                                                if(e.target.checked === true){
                                                    setPlotFeature(prevState => [...prevState,e.target.value]);
                                                }
                                                else{
                                                    setPlotFeature(prevState => Delete(prevState,e.target.value));
                                                }
                                            }}/>{item}
                                        </FeatureItem>
                                          )
                                })}
                            </FeatureList>
                        </FeatureSelectWrapper>
                        <span style={{fontSize:14,marginRight:20,float:"right",marginTop:4}}>{t("RCAVisualization.show")} : </span>

                        {featureValue.map((item,index)=>{
                            if([...plotFeature].includes(item.name)){
                            return(
                                <VisualPlotWrapper key={index}>
                                    <TableTitle>{item.name}</TableTitle>
                                    <EachPlot>
                                        <Plot
                       data={[
                          {
                            x: item.values,
                            y: targetValue[0].values,
                            name: 'Predict',
                            mode: 'markers',
                            type: 'scatter',
                            marker: { size: 4}
                          },

                        ]}
                       layout={{legend: {orientation: "h",yanchor:"bottom",y:-1.6,xanchor:"right",x:1.4},
                           margin:{l:45,r:20,b:30,t:30},
                           xaxis:{title:{text:item.name,standoff:10 },zeroline:false,linewidth: 1,linecolor:"rgba(0, 0, 0, 0.5)"},
                           yaxis:{title:{text: "target",standoff:10},zeroline:false,linewidth:1,linecolor:"rgba(0, 0, 0, 0.5)"},
                           font:{size:10}}}
                       className="plotly"
                       config={{displayModeBar: false}}
                        />
                                    </EachPlot>
                                    <EachPlot>
                                        <Plot
                       data={[
                          {
                            x: Array.from(Array(item.values.length).keys()),
                            y: item.values,
                            name: 'Predict',
                            mode: 'lines+points',
                            type: 'scatter',
                            line:{width: 1,color:"orange"},
                          },

                        ]}
                       layout={{legend: {orientation: "h",yanchor:"bottom",xanchor:"right"},
                           margin:{l:45,r:10,b:30,t:30},
                           xaxis:{title:{text:t("RCAVisualization.dataNumber"),standoff:10},zeroline:false,linewidth: 1,linecolor:"rgba(0, 0, 0, 0.5)"},
                           yaxis:{title:{text: item.name,standoff:10},zeroline:false,linewidth:1,linecolor:"rgba(0, 0, 0, 0.5)"},
                           font:{size:10}}}
                       className="plotly"
                       config={{displayModeBar: false}}
                        />
                                    </EachPlot>
                                    <EachPlot>
                                        <Plot
                       data={[
                          {
                            x: item.values,
                            type: 'histogram',
                            marker:{color:"#318F10"},
                          },

                        ]}
                       layout={{legend: {orientation: "h",yanchor:"bottom",xanchor:"right"},
                           margin:{l:45,r:10,b:30,t:30},
                           xaxis:{title:{text:item.name,standoff:10},zeroline:false,linewidth:1,linecolor:"rgba(0, 0, 0, 0.5)"},
                           yaxis:{title:{text:t("RCAVisualization.occurNumber"),standoff:10},zeroline:false,linewidth:1,linecolor:"rgba(0, 0, 0, 0.5)"},
                           font:{size:10}}}
                       className="plotly"
                       config={{displayModeBar: false}}
                        />
                                    </EachPlot>
                                </VisualPlotWrapper>
                            )}
                        })}
                    </TabPane>
                    <TabPane tab={t("RCAVisualization.corrMatrix")} key="correlationMatrix">

                        <Plot
                            data = {[{z:corrMatrix,
                                x:visualizationFeature,
                                y:visualizationFeature,
                                type:"heatmap",
                                hoverongaps: false}]}
                            layout={{margin:{l:150,r:150,b:90,t:0},
                                xaxis:{autorange:"reversed"},
                                yaxis:{autorange:"reversed"}
                            }}
                            className={"heatmap"}
                        />
                    </TabPane>
                    <TabPane tab={t("RCAVisualization.DT")} key="Decision Tree">
                        決策樹
                    </TabPane>
                </Tabs>
            </ContentInnerWrapper>
        </Fragment>
    )
}