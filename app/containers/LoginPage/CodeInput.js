import React, { Component } from 'react';
import ReactCodeInput, { reactCodeInput } from 'react-code-input';

const props = {
  className: reactCodeInput,
  inputStyle: {
    fontFamily: 'monospace',
    MozAppearance: 'textfield',
    boxShadow: '0px 2px 4px #ACACAC',
    border: '1px solid #ADADAD',
    margin: '4px',
    width: '60px',
    height: '90px',
    fontSize: '32px',
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center'
  },
  inputStyleInvalid: {
    fontFamily: 'monospace',
    MozAppearance: 'textfield',
    boxShadow: '0px 2px 4px #ACACAC',
    border: '1px solid rgb(238, 211, 215)',
    margin: '4px',
    width: '60px',
    height: '90px',
    fontSize: '32px',
    color: 'rgb(185, 74, 72)',
    backgroundColor: 'rgb(242, 222, 222)',
    textAlign: 'center'
  }
};

// eslint-disable-next-line react/prefer-stateless-function
export default class CodeInput extends Component {
  state = {
    value: ''
  };
  onChange = value => {
    this.setState({ value });
    console.log(' ', this.state.value);
    this.props.getCode(value);
  };
  render() {
    const { isValid } = this.props;
    return (
      <ReactCodeInput
        onChange={this.onChange}
        type="text"
        inputMode="numeric"
        fields={6}
        isValid={isValid}
        {...props}
      />
    );
  }
}
