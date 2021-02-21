import React, {useEffect, useState,Fragment} from "react";
import {BottomTableWrapper, ContentInnerWrapper, ContentTitle, TableTitle, VisualizationButton} from "../style";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import * as actionCreators from "../store/actionCreators";
import {useTranslation} from "react-i18next";

export function UserManagementContent(){
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [tableData,setTableData] = useState();
    const [selectedUser,setSelectedUser] = useState([]);
    const admin = useSelector(state => state.login.admin);
    const user = useSelector(state => state.login.user);
    const rowSelection = {onChange:(selectedRowKeys, selectedRows) =>{
        const user = [];
            for(let i=0; i < selectedRows.length;i++){
                user.push(selectedRows[i].username);
            }
            setSelectedUser(user);
            console.log(user);
    },onSelect:(record, selected, selectedRows) => {
        },
        getCheckboxProps: record => ({
            disabled: record.username === user
        }),
    }
    const columns = [
          {
            title: t("UserManagement.username"),
            dataIndex: 'username',
          },
          {
            title: t("UserManagement.email"),
            dataIndex: 'email',
          },
          {
            title: t("UserManagement.confirm"),
            dataIndex: 'confirm',
          },
          {
            title: t("UserManagement.manager_table"),
            dataIndex: 'admin',
          },

        ];

    useEffect(()=>{
        dispatch(actionCreators.getUserList(setTableData));
    },[])
    return(
        <ContentInnerWrapper>
            <ContentTitle>{t("UserManagement.title")} {admin? t("UserManagement.manager") : ""}</ContentTitle>
            <BottomTableWrapper>
                <TableTitle>{t("UserManagement.userList")} <span style={{marginLeft:24,display:admin?"":"none"}}>選擇了 {selectedUser.length} 個使用者</span>
                    {
                        admin?
                            <Fragment>
                        {
                            selectedUser.length > 0
                            ?
                                <Fragment>
                                    <VisualizationButton onClick={() => {
                                        dispatch(actionCreators.deleteUser(selectedUser));
                                    }
                                    }>{t("UserManagement.deleteUser")}</VisualizationButton>
                                    <VisualizationButton onClick={()=>{
                                        dispatch(actionCreators.adminUser(selectedUser));
                                    }}>{t("UserManagement.updateAdmin")}</VisualizationButton>
                                </Fragment>
                            :<Fragment>
                                <VisualizationButton className={"dis"}>{t("UserManagement.deleteUser")}</VisualizationButton>
                                <VisualizationButton className={"dis"}>{t("UserManagement.updateAdmin")}</VisualizationButton>
                            </Fragment>
                    }
                    </Fragment>:
                            <Fragment />
                    }
                </TableTitle>
                <Table columns = {columns} rowClassName={(record) => record.username === user?"bold":""} rowSelection={admin?rowSelection:false} dataSource={tableData} bordered />
            </BottomTableWrapper>
        </ContentInnerWrapper>
    )
}