import styled from "styled-components";

export const LeftNav = styled.div`
    float:left;
    height:auto;
    width:280px;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
`

export const LeftNavItem = styled.div`
    align-items: center;
    font-size: 1rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    cursor: pointer;
    padding-top:8px 8px;
    padding-left:16px;
    margin-top:6px;
    font-weight: 400;
    height:48px;
    width:100%;
    line-height:48px;
    background:${props => props.location.includes(props.route)?"rgba(0, 173, 239, 0.12)":""};
    color:${props => props.location.includes(props.route)?"rgb(0, 173, 239)":"rgb(114, 113, 113)"};
    .iconfontLeft{
        padding-right:6px
    }
`