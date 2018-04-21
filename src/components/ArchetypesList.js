import React, { Component } from 'react';
import styled from 'styled-components';
import Folder from './Folder';
const path = require('path');
const fs = require('fs');
var userHome = require('user-home');
var argv = require('minimist')(process.argv.slice(2));
const {foldersRemote} = require('electron').remote.require('./lib/remote') //
const {syncDat} = require('electron').remote.require('./lib/create') // bar

const FolderListContainer = styled.div `
  height: 18rem;
  width: 100%;
  position: static;
  overflow: scroll;
`

const Ulist = styled.ul`
  line-height: 2.6rem;
`

const Titlep = styled.div `
  margin-top: 15px;
  margin-bottom: 15px;
`

const FolderSpan = styled.span`
  color: #E58E73;
`

const Back = styled.span `
  float: right;
  margin-right: 0.6rem;

  &:hover {
    cursor:pointer;
    color: #E58E73;
  }
`
class ArchetypesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      folders: [],
      dir: this.props.dir
    }
  }

  componentWillMount() {
    const { dir } = this.state;

    foldersRemote.readFolderInside(dir.folderName).then(folders =>  this.setState({ folders }))
  }

  componentWillReceiveProps(nextProps){
    const { dir } = this.state;
    foldersRemote.readFolderInside(dir.folderName).then(folders =>  this.setState({ folders }))
  }

  render() {
    const { folders, dir } = this.state;
    console.log(dir.folderName);

    return  (

      <div>
        <Titlep> Archives in: <FolderSpan>{dir.folderName}</FolderSpan> <Back onClick={this.props.back}> ← back </Back>  </Titlep>
        <FolderListContainer>
          <Ulist>

          {
            folders.map((name, i) =>  {
              if (name !== '.DS_Store' && name !== ".archetype.lock" && name !== ".dat" && name !== "feed.json") {
                return  <Folder key={i} folderName={name} parent={dir.folderName} port={i*1000} />
              }
            })
          }

        </Ulist>
        </FolderListContainer>
      </div>

    )
  }
}

export default ArchetypesList;
