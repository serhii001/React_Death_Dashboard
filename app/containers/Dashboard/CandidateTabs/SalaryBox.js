import React, { Component } from 'react';
import { Form, Radio } from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled.div`
  & {
    display: flex;
    flex-direction: row;
  }
  & > .field {
    margin-bottom: 0px !important;
  }
  & .language label {
    font: 16px Medium Lato !important;
    letter-spacing: 0 !important;
    color: #959494 !important;
    padding: 7px 25px !important;
    &:before {
      width: 24px !important;
      height: 24px !important;
      top: 5px !important;
      border: 2px solid #00a7fa !important;
    }
    &:after {
      top: -1px !important;
      left: -6px !important;
      width: 36px !important;
      height: 36px !important;
      background-color: #00a7fa !important;
    }
  }
`;
export default class SalaryBox extends Component {
  state = { value: 'MONTHLY' };
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e, { value }) => {
    this.setState({ value: value });
    this.props.handleChange(this.props.parent, this.props.type, value);
  };
  render() {
    const { radioGroupName, boxValue } = this.props;
    return (
      <Container>
        <Form.Field>
          <Radio
            label="Annual"
            name={radioGroupName}
            value="ANNUAL"
            className="language"
            checked={boxValue === 'ANNUAL'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="Monthly"
            name={radioGroupName}
            value="MONTHLY"
            className="language"
            checked={boxValue === 'MONTHLY'}
            onChange={this.handleChange}
          />
        </Form.Field>
      </Container>
    );
  }
}
