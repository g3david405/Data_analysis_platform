import React,{useEffect,Fragment} from 'react';
import GlobalStyle from "./styled";
import GlobalIcon from "./static/iconfont/iconfont";
import {Provider, useDispatch, useSelector} from "react-redux";
import Header from "./header";
import {LeftNavMain} from "./leftNav";
import {Content} from "./content";
import 'antd/dist/antd.less';
import {useHistory, useLocation} from 'react-router-dom'
import {Spin} from "antd";
import {LoginAndRegister} from "./login";
import * as actionCreators from "./store/actionCreators";


function App() {
    const history_ = useLocation();
    const history = useHistory();
    const loading = useSelector(state => state.header.loading);
    //const user = useSelector(state => state.login.user);
    const user = localStorage.getItem("username");
    const admin = localStorage.getItem("admin");
    const confirm = localStorage.getItem("confirm");
    const dispatch = useDispatch();
    document.title = "智能分析平台";
    useEffect(()=>{
        window.scrollTo(0,0);
    },[history_])
    useEffect(()=>{
        //dispatch(checkLogin(history));
        if (!user){
        history.push("/login");
    }
        else{
            dispatch(actionCreators.setUser(user,admin,confirm));
        }

    },[])


  return (
      <Fragment>
              {
                  user?
                  loading ?
                      <Spin style={{fontSize: 24}} size={"large"}>
                          <div>
                              <GlobalStyle/>
                              <GlobalIcon/>
                              <Header/>
                              <div style={{display: "flex"}}>
                                  <LeftNavMain/>
                                  <Content/>
                              </div>
                          </div>
                      </Spin>
                      :
                      <div>
                          <GlobalStyle/>
                          <GlobalIcon/>
                          <Header/>
                          <div style={{display: "flex"}}>
                              <LeftNavMain/>
                              <Content/>
                          </div>
                      </div>:
                      loading?
                          <Spin style={{fontSize: 24}} size={"large"}>
                              <div>
                                <LoginAndRegister />
                              </div>
                          </Spin>:
                          <div>
                            <LoginAndRegister />
                          </div>

              }
      </Fragment>


  );
}

export default App;
