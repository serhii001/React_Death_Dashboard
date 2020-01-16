import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';

import { ModalCancelButton, ModalVerifyButton } from './styles';

const HelpModalContent = styled.div`
  display: flex;
  flex-direction: column;
  & .description {
    text-align: left;
    font: 17px Regular Lato, sans-serif;
    letter-spacing: 2.4px;
    color: #707070;
    margin: 30px 20px;
  }
`;

const HelpModalAction = styled.div`
  display: flex;
  flex-direction: row;
  margin: 30px;
`;

class HelpModal extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    return (
      <Modal
        style={{ borderRadius: '20px', width: '400px' }}
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={<span className="linkButton">YES</span>}
      >
        <HelpModalContent>
          <p className="description">Notify the Administrator for help</p>
          <HelpModalAction>
            <ModalCancelButton onClick={this.close}>Cancel</ModalCancelButton>
            <ModalVerifyButton
              onClick={() => {
                this.close();
                // this.props.onSubmit();
              }}
            >
              Submit
            </ModalVerifyButton>
          </HelpModalAction>
        </HelpModalContent>
      </Modal>
    );
  }
}

export default HelpModal;
