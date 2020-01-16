import styled from "styled-components";
import { Input, Icon, Table } from "semantic-ui-react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 4px 4px 7px #00000055;
  border: 1px solid #d8d8d8;
  border-radius: 11px;
  opacity: 1;
  padding: 0;
  align-items: center;
  max-height: 70%;
  max-height: 400px;
`;

export const IconClose = styled(Icon)`
  color: #AC2E2E;
`;

export const IconPlay = styled(Icon)`
  color: #20CB96 !important;
  margin-bottom: 40px !important;
`;

export const NameBox = styled.div`
  text-align: left;
  font: Medium 28px Lato;
  letter-spacing: 0;
  color: #00A7FA;
  opacity: 1;
  text-transform: uppercase;
  padding: 0 10px 10px;
`;

export const RecordTable = styled(Table)`
  border-color: transparent !important;
  border-radius: 11px !important;
  margin-bottom: 0 !important;
  &.ui.selectable.table tbody tr:hover,  &.ui.selectable.table tbody tr.active {
    background: #00A7FA !important;
  }
  &.ui.selectable.table tbody tr:hover td, &.ui.selectable.table tbody tr.active td {
    color: #fff !important;
  }
}
`;

export const RecordRow = styled(Table.Row)`
  &:last-child td {
    border-bottom: none !important;
  }
`;

export const RecordCell = styled(Table.Cell)`
  font: Regular 27px Lato;
  letter-spacing: 0;
  color: #707070;
  padding: 15px !important;
  border-bottom: 1px solid #ddd !important;
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

export const CallBox = styled.div`
  width: 100%;
  padding-top: 10px;
  border-top: 1px solid #ddd;
`;

export const CallBoxActions  = styled(Input)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  position: relative;
`;
export const CallBackLink  = styled.a`
  text-align: left;
  text-decoration: underline;
  font: Regular 27px Lato;
  line-height: 33px;
  letter-spacing: 0;
  color: #00A7FA;
  margin-top: 40px;
  &:hover {
    color: #00A7FA;
  }
`;
export const DeleteLink  = styled.a`
  text-align: left;
  text-decoration: underline;
  font: Regular 27px Lato;
  line-height: 33px;
  letter-spacing: 0;
  margin-top: 40px;
  color: #AC2E2E;
  &:hover {
    color: #AC2E2E;
  }
`;
