import React, {Fragment} from 'react';
import Plot from 'react-plotly.js'
import {
    ContentInnerWrapper,
    ContentTitle,
    SelectItem,
    Describe,
    InputList,
    ListItem,
    PlotTableWrapper,
    PlotWrapper, TableWrapper, TableTitle, SubTable, PlotContent, BottomTableWrapper
} from "../style";
import {Table} from "antd";
import {useTranslation} from "react-i18next";

export function SPCContent(){
    const { t, i18n } = useTranslation();
    const columns = [
          {
            title: t("SPC.date"),
            dataIndex: 'date',
          },
          {
            title: t("SPC.avg"),
            dataIndex: 'average',
          },
          {
            title:t("SPC.range"),
            dataIndex: 'range',
          },
          {
            title: t("SPC.OOC"),
            dataIndex: 'amount',
          },
        ];
    const dataSource = [
          {
            key: '1',
            date: '2020-05-19 11:36:08',
            average: 2.01,
            range: 0.05,
            amount : 1
          },
          {
            key: '2',
            date: '2020-05-19 11:40:12',
            average: 1.99,
            range: 0.012,
            amount : 2
          },
        ];

    return(
        <ContentInnerWrapper>
            <ContentTitle>{t("contentTitle.spc")}</ContentTitle>
            <SelectItem>
                <Describe>{t("SPC.parameter")}</Describe>
                <InputList  disable={false}>
                    <ListItem className='disable'  disabled selected>{t("SPC.parameterSelect")}</ListItem>
                    <ListItem value = 'Rate1'>{t("SPC.depoRate")}1</ListItem>
                    <ListItem value = 'Rate2'>{t("SPC.depoRate")}2</ListItem>
                    <ListItem value = 'Rate3'>{t("SPC.depoRate")}3</ListItem>
                    <ListItem value = 'Rate4'>{t("SPC.depoRate")}4</ListItem>
                </InputList>
            </SelectItem>
            <PlotTableWrapper>
                <TableWrapper>
                    <TableTitle>{t("SPC.statistic")}</TableTitle>
                    <SubTable className = "top">{t("SPC.item")}</SubTable>
                    <SubTable className = "top">{t("SPC.value")}</SubTable>
                    <SubTable>X{t("SPC.max")}</SubTable>
                    <SubTable>2.1</SubTable>
                    <SubTable>X{t("SPC.max")}</SubTable>
                    <SubTable>1.8</SubTable>
                    <SubTable>X{t("SPC.max")}</SubTable>
                    <SubTable>2.1</SubTable>
                    <SubTable>X{t("SPC.max")}</SubTable>
                    <SubTable>1.8</SubTable>
                    <SubTable>X{t("SPC.max")}</SubTable>
                    <SubTable>2.1</SubTable>
                    <SubTable>X{t("SPC.max")}</SubTable>
                    <SubTable>1.8</SubTable>
                </TableWrapper>
                <PlotWrapper>
                    <TableTitle>{t("SPC.avg")}</TableTitle>
                    <PlotContent>
                        <Plot
                       data={[
                          {
                            x: [1,2,3],
                            y: [1,2,3],
                            type: 'scatter',
                            mode: 'markers',
                          }
                        ]}
                       layout={{margin:{l:40,r:40,b:20,t:20}}}
                       className="plotly"
                       config={{displayModeBar: false}}
                        />
                    </PlotContent>
                    <TableTitle>{t("SPC.range")}</TableTitle>
                    <PlotContent>
                        <Plot
                       data={[
                          {
                            x: [1,2,3],
                            y: [1,2,3],
                            type: 'scatter',
                            mode: 'markers',
                          }
                        ]}
                       layout={{margin:{l:40,r:40,b:20,t:20}}}
                       className="plotly"
                       config={{displayModeBar: false}}
                        />
                    </PlotContent>
                </PlotWrapper>
            </PlotTableWrapper>
            <BottomTableWrapper>
                <TableTitle>{t("SPC.data")}</TableTitle>
                <Table columns = {columns} dataSource={dataSource} bordered>
                </Table>
            </BottomTableWrapper>
        </ContentInnerWrapper>
    )
}