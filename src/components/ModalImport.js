import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
const { createTheme, createFiles, cloneFolder } = require('electron').remote.require('./lib/create') //
const { foldersRemote } = require('electron').remote.require('./lib/remote') //
const { writeDir } = require('electron').remote.require('./lib/filesystem') //

const ModalBox = styled.div `
  position: fixed;
  background: rgba(16, 16, 16, 0.99);
  width: 100vw;
  height: 100vh;
  opacity: 1;
  animation-name: fadeOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputBox = styled.input `
  width: 70%;
  background-color: rgba(16, 16, 16, 0.05);
  height: 50px;
  padding: 20px;
  font-size: 35px;
  color: #E58E73;
  border: none;
  border-bottom: 1px dashed grey;
  text-align: center;
`

const InputHex = styled.input `
  width: 70%;
  background-color: rgba(16, 16, 16, 0.05);
  height: 50px;
  padding: 20px;
  font-size: 34px;
  color: #E58E73;
  border: none;
  border-bottom: 1px dashed grey;
  text-align: center;
`

const Cross = styled.button `
  position: absolute;
  right: 5%;
  top: 8%;
  font-size: 25px;
  color: gray;
  cursor: pointer;
  border: none;
  background: rgba(16, 16, 16, 0.05);
`

const Name = styled.span `
  color: #E58E73
`

const SuccessMSG = styled.h1`
  padding: 40px;
  line-height: 42px;
`

const ExistingFolder = styled.div `
  position: absolute;
  margin-top: 100px;
`

const Container = styled.div `
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin-top: 100%;
`

class ModalImport extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: "",
      hex: "",
      showInput: true,
      newFolder: true,
      template: this.props.template,
      files: this.props.files,
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      template: nextProps.template,
      files: nextProps.files
    })
  }

  handleChange = (e, type) => {
   this.setState({
     [type]: e.target.value,
     newFolder: true
    });
  }

  keyPress = (e, type) => {
    const { hex } = this.state;
    const { dir } = this.props;
     if(e.keyCode == 13){

        this.setState({
          [type]: e.target.value
        });

        console.log(hex);

        foldersRemote.readFolder(dir).then(data => {
          if(data.includes(this.state.value)){
            // console.log('this folder exists');
            this.setState({
              newFolder: false
            });
          } else if(this.state.files.length > 0){
            createFiles(dir,this.state.value, this.state.hex);;
            this.setState({
               showInput: false,
               newFolder: true
            });
            setTimeout(() => { this.props.remove(); }, 1500);
          } else {
            createFiles(dir, this.state.value, this.state.hex);
            this.setState({
               showInput: false,
               newFolder: true
            });
            setTimeout(() => { this.props.remove(); }, 1500);
          }
        })

     }
  }

  render(){

    const { showInput, value, newFolder, template, files, hex } = this.state;
    const { dir } = this.props;

// console.log(files);

    return (

      <ModalBox  >
        <Cross onClick={() => this.props.remove()} > X </Cross>

        {
          showInput
          ?
          <Container>
            <InputBox type='text' placeholder="Name" value={value} onKeyDown={(e) => this.keyPress(e, 'value' )} onChange={(e) => this.handleChange(e, 'value')}/>
            <InputHex type='text' placeholder="Dat Link" value={hex} onKeyDown={(e) => this.keyPress(e, 'hex' )} onChange={(e) => this.handleChange(e, 'hex')}/>
          </Container>
          :
          <SuccessMSG> You've added a new Archive: <Name>{value}</Name> in <Name>{dir}</Name></SuccessMSG>

        }

        {
          newFolder
          ?
          null
          :
          <ExistingFolder>
            <p> This Folder Exists </p>
          </ExistingFolder>
        }


      </ModalBox>
    )
  }

}

export default ModalImport
