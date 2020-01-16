import styled from 'styled-components';
import { device } from '../../constants/device';

export const ModalCancelButton = styled.button`
  & {
    display: flex;
    width: 125px !important;
    height: 42px;
    background: #ff7f00 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 20px #00000033;
    border: unset;
    border-radius: 5px;
    margin-left: 60px;
    font: 15px Semibold Open Sans, sans-serif;
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
`;

export const ModalVerifyButton = styled.button`
  & {
    display: flex;
    width: 125px !important;
    height: 42px;
    background: #00a7fa 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 20px #00000033;
    border: unset;
    border-radius: 5px;
    margin-left: 50px;
    font: 15px Semibold Open Sans, sans-serif;
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
  & i {
    color: white !important;
    font-size: 12px !important;
  }
`;
