import React from 'react';
import styled from 'styled-components';
import { Image, Input, Loader, Dimmer, Modal, Icon } from 'semantic-ui-react';

import { device } from '../../components/Device';
import CodeInput from './codeInput';

import CustomerImage from '../../images/customer.png';

const Container = styled.div`
  display: flex;
  width: 650px;
  flex-direction: column;
  box-shadow: 6px 6px 8px #00000095;
  border: 1px solid #707070;
  border-radius: 40px;
  margin: auto;
  margin-top: 40px;
  opacity: 1;
  align-items: center;
  & img {
    width: 80px;
    margin-top: 50px;
  }
  & .name {
    font: 50px Light Open Sans;
    letter-spacing: 0;
    color: #2fbaff;
    margin: 5px;
  }
  & .role {
    font: 22px Regular Lato;
    letter-spacing: 0;
    color: #959494;
    text-align: center;
  }
  & .date {
    font: 25px Medium Lato;
    letter-spacing: 0;
    color: #2fbaff;
  }
  & .timeIcon {
    margin: 5px;
    font-size: 40px;
    color: #2fbaff;
  }
  & .time {
    font: 22px Medium Lato;
    letter-spacing: 0;
    color: #707070;
    margin: 0px;
  }
`;

const HelpModalContent = styled.div`
  display: flex;
  flex-direction: column;
  & .description {
    text-align: left;
    font: 17px Regular Lato;
    letter-spacing: 2.4px;
    color: #707070;
    margin: 30px 20px;
  }
`;

const Button = styled.button`
  & {
    display: inline-flex;
    width: 170px;
    height: 62px;
    margin: 25px;
    background: #2fbaff 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 20px #00000033;
    border: unset;
    border-radius: 5px;
    font: 18px Semibold Open Sans;
    opacity: 1;
    color: white;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  &:focus {
    outline: unset;
  }
  &:hover {
    outline: unset;
    opacity: 0.7;
  }
  &:active {
    opacity: 1;
  }
  @media ${device.tablet} {
    width: 238px;
    height: 60px;
    margin-top: 35px;
    font-size: 28px;
  }
  @media ${device.mobileL} {
    max-width: 196px;
    max-height: 45px;
    margin-top: 26px;
    font-size: 20px;
  }
`;

class ResetPassword extends React.Component {
  state = { isCodeValid: false, isSetPassword: false, open: false };

  checkValid = () => {
    this.setState({ isCodeValid: true });
  };

  updatePassword = async () => {
    const self = this;
    this.setState({ isSetPassword: true });
    // eslint-disable-next-line func-names
    setTimeout(async function() {
      await self.setState({ isSetPassword: false, open: true });
    }, 3000);
  };

  open = () => this.setState({ open: true });

  close = () => {
    window.location.href = '/';
    this.setState({ open: false });
  };

  render() {
    const { isCodeValid, isSetPassword, open } = this.state;
    return (
      <Container>
        <Image src={CustomerImage} />
        {!isCodeValid && (
          <div>
            <p className="role">Enter valid code</p>
            <CodeInput />
            <div style={{ textAlign: 'center' }}>
              <Button onClick={this.checkValid}>Reset Password</Button>
            </div>
          </div>
        )}{' '}
        {isCodeValid && (
          <div>
            <p className="role">Enter New Password</p>
            <Input type="password" />
            {isSetPassword && (
              <Dimmer active>
                <Loader />
              </Dimmer>
            )}
            <div style={{ textAlign: 'center' }}>
              <Button onClick={this.updatePassword}>Reset Password</Button>
            </div>
          </div>
        )}
        <Modal open={open} onOpen={this.open} onClose={this.close} size="small">
          <HelpModalContent>
            <p className="description">Your password has been reset</p>
          </HelpModalContent>
          <Button color="green" style={{ float: 'right' }} onClick={this.close} inverted>
            <Icon name="checkmark" /> Ok
          </Button>
        </Modal>
      </Container>
    );
  }
}

export default ResetPassword;
