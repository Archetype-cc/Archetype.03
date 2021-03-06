import React, { Component } from 'react';
import Home from './Home';
const {ipcRenderer} = require('electron')
import { injectGlobal } from 'styled-components';

injectGlobal`

@font-face {
    font-family: 'lunchtype22regular';
    src: url('./assets/fonts/lunchtype22-regular-webfont.eot');
    src: url('./assets/fonts/lunchtype22-regular-webfont.eot?#iefix') format('embedded-opentype'),
         url('./assets/fonts/lunchtype22-regular-webfont.woff2') format('woff2'),
         url('./assets/fonts/lunchtype22-regular-webfont.woff') format('woff'),
         url('./assets/fonts/lunchtype22-regular-webfont.ttf') format('truetype'),
         url('./assets/fonts/lunchtype22-regular-webfont.svg#lunchtype22regular') format('svg');
    font-weight: normal;
    font-style: normal;


}

* {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    user-select: none;
}

p {
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -o-user-select: text;
    user-select: text;
}

  body {
    background: #0B0D0B;
    color: white;
    font-family:'lunchtype22regular', arial;
    margin: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    letter-spacing: 0.06em;
    -webkit-text-size-adjust: 100%;
  }

  .tooltip {
    text-align: center;
    background: #E58E73;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    font-size: 28px;
    line-height: 45px;
  }

  li:hover {
    background: #171817;
  }

  *:focus {outline:0;}

  ::-webkit-scrollbar {
    width: 10px;
    background-color: #0b0d0b;
  }

  ::-webkit-scrollbar-thumb {
    width: 10px;
    box-shadow: 0 0 0 12px rgb(49, 49, 49) inset;
  }

  ::-webkit-scrollbar-thumb:hover,
  ::-webkit-scrollbar-thumb:focus {
    box-shadow: 0 0 0 12px rgb(89, 89, 89) inset;
  }
  ::-webkit-scrollbar-thumb:active {
    box-shadow: 0 0 0 12px rgb(169, 169, 169) inset;
  }
  ::-webkit-scrollbar-corner {
    background: #0b0d0b;
  }
  @keyframes fadeInOpacity {
  	0% {
  		opacity: 0;
  	}
  	100% {
  		opacity: 1;
  	}
  }

  @keyframes fadeOpacity {
    0% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }

  .dropzone {
    -webkit-flex: 1 auto;
    -ms-flex: 1 auto;
    -webkit-flex: 1 auto;
    -ms-flex: 1 auto;
    flex: 1 auto;
    /* width: 86%; */
    float: right;
  }

  .dropbtn {
    padding-right: 0px;
    height: 22px;
    float: left;
  }

  .dropbtn:hover{
    cursor: pointer;
    color: #E58E73;
  }

  .dropzone:hover {
    cursor: pointer;
  }

`;


class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
