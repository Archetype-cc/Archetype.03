import React, { Component } from 'react';
import styled from 'styled-components';
import CreateButton from './CreateButton';
import ListArea from './ListArea';
import Modal from './Modal';
import ModalImport from './ModalImport';

import Menu from './Menu';


const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  position: fixed;
`
const MainContainer = styled.div `
`


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModalName: false,
      showModalHex: false,
      showModal: false,
      showModalImport: false,
      name: '',
      hex: '',
      template: '',
      files: [],
      importing: false
    }
  }

  update = (theme) => {
    this.setState({
      showModal: true,
      template: theme,
    })
  }

  importDat = (dir) => {
    console.log(dir.folderName);
    this.setState({
      showModalImport: true,
      importing: true,
      dir: dir.folderName
    })
  }

  remove = () => {
    this.setState({
      showModal: false,
      showModalImport: false,
      template: ''

    })
  }

  onDrop = (files) => {
    this.setState({
      files
    });
    this.update();
    this.noTemplate();
  }

  noTemplate = () => {
    this.setState({
      template: 'none',
    });
  }

  render () {
    const { showModal, showModalImport, template, files, importing, dir  } = this.state;
    return (
      <MainContainer>
        <Menu />
        <PageContainer>
        <ListArea click={this.update} fileImport={this.onDrop} importDat={this.importDat} />
        {
          showModal
          ?
          <Modal remove={this.remove} template={template} files={files} importing={importing} dir={dir} />
          :
          null
        }

        {
          showModalImport
          ?
          <ModalImport remove={this.remove} template={template} files={files} importing={importing} dir={dir} />
          :
          null
        }

        </PageContainer>
      </MainContainer>
    )
  }
}

export default Home;
