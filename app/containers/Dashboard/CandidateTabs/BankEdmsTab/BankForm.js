import React from 'react';
import styled from 'styled-components';
import { Grid, Label, Form, Button, Select, Input, Radio } from 'semantic-ui-react';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 4px 4px 7px #00000055;
  border: 1px solid #d8d8d8;
  border-radius: 25px;
  opacity: 1;
  padding: 20px;
  align-items: center;
  & label {
    font: 16px Medium Lato !important;
    letter-spacing: 0;
    color: #959494 !important;
  }
  & .ui.input input,
  & .ui.selection.dropdown {
    border: 1px solid #9ea0a5 !important;
    border-radius: 23px !important;
  }
  & button {
    background-color: #f8f7f7 !important;
    box-shadow: 0px 3px 5px #0000002c !important;
    font: 19px Regular Lato;
    font-weight: 400;
    letter-spacing: 2.6px;
    padding: 8px 20px;
    width: 70%;
    &.green {
      border: 1px solid #20cb96;
      color: #20cb96 !important;
    }
    &.red {
      border: 1px solid #ff6c6c;
      color: #ff6c6c !important;
    }
    &.blue {
      border: 1px solid #5fa1fc;
      color: #5fa1fc !important;
    }
  }
  & span.underline-name {
    text-decoration: underline;
    font: 14px Medium Lato;
    letter-spacing: 0;
    color: #20cb96;
    opacity: 1;
    cursor: pointer;
  }
  & .radio-box {
    margin: 0px !important;
  }
  & .radio-box label {
    font: 16px Medium Lato !important;
    letter-spacing: 0 !important;
    color: #959494 !important;
    padding: 7px 25px !important;
    &:before {
      width: 24px !important;
      height: 24px !important;
      top: 5px !important;
      border: 2px solid #5fa1fc !important;
    }
    &:after {
      top: -1px !important;
      left: -6px !important;
      width: 36px !important;
      height: 36px !important;
      background-color: #5fa1fc !important;
    }
  }
`;

const stateOptions = [
  { key: 'm', text: 'Select One', value: 'male' },
  { key: 'f', text: 'Select Two', value: 'female' },
  { key: 'o', text: 'Select Three', value: 'other' }
];

class BankForm extends React.Component {
  state = {
    payment_method: 'EPPS'
  };
  render() {
    const { payment_method } = this.state;
    return (
      <Panel>
        <Grid columns="3">
          <Grid.Row textAlign="left">
            <Grid.Column width={16}>
              <Label style={{ fontSize: '18px', color: '#5FA1FC', backgroundColor: 'white', paddingLeft: '0px' }}>
                Payment Information
              </Label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row textAlign="left">
            <Grid.Column width={16}>
              <label>Payment Method </label>
              <Radio
                name="radioGroup"
                className="radio-box"
                value={'EPPS'}
                label="EPPS"
                checked={payment_method === 'EPPS'}
                onChange={(e, { value }) => this.setState({ payment_method: value })}
              />
              <Radio
                name="radioGroup"
                className="radio-box"
                value={'Manual'}
                label="Manual"
                checked={payment_method === 'Manual'}
                onChange={(e, { value }) => this.setState({ payment_method: value })}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Input label="Bank Name" />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Input label="Routing Number" />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Input label="Account Number" />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Select options={stateOptions} label="Account Type" placeholder="Checking" />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Select options={stateOptions} label="Account Owner Type" placeholder="Client Owns Ac…" />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Input label="Owner's Name" />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Input label="Social Security #" />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Input label="Email Address" />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Input label="Street Address" />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <label>
                  Postal<span className="underline-name"> - AUTO FILL</span>
                </label>
                <Input style={{ width: '100%', marginTop: '4px' }} />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Input label="City" />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Select options={stateOptions} label="State" placeholder="California" />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ textAlign: 'center' }}>
              <Button className="green" content="Validate" />
            </Grid.Column>
            <Grid.Column style={{ textAlign: 'center' }}>
              <Button className="red" content="Reset" />
            </Grid.Column>
            <Grid.Column style={{ textAlign: 'center' }}>
              <Button className="blue" content="History" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Panel>
    );
  }
}

export default BankForm;
