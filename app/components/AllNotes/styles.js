import styled from 'styled-components';
import { Grid, Checkbox } from 'semantic-ui-react';

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

export const GridWrap = styled(Grid)`
  width: 240px;
`;

export const RadioWrap = styled(Checkbox)`
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
