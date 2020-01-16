import styled from "styled-components";
import { Radio, Select, Input, Icon, Checkbox } from "semantic-ui-react";
import DatePicker from "react-datepicker";

export const Container = styled.div`
  display: block;
  flex-direction: column;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 4px 4px 7px #00000055;
  border: 1px solid #d8d8d8;
  border-radius: 11px;
  opacity: 1;
  padding: 15px;
  align-items: center;
  max-height: 70%;
  min-height: 400px;
  width: 400px;
  min-width: 400px;
`;

export const IconClose = styled(Icon)`
  color: #AC2E2E;
  height: 1.5em;
`;

export const IconBell = styled(Icon)`
  color: #FF0000;
  height: 1.5em;
`;

export const NameBox = styled.div`
  width: 100%; 
  font: Medium 28px Lato;
  letter-spacing: 0;
  color: #00A7FA;
  opacity: 1;
  text-transform: uppercase;
  padding: 0 15px 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Wrapper = styled.div`
  padding: 15px 25px;
  widthL 100%;
  border-bottom: 1px solid #ddd;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled.div`
  text-align: left;
  font: 10px Lato;
  line-height: 21px;
  letter-spacing: 0;
  color: #9EA0A5;
  opacity: 1;
`;

export const LabelBlack = styled.div`
  text-align: left;
  font: 12px Lato;
  line-height: 28px;
  letter-spacing: 0;
  color: #3E3F42;
  opacity: 1;
  margin-right: 10px;
`;

export const CheckboxWrap = styled(Checkbox)`
  & input {
    margin-right: 5px; 
  }
  & label {
    text-align: left;
    font: 10px Lato !important;
    line-height: 24px;
    letter-spacing: 0;
    color: #9EA0A5 !important;
    opacity: 1;
    white-space: nowrap;
  }
`;

export const SelectWrap = styled(Select)`
  width: 65px !important;
  font-size: 12px;
  line-height: 20px !important;
`;

export const DatePickerWrap = styled(DatePicker)`
  border: 1px solid #ddd;
  border-radius: 15px;  
  outline: none;
  padding-left: 20px;
  
  line-height: 24px !important;
  width: 150px;
  font-size: 12px !important;
  & .react-datepicker {
    background: #00A7FA !important;
  }
`;

export const LinkWrap = styled.a`
  text-align: left;
  text-decoration: underline;
  font: 12px Lato !important;
  line-height: 26px !important;
  letter-spacing: 0;
  color: #3E3F42;
  opacity: 1;
  margin-left: 12px;
`;

export const RadioWrap = styled(Radio)`
  & label {
    font: 12px Medium Lato !important;
    letter-spacing: 0 !important;
    color: #3E3F42 !important;
    padding: 7px 25px !important;
    &:before {
      width: 23px !important;
      height: 23px !important;
      top: 5px !important;
      border: 2px solid #00a7fa !important;
      padding-right: 5px;
    }
    &:after {
      top: -1.5px !important;
      left: -6.1px !important;
      width: 35.5px !important;
      height: 35.5px !important;
      background-color: #00a7fa !important;
    }
  }
`;

export const LeftBox = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 16px; 
`;
export const ActionIcons = styled.div`
  position: absolute;
  right 10px;
  top: 5px;
  display: flex;
  flex-direction: row;
  & div {
    margin-left: 8px;
  }
`;

export const CancelCallButton = styled.button`
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

export const YesCallButton = styled.button`
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
        border-radius: 5px;
        opacity: 1;
        margin-left: 12px;
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

export const ActionBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
