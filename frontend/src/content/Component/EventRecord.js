import React, {useEffect, useState} from "react";
import {BottomTableWrapper, ContentInnerWrapper, ContentTitle, TableTitle} from "../style";
import {Table} from "antd";
import {useDispatch} from "react-redux";
import * as actionCreators from "../store/actionCreators";

export function EventContent(){
    const dispatch = useDispatch();
    const [eventTable,setEventTable] = useState();
    const columns = [
          {
            title: '上傳時間',
            dataIndex: 'Collection',
          },
          {
            title: '模型信心度',
            dataIndex: 'Confidence',
          },
          {
            title: '資料筆數',
            dataIndex: 'DataLen',
          },
          {
            title: '腔體',
            dataIndex: 'OC',
          },
          {
            title: '來源軸',
            dataIndex: 'Source',
          },
          {
            title: '說明',
            dataIndex: 'Description',
          },

        ];

    useEffect(()=>{
        dispatch(actionCreators.getEvent(setEventTable));

    },[])
    return(
        <ContentInnerWrapper>
            <ContentTitle>事件紀錄</ContentTitle>
            <BottomTableWrapper>
                <TableTitle>上傳資料紀錄</TableTitle>
                <Table columns = {columns} dataSource={eventTable} bordered />
            </BottomTableWrapper>
        </ContentInnerWrapper>
    )
}