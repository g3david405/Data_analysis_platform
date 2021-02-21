import {Fragment} from 'react'
import {ConfirmButton, ConfirmText, ContentWrapper} from "./style";
import {Route, useLocation, Router, Link} from "react-router-dom";
import {SPCContent} from "./Component/SPC";
import {RCASettingContent} from "./Component/RCA_Setting";
import {RCAModelContent} from "./Component/RCAModelContent";
import {SettingContent} from "./Component/Setting";
import {RCAVisualizationContent} from "./Component/RCA_Visualization";
import {RCAUploadContent} from "./Component/RCA_upload";
import {EventContent} from "./Component/EventRecord";
import {ImageClassficationContent} from "./Component/ImageClassfication";
import {UserManagementContent} from "./Component/UserManagement";
import {useDispatch, useSelector} from "react-redux";
import * as actionCreators from "./store/actionCreators";


export function Content(){
    const confirm = useSelector(state => state.login.confirm);
    const dispatch = useDispatch();
    return(
        <ContentWrapper>
            {confirm?
                <ConfirmContent />:
                <div>
                    <ConfirmText>請先進行用戶驗證</ConfirmText>
                    <ConfirmText>若您已驗證，請點擊<ConfirmButton onClick={()=>{
                        dispatch(actionCreators.checkUserConfirm())
                    }
                    }>這裡</ConfirmButton>重新刷新</ConfirmText>
                </div>
            }
        </ContentWrapper>
    )

}

function ConfirmContent (){
    return(
        <Fragment>
            <Route path='/spc' exact component={SPCContent}/>
            <Route path='/rca/model' component={RCAModelContent}/>
            <Route path='/rca/visualization' component={RCAVisualizationContent}/>
            <Route path='/rca/set' exact component={RCASettingContent} />
            <Route path='/rca' exact component={RCAUploadContent} />
            <Route path='/setting' exact component={SettingContent} />
            <Route path='/event' exact component={EventContent} />
            <Route path='/image' exact component={ImageClassficationContent} />
            <Route path='/user' exact component={UserManagementContent} />
        </Fragment>
    )
}