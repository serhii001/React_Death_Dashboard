import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const YourselfApplicationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const YourselfApplicationContactContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  margin-bottom: 20px;
`;
export const YourselfApplicationContactColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  & label {
    text-align: left;
    font: 16px Medium Lato !important;
    letter-spacing: 0;
    color: #959494 !important;
  }
  & input {
    border-radius: 20px !important;
    height: 30px !important;
  }
  & .verifybutton button {
    background-color: #00a7fa;
    color: white;
    box-shadow: 0px 3px 5px #0000005a;
    border-radius: 30px;
    margin-top: 16px;
    &:focus {
      outline: unset;
      color: white;
      background-color: #00a7fa;
    }
    &:hover {
      outline: unset;
      color: white;
      opacity: 0.7;
      background-color: #00a7fa;
    }
    &:active {
      color: white;
      opacity: 1;
      background-color: #00a7fa;
    }
  }
`;

export const YourselfApplicationContact2ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  margin-left: 20px;
  & label {
    text-align: left;
    font: 16px Medium Lato !important;
    letter-spacing: 0;
    color: #959494 !important;
  }
  & input {
    border-radius: 20px !important;
    height: 30px !important;
  }
`;
export const YourselfApplicationNameColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  margin-left: 20px;
  & label {
    text-align: left;
    font: 16px Medium Lato !important;
    letter-spacing: 0;
    color: #959494 !important;
  }
  & input {
    border-radius: 20px !important;
    height: 30px !important;
  }
`;
export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  & label {
    text-align: left;
    font: 16px Medium Lato !important;
    letter-spacing: 0;
    color: #959494 !important;
  }
  & input {
    border-radius: 20px !important;
    height: 30px !important;
  }
`;
