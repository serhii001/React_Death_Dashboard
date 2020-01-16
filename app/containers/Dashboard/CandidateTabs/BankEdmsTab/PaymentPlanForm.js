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
  & .ui.input input {
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
  }
`;

class PaymentPlanForm extends React.Component {
  render() {
    return (
      <Panel>
        <Grid columns="3">
          <Grid.Row textAlign="left">
            <Grid.Column width={16}>
              <Label style={{ fontSize: '18px', color: '#5FA1FC', backgroundColor: 'white', paddingLeft: '0px' }}>
                Payment Plan
              </Label>
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
                <Form.Input label="2nd Payment Date" />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Input label="Program Length" />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Input label="Credit Card Debt" />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Input label="First Payment Fee" />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Input label="Monthly Fee" />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Input label="Contract Owner" />
              </Form>
            </Grid.Column>
            <Grid.Column style={{ textAlign: 'center', marginTop: 'auto' }}>
              <Button className="green" content="Save" />
            </Grid.Column>
            <Grid.Column style={{ textAlign: 'center', marginTop: 'auto' }}>
              <Button className="red" content="Reset" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Panel>
    );
  }
}

export default PaymentPlanForm;
