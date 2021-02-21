import { createGlobalStyle } from 'styled-components';

const GlobalIcon = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('./iconfont.eot?t=1612425931368'); /* IE9 */
  src: url('./iconfont.eot?t=1612425931368#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('./iconfont.woff?t=1612425931368') format('woff'),
  url('./iconfont.ttf?t=1612425931368') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('./iconfont.svg?t=1612425931368#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfontSPC {
  font-family: "iconfont" !important;
  font-size: 20px;
  margin-right:8px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfont {

  font-family: "iconfont" !important;
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &.border{
    border:1px solid rgb(223, 223, 223);
    padding:2px;
  }
  &.alert{
    font-size:20px;
    color:red;
    float:left;
  }
  &.down{
    font-size:12px;
  }
}
.iconfontToggle {
  font-family: "iconfont" !important;
  font-size: 32px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.iconfontLeft {
  line-height:48px;
  font-family: "iconfont" !important;
  font-size: 19px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.iconfontUpload {
  line-height:28px;
  font-family: "iconfont" !important;
  font-size: 19px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


`
export default GlobalIcon;

