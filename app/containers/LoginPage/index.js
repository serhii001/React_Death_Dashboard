import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Image, Icon } from 'semantic-ui-react';

import DeviceVerifyModal from './DeviceVerifyModal';
import { loginRequest } from '../../redux/actions/auth';
import { device } from '../../constants/device';

import LogoImage from '../../assets/images/logo.png';
import ResendModal from './ResendModal';

import GlobalStyle from '../../global-styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  & img {
    width: 120px;
  }
  @media ${device.tablet} {
    & img {
      width: 100px;
    }
  }
  @media ${device.mobileL} {
    & img {
      width: 80px;
    }
  }
`;

const LogoLabel = styled.span`
  display: flex;
  padding: 8px 0px;
  text-transform: uppercase;
  text-align: center;
  font: 55px Light Open Sans;
  letter-spacing: 0;
  color: #393c40;
  opacity: 1;
  @media ${device.desktop} {
    font-size: 52px;
  }
  @media ${device.tablet} {
    font-size: 48px;
  }
  @media ${device.mobileL} {
    font-size: 40px;
  }
`;

const LoginFormContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin: 30px;
  & label.error {
    color: red;
    font: 14px Light Open Sans;
  }
  & span.loginerror {
    text-transform: capitalize;
    color: red;
    font: 15px Light Open Sans;
  }
  @media ${device.desktop} {
    margin: 28px;
  }
  @media ${device.tablet} {
    margin: 25px;
  }
  @media ${device.mobileL} {
    margin: 20px;
  }
`;

const LoginLabel = styled.span`
  text-align: center;
  font: 40px Light Open Sans;
  letter-spacing: 0;
  color: #393c40;
  opacity: 1;
  @media ${device.desktop} {
    font-size: 37px;
  }
  @media ${device.tablet} {
    font-size: 34px;
  }
  @media ${device.mobileL} {
    font-size: 30px;
  }
`;

const InputFormControl = styled.div`
  color: #00a7fa !important;
  margin-top: 30px;
  border-radius: 5px;
  opacity: 1;
  font-size: 24px !important;
  width: 504px;
  height: 58px;

  .ui& input {
    text-align: center;
    font-size: 20px;
  }

  & input.error {
    border-color: red !important;
  }

  & i.error {
    color: red;
  }

  @media ${device.tablet} {
    max-width: 420px;
    max-height: 60px;
    font-size: 20px !important;
  }
  @media ${device.mobileL} {
    max-width: 300px;
    max-height: 55px;
    font-size: 18px !important;
  }
`;

const LoginButton = styled.button`
  & {
    display: inline-flex;
    width: 216px;
    height: 50px;
    margin-top: 40px;
    background: #2fbaff 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 20px #00000033;
    border: unset;
    border-radius: 5px;
    font: 27px Semibold Open Sans;
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

const ForgotPasswordControl = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 45px;
`;

const ForgotPasswordLabel = styled.div`
  font: 17px Light Open Sans;
  letter-spacing: 0;
  color: #000000;
`;

const ForgotPasswordButton = styled.div`
  font: 17px Semibold Open Sans;
  letter-spacing: 0;
  color: #006ad5;
  cursor: pointer;
`;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    sendRequest: false
  };

  signIn = () => {
    const { email, password } = this.state;
    const { dispatch } = this.props;
    this.setState({ sendRequest: true });
    if (email === '' || password === '') {
    } else {
      dispatch(loginRequest({ email, password }));
    }
  };

  render() {
    const { email, password, sendRequest } = this.state;
    const { auth } = this.props;
    console.log('currently sending in render', auth.currentlySending);
    return (
      <Container>
        <GlobalStyle />
        <LogoContainer>
          <Image src={LogoImage} />
          <LogoLabel>Logo</LogoLabel>
        </LogoContainer>

        <LoginFormContainer>
          <LoginLabel> Login </LoginLabel>
          <span className="loginerror">{auth.loginError}</span>
          <InputFormControl className="ui left icon input" active>
            <input
              type="email"
              value={email}
              placeholder="Email Address"
              className={sendRequest && password === '' ? 'error' : ''}
              onChange={e => this.setState({ email: e.target.value, sendRequest: false })}
            />
            <i className={'envelope outline icon ' + (sendRequest && password === '' ? 'error' : '')} />
          </InputFormControl>
          {sendRequest && email === '' && <label className="error">Email is required</label>}

          <InputFormControl className="ui left icon input" active>
            <input
              type="password"
              placeholder="Password"
              className={sendRequest && password === '' ? 'error' : ''}
              value={password}
              onChange={e => this.setState({ password: e.target.value, sendRequest: false })}
            />
            <i className={'lock icon ' + (sendRequest && password === '' ? 'error' : '')} />
          </InputFormControl>
          {sendRequest && password === '' && <label className="error">Password is required</label>}
          <LoginButton onClick={this.signIn}>
            Login {auth.currentlySending && <Icon loading name="spinner" />}
          </LoginButton>
          <ForgotPasswordControl>
            <ForgotPasswordLabel>Forget password?&nbsp;</ForgotPasswordLabel>
            <ForgotPasswordButton
              onClick={() => {
                this.resendModal.show();
              }}
            >
              Reset
            </ForgotPasswordButton>
          </ForgotPasswordControl>
        </LoginFormContainer>
        <DeviceVerifyModal
          onRef={ref => {
            this.verifyModal = ref;
          }}
        />
        <ResendModal
          onRef={ref => {
            this.resendModal = ref;
          }}
        />
      </Container>
    );
  }
}

export default connect(({ auth }) => ({ auth }))(Login);
