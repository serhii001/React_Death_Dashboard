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
  & .language {
    margin: 0px !important;
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
export default class LanguageBox extends Component {
  state = { value: this.props.value };
  handleChange = (e, { value }) => this.setState({ value });

  render() {
    return (
      <Form>
        <Container>
          <Form.Field>
            <Radio
              label="English"
              name="radioGroup"
              value="english"
              className="language"
              checked={this.state.value === 'english'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Spanish"
              name="radioGroup"
              value="spanish"
              className="language"
              checked={this.state.value === 'spanish'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Container>
      </Form>
    );
  }
}
