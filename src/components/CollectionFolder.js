import React, { Component } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip'
const path = require('path');
const fs = require('fs');
var userHome = require('user-home');
var argv = require('minimist')(process.argv.slice(2));
const {foldersRemote} = require('electron').remote.require('./lib/remote') //
const {syncDat} = require('electron').remote.require('./lib/create') //
const {getDat} = require('electron').remote.require('./lib/link') //
const {startLocalServer, stopLocalServer} = require('electron').remote.require('./lib/preview') //

const {shell} = require('electron');


argv.loc = argv.loc || path.join(userHome, '/Archetype_Archive');



const SpanSync = styled.span `
  color: grey;
  font-size: 16px;
`

const LinkFolder = styled.a `
  font-size: 28px;
  color: white;
  margin-bottom: 40px;
  text-decoration: none;
  cursor: pointer;
`

const FolderLi = styled.li `
  cursor: pointer;
`
const LinktoDat = styled.span `
  color: #E58E73;
  font-size: 18px;
  float: right;
  margin-right: 15px;
  cursor: pointer;
`

const SynctoDat = styled.span `
  color: grey;
  font-size: 18px;
  float: right;
  margin-right: 15px;
  cursor: pointer;

  &:hover {
    cursor: pointer;
    color: #E58E73;
  }
`

const Preview = styled.span `
  color: grey;
  font-size: 18px;
  float: right;
  margin-right: 15px;
  cursor: pointer;

  &:hover {
    cursor: pointer;
    color: #E58E73;
  }
`

const SyncSpan = styled.button `
  border: none;
  color: pink;
  font-size: 8px;
  padding: 0px;
  margin-top: 0px;
  cursor: pointer;
  float: right;
`

class CollectionFolder extends Component {
  constructor(props){
    super(props);
    this.state = {
      serving: false,
      color: 'grey',
    }
  }

  openLink = () => {
    const { folderName } = this.props;
    shell.showItemInFolder(`${argv.loc}/${folderName}`);
  }

  openWeb = (url) => {
    shell.openExternal(`${url}`);
  }

  sync = () => {
    const { folderName } = this.props;
    syncDat(folderName);
  }

  getDatLink = () => {
    const { folderName } = this.props;
    getDat(folderName, (url) => {
      shell.openExternal(`${url}`);
    });
  }

  preview = () => {
    const { folderName, port } = this.props;

    let serving;
    let color;
    if(this.state.serving){
      stopLocalServer();
      serving = false;
      color = 'grey';
    } else {
      startLocalServer(folderName, port);
      serving = true;
      color = '#E58E73';
      shell.openExternal(`http://localhost:5555/${folderName}/index.html`);
    }

    this.setState({ serving, color })
  }




  render() {
    const { folderName } = this.props;

    return (
      <FolderLi onClick={() => this.props.getDir({folderName})}>
        <LinkFolder onClick={this.openLink} data-tip data-for='finder'> {folderName}  </LinkFolder>
        <ReactTooltip id='finder' class='tooltip' type='error' effect='float' >
          <span>Open in Finder</span>
        </ReactTooltip>
        <SynctoDat onClick={() => this.props.importDat({folderName})} data-tip data-for='sync'> + </SynctoDat>
        <ReactTooltip id='sync' class='tooltip' type='error' effect='float' >
          <span>Add</span>
        </ReactTooltip>

      </FolderLi>
    )
  }
}

export default CollectionFolder;
