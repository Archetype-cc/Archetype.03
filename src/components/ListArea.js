import React, { Component } from 'react';
import styled from 'styled-components';
import ArchetypesList from './ArchetypesList';
import CollectionList from './CollectionList';
import CreatePlus from './CreatePlus';
const path = require('path');
var userHome = require('user-home');
var argv = require('minimist')(process.argv.slice(2));
const {shell} = require('electron');
argv.loc = argv.loc || path.join(userHome, '/Archetype_Archive');

const DescriptionContainer = styled.div `
  flex : 1;
  padding: 20px;
`

const Heading = styled.h1 `
  font-size: 37px;
  color: #white;
  padding: 35px 10px 10px 10px;
  width: 95%;
`


const HeadingInput = styled.p `
  color: #white;
  margin-bottom: 1px;
  margin-top: 0px;
`

const ImportInput = styled.input `
  border: none;
  border-bottom: 1px solid #949494;
  color: #dd896f;
  width: 100%;
  height: 45px;
  font-size: 14px;
  background: #0b0d0b;
  border-radius: 1px;
  letter-spacing: 0.3px;
`

const Line = styled.div `
  height: 0.3px;
  width: 100%;
  background: white;
`

const Beta = styled.div `
  color: white;
  padding-top: 3rem;
`

const Button = styled.button `
  background: none;
  border: .5px solid white;
  color: white;
  margin: 10px 0px 10px 0px;
  float: left;
  padding: 10px 0px;
  width: 120px;

  &:hover {
    border: 1px solid #E58E73;
    cursor: pointer;
  }
`

const SpanLine = styled.span`
  border-bottom: 2px solid white;
  width: 30vw;
  height: 37px;
  color: #0b0d0b;
`


class ListArea extends Component {
  constructor(props){
    super(props);
    this.state = {
      template: "",
      showInput: true,
      newFolder: true,
      list: false,
      dir: ""
    }
  }

  openLink = (e) => {
    shell.showItemInFolder(`${argv.loc}`);
  }

  openWeb = (url) => {
    shell.openExternal(`${url}`);
  }

  handleChange = (e) => {
   this.setState({
     template: e.target.value,
     newFolder: true
    });
  }

  keyPress = (e) => {
     if(e.keyCode == 13){

        this.setState({
          value: e.target.value,
        });
        this.props.click(this.state.template);
     }
  }

  changeList = (dir) => {
    this.setState({
      list: true,
    })
  }


  backToCollection = () => {
    this.setState({
      list: false
    })
  }


  getFolder = (dir) => {
    console.log(dir);
    this.setState({
      dir
    })
    this.changeList()
  }

  render() {
    const { list, dir } = this.state;

    return  <DescriptionContainer >

        <Heading> ARCHIVE AS <SpanLine>(_______)</SpanLine> PRACTICE. </Heading>
        <CreatePlus click={() => this.props.click(dir)} template={this.state.template} type={"new"} list={list} importDat={() => this.props.importDat(dir)} />
        {
          list
          ?
          <ArchetypesList dir={dir} back={this.backToCollection} />
          :
          <CollectionList importDat={this.props.importDat} dir={dir} change={this.changeList} getDir={this.getFolder}  />
        }
        <hr></hr>
        <Button onClick={this.openLink}> My Collection </Button>


      </DescriptionContainer>;
  }
}

export default ListArea;
