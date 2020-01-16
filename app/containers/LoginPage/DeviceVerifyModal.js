import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Input, Icon } from 'semantic-ui-react';

import { ModalCancelButton, ModalVerifyButton } from './styles';

import CodeInput from './CodeInput';

const ModalContent = styled.div`
  border-radius: 25px;
  padding: 30px 70px;
`;

const ModalTitle = styled.span`
  font: 18px Bold Lato, sans-serif;
  letter-spacing: 2.4px;
  color: #006ad5;
  display: block;
`;

const ModalHeaderLine = styled.div`
  margin-top: 11px;
  text-align: left;
  & span {
    font: 18px Regular Lato, sans-serif;
    letter-spacing: 2.4px;
    color: #000000;
  }
  .ui & input {
    border: none;
    font-weight: bold;
  }
  & input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  & p {
    text-align: center;
    font: 20px Bold Lato, sans-serif;
    letter-spacing: 0;
    justify-content: center;
    color: #000000;
    padding-top: 30px;
  }
`;

const ModalBodyHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 35px;
`;
const ModalBodySpan = styled.span`
  font: 18px Regular Lato, sans-serif;
  letter-spacing: 2.4px;
  color: #000000;
`;

const ModalBodyLink = styled.span`
  text-align: center;
  text-decoration: underline;
  font: 18px Bold Lato, sans-serif;
  letter-spacing: 2.4px;
  color: #ff7f00;
  cursor: pointer;
`;

const CodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: spaces-between;
  padding: 5px 20px;
  justify-content: center;
  & input:focus {
    outline-color: #2fbaff;
  }
`;

const ModalAction = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  & span {
    padding-top: 10px;
    font: 20px Semibold Open Sans, sans-serif;
    letter-spacing: 2.4px;
    color: #000000;
  }
  & i {
    color: #00a7fa;
    font-size: 28px !important;
    cursor: pointer;
    transform: rotate(225deg);
  }
`;

class DeviceVerifyModal extends Component {
  state = { open: false };

  componentDidMount() {
    this.props.onRef(this);
  }

  show = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <div>
        <Modal
          style={{ borderRadius: '25px' }}
          dimmer="blurring"
          open={open}
          onClose={this.close}
        >
          <ModalContent>
            <ModalTitle>Verify Device</ModalTitle>
            <ModalHeaderLine>
              <span>A temporary verification code to:</span>
              <Input type="number" placeholder="619.956.8453" />
            </ModalHeaderLine>
            <ModalBody>
              <ModalBodyHeader>
                <ModalBodySpan>
                  Enter the code to verify this device.
                </ModalBodySpan>
                <ModalBodyLink>Didn&apos;t receive a code?</ModalBodyLink>
              </ModalBodyHeader>

              <p>Verification code:</p>
              <CodeContainer>
                <CodeInput />
              </CodeContainer>
            </ModalBody>
            <ModalAction>
              <span>
                <Icon name="redo alternate" /> Send a new code.
              </span>
              <ModalCancelButton onClick={this.close}>Cancel</ModalCancelButton>
              <ModalVerifyButton
                onClick={() => {
                  window.location.href = '/welcome';
                }}
              >
                Verify
              </ModalVerifyButton>
            </ModalAction>
          </ModalContent>
        </Modal>
      </div>
    );
  }
}

DeviceVerifyModal.propTypes = {
  onRef: PropTypes.func,
};

export default DeviceVerifyModal;
