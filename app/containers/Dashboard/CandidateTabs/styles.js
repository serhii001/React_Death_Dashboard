import styled from "styled-components";
import { Form, Select } from 'semantic-ui-react';
import DatePicker from "react-datepicker";

export const NameLabel = styled.p`
    text-align: center;
    font: 25px Medium Lato;
    margin-bottom: 20px;
    letter-spacing: 0;
    color: #00a7fa;
    opacity: 1;
`;

export const AddressLabel = styled.p`
    text-align: center;
    font: 19px Medium Lato;
    letter-spacing: 0;
    color: #959494;
`;

export const PullSmartCreditButton = styled.button`
    & {
        display: flex;
        width: 200px !important;
        height: 35px;
        background: #00a7fa 0% 0% no-repeat padding-box;
        box-shadow: 0px 10px 20px #00000033;
        border: unset;
        border-radius: 21px;
        font: 16px Regular Lato;
        opacity: 1;
        color: white;
        text-transform: capitalize;
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

export const CancelCallButton = styled.button`
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

export const LabelCall = styled.div`
    text-align: left;
    font: Medium 24px/22px Lato;
    letter-spacing: 0;
    color: #959494;
    opacity: 1;
`;

export const CallActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
`;

export const ExpeditedDecisionButton = styled.button`
    & {
        display: flex;
        width: 200px !important;
        height: 35px;
        background: #ac2e2e 0% 0% no-repeat padding-box;
        box-shadow: 0px 10px 20px #00000033;
        border: unset;
        border-radius: 21px;
        font: 16px Regular Lato;
        opacity: 1;
        color: white;
        text-transform: capitalize;
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

export const SubmitToUnderwriterButton = styled.button`
    & {
        display: flex;
        width: 200px !important;
        height: 35px;
        background: #20cb96 0% 0% no-repeat padding-box;
        box-shadow: 0px 10px 20px #00000033;
        border: unset;
        border-radius: 21px;
        font: 16px Regular Lato;
        opacity: 1;
        color: white;
        text-transform: capitalize;
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

export const BoldLabel = styled.span`
    text-align: left;
    font: 16px Bold Lato;
    letter-spacing: 0;
    color: #959494;
`;

export const BoldLabelTitle = styled.span`
    text-align: left;
    font: 16px Bold Lato;
    letter-spacing: 0;
    color: #959494;
    margin-bottom: 20px;
    margin-top: 10px;
`;

export const MediumLabel = styled.span`
    text-align: left;
    font: 16px Medium Lato;
    letter-spacing: 0;
    color: #959494;
    & span {
        color: #ff7f00;
        margin-left: 20px;
    }
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    & .call {
        width: 60%;
        & input {
            border-radius: 20px !important;
            padding: 7px 10px;
            margin: 2px;
            color: #00a7fa;
        }
    }
    & .longcall {
        width: 75%;
        & input {
            border-radius: 20px !important;
            padding: 7px 10px;
            margin: 2px;
            color: #00a7fa;
        }
    }
    & .small,
    & .medium {
        width: 70%;
        & input {
            border-radius: 20px !important;
            padding: 7px 10px;
            margin: 2px;
        }
    }
`;
export const AutoFill = styled.div`
  padding: 78px 30px 20px 20px;
  color: #20CB96;
  font: 16px Medium Lato !important;
  & a {
    color: #20CB96;
    text-decoration: underline;
    cursor: pointer;
  }
  a:hover {
    color: #20CB96;
  }
`;
export const InlineItem = styled.div`
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  width: ${props => props.width ? props.width + 'px' : 'auto'};
  & label {
    margin-bottom: 5px;
  }
`;
export const FormRight = styled(Form)`
  & .fields {
    justify-content: flex-end;
  }
`;
export const DatePickerWrap = styled(DatePicker)`
  border: 1px solid #ddd;
  border-radius: 15px;  
  outline: none;
  padding-left: 20px;
  line-height: 24px !important;
  width: 120px;
  font-size: 12px !important;
  min-height: 1em !important;
  & .react-datepicker {
    background: #00A7FA !important;
  }
`;
export const SelectWrap = styled(Select)`
  border: 1px solid #ddd !important;
  border-radius: 15px !important;  
  outline: none !important;
  font-family: Lato;
  line-height: 1.21428571em !important;
  min-height: 1.21428571em !important;
  padding: 0.37857143em 1em !important;
  font-size: 1em !important;
`;
