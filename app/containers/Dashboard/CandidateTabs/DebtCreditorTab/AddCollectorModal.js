import React, { Component } from 'react';
import { Button, Header, Image, Modal, Divider, Grid, Form, Select, TextArea, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import NewCollectorForm from './NewCollectorForm';
import { SummonInformationForm } from './SummonInformationForm';

const Container = styled.div`
  width: 1300px !important;
`;

const HorizonBar = styled.div`
  width: 1260px;
  margin: 30px 21px;
  border-top: 2px solid #5fa1fc;
`;

const ModalHeader = styled.div`
  padding: 20px;
  text-align: center;
  & .button {
    position: relative;
    display: inline-block;
    vertical-align: baseline;
    padding: 8px;
    height: 33px !important;
    font: 14px Medium Lato !important;
    letter-spacing: 0;
    color: #9ea0a5 !important;
    background-color: white !important;
    border: 1px solid #ebebeb;
    cursor: pointer;
    &:hover {
      color: #5fa1fc !important;
    }
    &.selected {
      color: #5fa1fc !important;
    }
    &.unselected {
      color: #9ea0a5 !important;
    }
    &.left-round {
      border-radius: 15px 0 0 15px !important;
      text-align: right;
      box-shadow: 0px 3px 3px #9594944e;
    }
    &.right-round {
      border-radius: 0 15px 15px 0 !important;
      text-align: left;
      box-shadow: 2px 3px 3px 0px #9594944e;
    }
  }
`;

const ModalActions = styled.div`
  margin-bottom: 20px;
  padding: 0 20px;
  & .link-button-bottom {
    margin: auto !important;
    & span {
      text-decoration: underline;
      letter-spacing: 0;
      color: #5fa1fc;
      opacity: 1;
      cursor: pointer;
    }
    & i {
      text-decoration: unset;
      margin-left: 10px;
      font-size: 18px;
      vertical-align: text-top;
    }
  }
  & .ui.button.white-button {
    background-color: white;
    color: #5fa1fc;
    box-shadow: 0px 10px 20px #00000033;
    border: 1px solid #ebebeb;
    border-radius: 5px;
  }
  & .ui.button.blue-button {
    margin-left: 5px;
    background-color: #5fa1fc;
    color: white;
    box-shadow: 0px 10px 20px #00000033;
    border-radius: 5px;
  }
`;

class AddCollectorModal extends Component {
  state = {
    formType: 1,
    formOneCount: 0,
    addCollectorContentChildren: [<NewCollectorForm key="form-one-0" />]
  };

  addNewCollecter = () => {
    let formCount = this.state.formOneCount;
    this.setState({
      formOneCount: formCount + 1,
      addCollectorContentChildren: [
        ...this.state.addCollectorContentChildren,
        <HorizonBar />,
        <NewCollectorForm key={this.state.formOneCount} />
      ]
    });
  };

  render() {
    const { formType } = this.state;
    const { open, dimmer } = this.props;
    return (
      <Container>
        <Modal
          dimmer={dimmer}
          open={open}
          onClose={this.props.close}
          style={{ width: '1300px', backgroundColor: '#F8F7F7' }}
        >
          <ModalHeader>
            <div
              className={'button left-round ' + (formType === 1 ? 'selected' : 'unselected')}
              onClick={() => this.setState({ formType: 1 })}
            >
              3rd Party Collector
            </div>
            <div
              className={'button right-round ' + (formType === 2 ? 'selected' : 'unselected')}
              onClick={() => this.setState({ formType: 2 })}
            >
              Summon Information
            </div>
          </ModalHeader>
          {formType === 1 && this.state.addCollectorContentChildren.map(child => child)}
          {formType === 2 && <SummonInformationForm />}
          <ModalActions>
            <Grid>
              <Grid.Row>
                <Grid.Column width={12} className="link-button-bottom">
                  {formType === 1 && (
                    <span onClick={this.addNewCollecter}>
                      Add New Third Party Collector
                      <Icon name="add circle" />
                    </span>
                  )}
                </Grid.Column>
                <Grid.Column width={4} style={{ textAlign: 'right' }}>
                  <Button className="white-button" onClick={this.props.close}>
                    CANCEL
                  </Button>
                  <Button className="blue-button" onClick={this.props.close}>
                    SAVE
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </ModalActions>
        </Modal>
      </Container>
    );
  }
}

export default AddCollectorModal;
