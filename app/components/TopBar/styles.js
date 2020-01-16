import styled from 'styled-components';
import { Container, Input, Icon, Image, Dropdown, Button, Grid } from 'semantic-ui-react';
import { device } from '../../constants/device';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ListColumn = styled('div')`
  display: flex;
  flex-direction: column;
  font-family: Lato, Arial, sans-serif;
  font-size: 12px;
  line-height: 15px;
  font-weight: normal;
  text-transform: none;
  letter-spacing: 0;
  color: ${props => props.color};
  padding: 16px;
  label {
    margin: 6px 0;
  }
`;
export const SearchWrapper = styled('div')`
  width: 100%;
  height: 59px;
  border: 1px solid #959494;
  border-radius: 36px;
  display: flex;
  flex-direction: row;
  padding: 0 34px;
`;
export const Search = styled(Input)`
  flex: 1;
  height: 100%;
  input {
    border: none !important;
    background: transparent !important;
    padding-left: 60px !important;
    font-family: Roboto, Arial, sans-serif;
    font-size: 28px;
    line-height: 28px;
    &::placeholder {
      color: #d8d8d8 !important;
    }
  }
  .icon {
    font-size: 24px;
    color: #d8d8d8;
  }
`;
export const Wrapper = styled(Container)`
  border-bottom: 1px solid #5fa1fc;
  height: 100%;
  padding: 0 !important;
`;
export const Filters = styled(Dropdown)`
  width: 30%;
  height: 100%;
  border: none;
  border-right: 1px solid #959494;
  display: flex !important;
  flex-direction: row;
  align-items: center;
  justify-content: space-between !important;
  padding-right: 30px;
  text-transform: uppercase;
  font-family: Roboto, Arial, sans-serif;
  font-size: 22px;
  letter-spacing: 0;
  color: #d8d8d8;
  min-width: 160px;
  .menu {
    width: 100% !important;
  }
  .icon {
    line-height: 1em;
  }
`;

export const TopIcon = styled('div')`
  position: relative;
  .label {
    border-radius: 10px !important;
    background-color: #ac2e2e !important;
    padding: 5px 7px !important;
  }
`;
export const LogoWrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 57px;
  padding-top: 15px;
  align-items: center;
  margin-bottom: 43px;
`;
export const TopLogo = styled('div')`
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 43px;
  line-height: 38px;
  font-weight: 100;
  letter-spacing: 0;
  color: #393c40;
  text-transform: uppercase;
  text-align: right;
  width: auto;
  padding: 0;
  margin-right: 70px;
  margin-left: 12px;
`;
export const VericalDivider = styled('div')`
  width: 1px;
  height: 100%;
  background: #959494;
  margin: 0 42px 0 31px;
`;

export const Avatar = styled(Image)`
  width: 46px;
  height: 46px;
  display: block;
  border-radius: 50%;
`;
export const IconWrap = styled(Icon)`
  font-size: 35px !important;
  color: #9ea0a5;
  margin-left: 16px !important;
  display: block !important;
  height: auto !important;
`;
export const TopTitle = styled('div')`
  text-align: left;
  font-family: Lato, Arial, sans-serif;
  font-size: 40px;
  line-height: 40px;
  font-weight: 500;
  letter-spacing: 0;
  color: #5fa1fc;
  margin-right: 25px;
`;
export const TopBox = styled(Container)`
  display: flex !important;
  flex-direction: row !important;
  align-items: center;
  flex-wrap: nowrap;
  & > div {
    margin-bottom: 16px;
  }
  @media (max-width: 1600px) {
    flex-wrap: wrap;
  }
`;
export const SearchBox = styled('div')`
  flex: 1;
  margin-right: 13px;
`;
export const SearchComponent = styled(Search)`
  width: 100%;
  & > div {
    width: 100%;
  }
  & i.icon {
    font-size: 20px !important;
  }
  & imput {
    width: 100%;
    height: 59px;
    min-width: 500px;
  }
`;
export const InfoWrapper = styled('div')`
  width: 620px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 30px;
  margin-left: 10px;
  min-height: 99px;
  height: 99px !important;
`;
export const TitleInfo1 = styled('div')`
  text-align: left;
  font-family: Lato, Arial, sans-serif;
  font-size: 22px;
  line-height: 25px;
  font-weight: 500;
  letter-spacing: 0;
  color: #5fa1fc;
  text-transform: uppercase;
  margin-bottom: 48px;
`;
export const TitleInfo2 = styled('div')`
  text-align: left;
  font-family: Lato, Arial, sans-serif;
  font-size: 22px;
  line-height: 25px;
  font-weight: 500;
  letter-spacing: 0;
  color: #5fa1fc;
  text-transform: uppercase;
`;
export const InfoSectionTop = styled('div')`
  text-align: left;
  font-family: Lato, Arial, sans-serif;
  font-size: 36px;
  line-height: 25px;
  font-weight: 500;
  letter-spacing: 0;
  color: ${props => props.color};
  & span {
    text-align: left;
    font-family: Lato, Arial, sans-serif;
    font-size: 21px;
    line-height: 25px;
    font-weight: 500;
    letter-spacing: 0;
    color: #959494 !important;
  }
  & .progress {
    margin-top: 10px !important;
  }
  & .progress > div {
    height: 13px !important;
    border-radius: 6px !important;
  }
  & .progress > div {
    background: ${props => props.color} !important;
  }
`;
export const InfoSectionBottom = styled('div')`
  text-align: left;
  font-family: Lato, Arial, sans-serif;
  font-size: 22px;
  line-height: 25px;
  font-weight: 500;
  letter-spacing: 0;
  color: ${props => props.color};
  margin-right: ${props => props.margin || 0}px !important;
`;
export const SaveButton = styled(Button)`
  border-radius: 20px !important;
  background: #20cb96 !important;
  color: #fff !important;
  width: fit-content !important;
  margin-top: 16px !important;
`;
export const FieldLabel = styled('div')`
  font-size: 16px !important;
  line-height: 16px;
  text-transform: none;
  color: #000;
  margin-bottom: 8px;
`;
export const DatePickerWrap = styled(DatePicker)`
  border: 1px solid #ddd;
  border-radius: 15px;  
  outline: none;
  padding-left: 20px;
  line-height: 24px !important;
  width: 150px;
`;
export const GridWrap = styled(Grid)`
  width: 440px;
`;
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
