import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

const WrapBox = styled.div`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 1px 1px 6px #00ABFF;
  border: 1px solid #707070;
  border-radius: 11px;
  opacity: 1;
  padding: 10px 25px 30px;
  width: auto;
  left: ${props => props.originEl.left - 100}px;
  bottom: ${props => props.originEl.top + 20}px;
  position: absolute;
  z-index: 100;
  text-align: center;
`;
const CallActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;
const CancelCallButton = styled.div`
  & {
      display: flex;
      min-width: 70px;
      height: 30px;
      box-shadow: 0px 10px 20px #00000033;
      border: unset;
      font: 16px Regular Lato;
      color: white;
      text-transform: capitalize;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: #FF7F00 0% 0% no-repeat padding-box;
      border-radius: 5px;
      opacity: 1;
      margin: 0 10px;
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
const YesCallButton = styled.div`
  & {
      display: flex;
      min-width: 70px;
      height: 30px;
      box-shadow: 0px 10px 20px #00000033;
      border: unset;
      font: 16px Regular Lato;
      color: white;
      text-transform: capitalize;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: #00A7FA 0% 0% no-repeat padding-box;
      border-radius: 5px;
      opacity: 1;
      margin: 0 10px;
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
const IconClose = styled(Icon)`
  color: #FF0000 !important;
`;
const Label = styled.div`
  text-align: center;
  font: Regular 27px Lato;
  line-height: 33px;
  letter-spacing: 0;
  color: #707070;
  opacity: 1;
`;

class ConfirmPopup extends React.Component {
  render() {
    const { show, originEl = {}, onClose, onSubmit } = this.props;

    return show && (
      <WrapBox originEl={originEl}>
        <IconClose size="huge" name="times circle" />
        <Label>Are you sure?</Label>
        <CallActions>
          <CancelCallButton onClick={onClose}>Cancel</CancelCallButton>
          <YesCallButton onClick={onSubmit}>Yes</YesCallButton>
        </CallActions>
      </WrapBox>
    );
  }
}

export default ConfirmPopup;
