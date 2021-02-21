import styled from 'styled-components'

export const HeaderWrapper = styled.div`
    position:fixed relative;
    height:72px;
    padding-left:24px;
    padding-right:24px;
    border-bottom: 4px solid rgb(114, 113, 113);
    img{
        float:left;
        display:block;
        width:44px;
        height:44px;
        margin:14px 24px;
    }
`

export const Title = styled.div`
    line-height:72px;
    float:left;
    font-size:26px;
    font-weight:bold;
    color: rgb(63, 63, 63);
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;

`

export const NavWrapper = styled.div`
    float:right;
    height:72px;
    z-index:2;
    line-height:72px;
`

export const NavItem = styled.div`
    margin:0 18px;
    float:right;
    font-size:20px;
    cursor: pointer;
    &.circle{
        margin-top:16px;
        background-color: #bdbdbd;
        color:#fafafa;
        border-radius: 50%;
        line-height:40px;
        width:40px;
        text-align:center;
        height:40px;
    }
    div{
    cursor:auto;
    }

`

export const Icon = styled.div`
    cursor: pointer;
    line-height:72px;
    float:left;
    background-size:contain;
`

export const UserWrapper = styled.div`
    z-index:1000;
    background:#FEFEFE;
    position:relative;
    left:-120px;
    top:10px;
    height:125px;
    width:180px;
    box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
    border-radius: 4px;
`

export const UserName = styled.div`
    display:block;
    font-size:20px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    color:#000000DE;
    padding-bottom: 8px;
    border-bottom:1px solid rgba(0, 0, 0, 0.12);
`

export const ButtonLogout = styled.span`
    font-size:16px;
    width:125px;
    height:24px;
    line-height:65px;
    color:rgb(255, 255, 255);
    background:#00adef;
    padding:8px 24px;
    cursor:pointer;
`

export const AlertWrapper = styled.div`
    z-index:1000;
    background:#FEFEFE;
    position: absolute;
    left:${props => String(props.winWidth - 300) + "px"};
    width:254px;
    height:auto;
    box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
    border-radius: 4px;
    vertical-align:middle;
`

export const LanWrapper = styled.div`
    z-index:1000;
    background:#FEFEFE;
    position: absolute;
    left:${props => String(props.winWidth - 250) + "px"};
    top:60px;
    width:96px;
    height:88px;
    box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
    border-radius: 4px;
    font-size:16px;
    text-align:center;
    div{
        height:44px;
        line-height:44px;
        cursor:pointer;
    }
    .select{
        background:rgba(0, 0, 0, 0.08);  
    }
`

export const AlertItem = styled.div`
    z-index:1001;
    height:80px;
    line-height:80px;
    width:234px;
    margin-left:20px;
    font-size:16px;
    border-bottom:1px solid rgba(0, 0, 0, 0.12);
    &.title{
        height:40px;
        margin-left:0px;
        width:254px;
        line-height:40px;
        padding:0px 12px;
    }
`

export const AlertContent = styled.div`
    font-size:12px;
    margin-left:45px;
    height:12px;
    line-height:30px;
    margin-top:8px;
`