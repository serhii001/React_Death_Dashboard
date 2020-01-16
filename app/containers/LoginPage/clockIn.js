import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image, Icon } from 'semantic-ui-react';

import { device } from '../../constants/device';

import customerImage from '../../assets/images/customer.png';

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
    font: 50px Light Open Sans, sans-serif;
    letter-spacing: 0;
    color: #2fbaff;
    margin: 5px;
  }
  & .role {
    font: 22px Regular Lato, sans-serif;
    letter-spacing: 0;
    color: #959494;
  }
  & .date {
    font: 25px Medium Lato, sans-serif;
    letter-spacing: 0;
    color: #2fbaff;
  }
  & .timeIcon {
    margin: 5px;
    font-size: 40px;
    color: #2fbaff;
  }
  & .time {
    font: 22px Medium Lato, sans-serif;
    letter-spacing: 0;
    color: #707070;
    margin: 0px;
  }
`;

const ClockInButton = styled.button`
  & {
    display: inline-flex;
    width: 170px;
    height: 62px;
    margin: 25px;
    background: #2fbaff 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 20px #00000033;
    border: unset;
    border-radius: 5px;
    font: 25px Semibold Open Sans, sans-serif;
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

// eslint-disable-next-line react/prefer-stateless-function
class ClockInWelcome extends React.Component {
  render() {
    return (
      <Container>
        <Image src={customerImage} />
        <p className="name">Sarah Flores</p>
        <p className="role">Sr.Manager - Openers</p>
        <p className="date">February 21,2019</p>
        <p className="timeIcon">
          <Icon name="clock outline" />
        </p>
        <p className="time">2:00 PM - CST</p>
        <ClockInButton>Clock In</ClockInButton>
      </Container>
    );
  }
}

ClockInWelcome.prototype = {
  onRef: PropTypes.func
};
export default ClockInWelcome;
