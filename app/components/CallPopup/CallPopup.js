import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import PhoneDropdown from "../../containers/Dashboard/CandidateTabs/PhoneDropdown";

const CallBox = styled.div`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 1px 1px 6px #00ABFF;
  border: 1px solid #707070;
  border-radius: 11px;
  opacity: 1;
  padding: 15px 10px;
  width: auto;
  left: ${props => props.originEl.left - 100}px;
  bottom: ${props => props.originEl.top + 20}px;
  position: absolute;
  z-index: 100;
`;
const LabelCall = styled.div`
    text-align: left;
    font: Medium 24px/22px Lato;
    letter-spacing: 0;
    color: #959494;
    opacity: 1;
`;

const CallActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
`;
const CancelCallButton = styled.button`
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

const YesCallButton = styled.button`
    & {
        display: flex;
        min-width: 70px;
        height: 30px;
        border: unset;
        font: 16px Regular Lato;
        color: white;
        text-transform: capitalize;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background: #00A7FA 0% 0% no-repeat padding-box;
        box-shadow: 0px 10px 20px #00000033;
        border-radius: 5px;
        opacity: 1;
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

class CallPopup extends React.Component {
  render() {
    const { show, originEl = {}, onClose, onSubmit } = this.props;

    return show && (
      <CallBox originEl={originEl}>
        <PhoneDropdown />
        <CallActions>
          <LabelCall>Call?</LabelCall>
          <CancelCallButton onClick={onClose}>Cancel</CancelCallButton>
          <YesCallButton onClick={onSubmit}>Yes</YesCallButton>
        </CallActions>
      </CallBox>
    );
  }
}

export default CallPopup;
