import React, { Component } from 'react';
import { Button, Header, Image, Modal, Divider, Grid, Form, Select, TextArea, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const ModalContent = styled.div`
  padding: 0px 20px;
  background-color: #f8f7f7;
  & .input-box-w-100 {
    width: 100% !important;

    & label {
      font: 14px Medium Lato;
      color: #9ea0a5 !important;
      font-weight: unset !important;
    }
  }
  & .link-button-bottom {
    display: flex !important;
    align-items: flex-end;
    & span {
      text-decoration: underline;
      letter-spacing: 0;
      color: #20cb96;
      opacity: 1;
      cursor: pointer;
    }
  }
`;

const VerticalBar = styled.div`
  width: 1px;
  border-left: 2px solid #5fa1fc;
  margin-left: -7px;
`;

export class SummonInformationForm extends React.Component {
  state = {
    stateOptions: [
      { key: 'm', text: 'Select One', value: 'male' },
      { key: 'f', text: 'Select Two', value: 'female' },
      { key: 'o', text: 'Select Three', value: 'other' }
    ]
  };

  render() {
    const { stateOptions } = this.state;
    return (
      <ModalContent>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form>
                      <Form.Input className="input-box-w-100" label="Collection Agency Suing" />
                      <Form.Input className="input-box-w-100" label="Fax" />
                      <Form.Input className="input-box-w-100" label="Address" />
                      <Form.Input className="input-box-w-100" label="City" />
                    </Form>
                  </Grid.Column>
                  <Grid.Column>
                    <Form>
                      <Form.Input className="input-box-w-100" label="Collector Account" />
                      <Form.Input className="input-box-w-100" label="Mobile Phone #" />
                      <Grid style={{ marginBottom: '0px' }}>
                        <Grid.Row columns={2}>
                          <Grid.Column width={12}>
                            <Form.Input className="input-box-w-100" label="Zip Code" />
                          </Grid.Column>
                          <Grid.Column width={4} className="link-button-bottom">
                            <span>Auto Fill</span>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Form.Field
                        control={Select}
                        className="input-box-w-100"
                        label="State"
                        options={stateOptions}
                        placeholder="CA-California"
                      />
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <VerticalBar />
            <Grid.Column>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form>
                      <Form.Input className="input-box-w-100" label="Collection Agency Suing" />
                      <Form.Input className="input-box-w-100" label="Fax" />
                      <Form.Input className="input-box-w-100" label="Address" />
                      <Form.Input className="input-box-w-100" label="City" />
                      <Form.Input className="input-box-w-100" label="Date of Summon" />
                      <Form.Input className="input-box-w-100" label="Summon Amount" />
                    </Form>
                  </Grid.Column>
                  <Grid.Column>
                    <Form>
                      <Form.Input className="input-box-w-100" label="Collector Account" />
                      <Form.Input className="input-box-w-100" label="Mobile Phone #" />
                      <Grid style={{ marginBottom: '0px' }}>
                        <Grid.Row columns={2}>
                          <Grid.Column width={12}>
                            <Form.Input className="input-box-w-100" label="Zip Code" />
                          </Grid.Column>
                          <Grid.Column width={4} className="link-button-bottom">
                            <span>Auto Fill</span>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Form.Field
                        control={Select}
                        className="input-box-w-100"
                        label="State"
                        options={stateOptions}
                        placeholder="CA-California"
                      />
                      <Form.Field
                        control={Select}
                        className="input-box-w-100"
                        label="Debt was"
                        options={stateOptions}
                        placeholder="Select One"
                      />
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Form>
                <Form.Field
                  control={TextArea}
                  className="input-box-w-100"
                  label="Payment changes made to contract notes"
                  rows={5}
                />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field control={TextArea} className="input-box-w-100" label="Fees removed notes" rows={5} />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </ModalContent>
    );
  }
}
