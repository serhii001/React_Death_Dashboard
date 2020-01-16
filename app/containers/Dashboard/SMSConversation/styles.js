import styled from "styled-components";
import { Input, Icon } from "semantic-ui-react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 4px 4px 7px #00000055;
  border: 1px solid #d8d8d8;
  border-radius: 25px;
  opacity: 1;
  padding: 15px 10px;
  align-items: center;
  max-height: 70%;
  min-height: 400px;
`;

export const ContainerCOllapsed = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 4px 4px 7px #00000055;
  border: 1px solid #d8d8d8;
  border-radius: 25px;
  opacity: 1;
  padding: 15px 10px;
  align-items: center;
`;

export const IconClose = styled(Icon)`
  color: #AC2E2E;
`;

export const IconCollapse = styled(Icon)`
  color: #959494;
`;

export const IconSend = styled(Icon)`
  color: #00A7FA;
  margin-left: 16px;
`;

export const IconExpand = styled(Icon)`
  color: #20CB96;
`;

export const NameBox = styled.div`
  text-align: center;
  font: Regular 28px Lato;
  letter-spacing: 0;
  color: #00A7FA;
  opacity: 1;
  border-bottom: 1px solid #E8E9EC;
  width: 100%;
  position: relative;
  padding: 5px 0 10px;
`;

export const NameBoxCollapsed = styled.div`
  text-align: center;
  font: Regular 28px Lato;
  letter-spacing: 0;
  color: #00A7FA;
  opacity: 1;
  width: 100%;
  position: relative;
`;

export const ActionIcons = styled.div`
  position: absolute;
  right 0;
  top: 0;
  display: flex;
  flex-direction: row;
  & div {
    margin-left: 8px;
  }
`;

export const Messages = styled.div`
  width: 100%;
  flex: 1;
  overflowY: auto; 
  padding: 10px;
`;

export const DateLabel = styled.div`
  text-align: center;
  font: Semibold 15px Open Sans;
  letter-spacing: 3px;
  color: #959494;
  opacity: 1;
  margin: 20px 0;
`;

export const MessageDate = styled.div`
  text-align: left;
  font: Regular 17px Source Sans Pro;
  letter-spacing: 0;
  color: #707070;
  opacity: 0.5;
`;
export const MessageLeftWrap = styled.div`
  text-align: left;
  font: Regular 20px Helvetica Neue;
  letter-spacing: 0;
  color: #00A7FA;
  opacity: 1;
  width: 100%;
`;

export const MessageLeft = styled.div`
  background: #D8D8D8 0% 0% no-repeat padding-box;
  opacity: 1;
  text-align: left;
  font: Regular 20px Lato;
  letter-spacing: 0;
  color: #4D4F5C;
  opacity: 1;
  padding: 12px 20px;
  border-radius: 15px;
  border-bottom-left-radius: 0px;
  max-width: 60%;
  margin-bottom: 10px;
`;

export const MessageRightWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font: Regular 20px Helvetica Neue;
  letter-spacing: 0;
  color: #00A7FA;
  opacity: 1;
  width: 100%;
  & span {
    max-width: 30%;
    margin-right: 16px;
  }
`;

export const MessageRight = styled.div`
  background: #00A7FA 0% 0% no-repeat padding-box;
  opacity: 1;
  text-align: left;
  font: Regular 20px Lato;
  letter-spacing: 0;
  color: #fff;
  opacity: 1;
  padding: 12px 20px;
  border-radius: 15px;
  border-bottom-right-radius: 0px;
  max-width: 50%;
  margin-bottom: 10px;
`;

export const Footer = styled.div`
  width: 100%;
  padding-top: 10px;
  border-top: 1px solid #E8E9EC;
`;

export const InputBoxWrap  = styled(Input)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 16px;
`;
export const InputBox  = styled(Input)`
  flex: 1;
`;
