import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Input, Icon, Form } from 'semantic-ui-react';

import {
  passwordResetRequest,
  passwordResetAgain,
  confirmPhoneCode,
  passwordReset,
  retryPasswordRequest,
  updatePhoneCodeValid
} from '../../redux/actions/auth';
import { ModalCancelButton, ModalVerifyButton } from './styles';
import HelpModal from './HelpModal';
import CodeInput from './CodeInput';

const ModalContent = styled.div`
  border-radius: 25px;
  padding: 30px 50px 50px;
  & .header {
    font: 18px Regular Lato;
    letter-spacing: 3px;
    color: #006ad5;
    display: block;
  }
  & .description {
    font: 18px Regular Lato;
    letter-spacing: 2.6px;
    color: #959494;
  }
  & .description .linkButton {
    text-decoration: underline;
    font: 18px Regular Lato;
    letter-spacing: 2.6px;
    color: #006ad5;
    cursor: pointer;
  }
  & input {
    width: 320px;
    border-radius: 20px !important;
    font-size: 16px;
  }
  & p.error {
    font: 15px Regular Lato;
    color: red;
    padding: 10px;
  }
  & .notification {
    margin: 30px 0px;
    letter-spacing: 2.6px;
    font: 22px Regular Lato;
    color: #00000;
    & span {
      color: #006ad5;
    }
  }
`;

const ModalAction = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  margin-left: 95px;
  & span {
    padding-top: 10px;
    font: 20px Semibold Open Sans;
    letter-spacing: 2.4px;
    color: #000000;
  }
  & i {
    color: #00a7fa;
    font-size: 28px;
    cursor: pointer;
    transform: rotate(225deg);
  }
`;

class ResendModal extends Component {
  state = {
    open: false,
    closeOnEscape: false,
    closeOnDimmerClick: false,
    username: null,
    digitCode: null,
    password: null,
    usernameIsRequired: false
  };

  show = () => this.setState({ open: true });

  close = () =>
    this.setState({
      open: false,

      closeOnEscape: false,
      closeOnDimmerClick: false
    });

  onEnterUsername = e => {
    this.setState({ username: e.target.value });
    this.setState({ usernameIsRequired: false });
    if (e.target.value === '') {
      const { dispatch } = this.props;
      dispatch(retryPasswordRequest());
    }
  };

  continue = () => {
    const { username } = this.state;
    const { dispatch } = this.props;
    if (username !== '' && username != null) {
      this.setState({ usernameIsRequired: false });
      dispatch(passwordResetRequest({ username }));
    } else {
      this.setState({ usernameIsRequired: true });
    }
  };

  tryagain = () => {
    const { dispatch } = this.props;
    this.setState({ username: null });
    dispatch(passwordResetAgain());
  };

  submit = () => {
    const { digitCode } = this.state;
    const { dispatch } = this.props;
    dispatch(confirmPhoneCode(digitCode));
  };

  submitNewPassword = () => {
    const { password } = this.state;
    const { dispatch } = this.props;
    dispatch(passwordReset({ password }));
  };

  confirmNewPassword = () => {
    window.location.href = '/login';
  };

  getCode = value => {
    this.setState({ digitCode: value });
    const { dispatch } = this.props;
    dispatch(updatePhoneCodeValid());
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  render() {
    const { open, closeOnEscape, closeOnDimmerClick, username, usernameIsRequired } = this.state;
    const { auth } = this.props;
    return (
      <div>
        <Modal
          style={{ borderRadius: '25px', width: '560px' }}
          dimmer="blurring"
          open={open}
          onClose={this.close}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          closeIcon={closeOnEscape}
        >
          <ModalContent>
            {auth.verifyTokenSent === false ? (
              <div>
                <p className="header">Lets get you signed in!</p>
                <p className="description">Enter your phone number, email or user ID</p>
                <Input placeholder="Type here..." onChange={e => this.onEnterUsername(e)} error={usernameIsRequired} />
                {auth.resetTokenSentFailed && username !== '' && <p className="error">No such user exists</p>}
                {usernameIsRequired && <p className="error">Username is required</p>}
                <ModalAction>
                  <ModalCancelButton onClick={this.close}>Cancel</ModalCancelButton>
                  <ModalVerifyButton onClick={this.continue}>
                    Continue{auth.currentlySendingResetToken && <Icon loading name="spinner" />}
                  </ModalVerifyButton>
                </ModalAction>
              </div>
            ) : !auth.validatePhoneCode ? (
              <div>
                <p className="header">Please verify your code!</p>
                <p className="description">We sent a code to your phone number.</p>
                <p className="notification">
                  We sent a code to:
                  <span>*****{auth.phoneLast4}</span>
                </p>
                <CodeInput getCode={this.getCode} isValid={auth.phoneCodeValid} />
                <p className="description">
                  Didn&apos;t receive a code?
                  <span className="linkButton" onClick={this.tryagain} onKeyDown={() => {}} role="button" tabIndex={0}>
                    Try again{auth.currentlySendingResetToken && <Icon loading name="spinner" />}
                  </span>
                </p>
                <p className="description">
                  Need assistance?
                  <HelpModal onSubmit={this.close} />
                </p>
                <ModalVerifyButton onClick={this.submit} style={{ float: 'right' }}>
                  Submit{auth.currentlySendingResetToken && <Icon loading name="spinner" />}
                </ModalVerifyButton>
              </div>
            ) : !auth.validateResetPassword ? (
              <div>
                <Form style={{ textAlign: 'center' }}>
                  <p className="header">Enter New Password</p>
                  <Input
                    style={{ width: '250px', margin: '15px' }}
                    type="password"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                  <div>
                    <ModalVerifyButton onClick={this.submitNewPassword} style={{ margin: 'auto' }}>
                      Submit{auth.currentlySendingResetToken && <Icon loading name="spinner" />}
                    </ModalVerifyButton>
                  </div>
                </Form>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p className="header">
                  <Icon name="check circle" />
                  Password reset successful!
                </p>
                <ModalVerifyButton onClick={this.confirmNewPassword} style={{ margin: 'auto' }}>
                  Ok
                </ModalVerifyButton>
              </div>
            )}
          </ModalContent>

          {/* <HelpModal /> */}
        </Modal>
      </div>
    );
  }
}

ResendModal.propTypes = {
  onRef: PropTypes.func
};

export default connect(({ auth }) => ({ auth }))(ResendModal);
