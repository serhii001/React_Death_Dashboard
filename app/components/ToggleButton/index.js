import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  & .button {
    position: relative;
    display: inline-block;
    vertical-align: baseline;
    padding: 8px;
    font: 17px Medium Lato !important;
    letter-spacing: 0.1em;
    color: #9ea0a5 !important;
    background-color: white !important;
    border: 1px solid #ebebeb;
    cursor: pointer;
    &:hover {
      color: #5fa1fc !important;
    }
    &.selected {
      color: #5fa1fc !important;
    }
    &.unselected {
      color: #9ea0a5 !important;
    }
    &.left-round {
      border-radius: 15px 0 0 15px !important;
      text-align: right;
      box-shadow: 0px 3px 3px #9594944e;
    }
    &.right-round {
      border-radius: 0 15px 15px 0 !important;
      text-align: left;
      box-shadow: 2px 3px 3px 0px #9594944e;
    }
  }
`;

class ToggleButton extends React.Component {
  state = {
    formType: 1
  };

  render() {
    const { formType } = this.state;
    const { leftLabel, rightLabel } = this.props;
    return (
      <Container>
        <div
          className={'button left-round ' + (formType === 1 ? 'selected' : 'unselected')}
          onClick={() => this.setState({ formType: 1 })}
        >
          {leftLabel}
        </div>
        <div
          className={'button right-round ' + (formType === 2 ? 'selected' : 'unselected')}
          onClick={() => this.setState({ formType: 2 })}
        >
          {rightLabel}
        </div>
      </Container>
    );
  }
}

export default ToggleButton;
