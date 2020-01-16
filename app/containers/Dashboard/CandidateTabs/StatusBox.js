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
export const BoldLabelTitle = styled.span`
  text-align: left;
  font: 16px Bold Lato;
  letter-spacing: 0;
  color: #959494;
  line-height: 28px;
  margin-right: 16px;
`;

export default class StatusBox extends Component {
  handleChange = (e, { value }) => {
    const { onChange } = this.props;
    onChange(value);
  }

  render() {
    const { label, value } = this.props;
    return (
      <Form>
        <Container>
          <BoldLabelTitle>{label}</BoldLabelTitle>
          <Form.Field>
            <Radio
              label="Employed"
              name="radioGroup"
              value="employed"
              className="language"
              checked={value === 'employed'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Retired"
              name="radioGroup"
              value="retired"
              className="language"
              checked={value === 'retired'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Student"
              name="radioGroup"
              value="student"
              className="language"
              checked={value === 'student'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Unemployed"
              name="radioGroup"
              value="unemployed"
              className="language"
              checked={value === 'unemployed'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Container>
      </Form>
    );
  }
}
