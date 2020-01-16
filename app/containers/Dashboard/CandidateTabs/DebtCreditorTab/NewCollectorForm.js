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

const collectorOptions = [
  { key: '1', value: 'Schachter', text: 'Schachter Portnoy, LLC' },
  { key: '2', value: 'MiraMed', text: 'MiraMed Revenue Group' },
  { key: '3', value: 'Paragon', text: 'Paragon Revenue Group' },
  { key: '4', value: 'ROI', text: 'ROI Receivables Outsourcing, LLC' },
  { key: '5', value: 'OAC', text: 'OAC' },
  { key: '6', value: 'Capital', text: 'Capital Accounts' },
  { key: '7', value: 'L', text: 'L.J. Ross Associates, Inc.' },
  { key: '8', value: 'Oliver', text: 'Oliver Adjustment Company' },
  { key: '9', value: 'The', text: 'The Thomas Agency' },
  { key: '10', value: 'TUPELO', text: 'TUPELO SERVICE FINANCE, INC' },
  { key: '11', value: 'D', text: 'D&A Services' },
  { key: '12', value: 'Bernhardt', text: 'Bernhardt and Strawser, P.A.' },
  { key: '13', value: 'Valley', text: 'Valley Credit Service' },
  { key: '14', value: 'Aargon', text: 'Aargon Collection Agency' },
  { key: '15', value: 'Computer', text: 'Computer Credit, Inc.' },
  { key: '16', value: 'Online', text: 'Online Collections' },
  { key: '17', value: 'Total', text: 'Total Card, INC' },
  { key: '18', value: 'Creditors', text: 'Creditors Collection Service' },
  { key: '19', value: 'MedConn', text: 'MedConn Collection Agency, LLC' },
  { key: '20', value: 'Debt', text: 'Debt Recovery Solutions' },
  { key: '21', value: 'AssetCare', text: 'AssetCare' }
];

export default class NewCollectorForm extends React.Component {
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
                      <Form.Dropdown
                        className="input-box-w-100"
                        label="3rd Party Collector"
                        options={collectorOptions}
                        search
                        allowAdditions
                        fluid
                        selection
                      />
                      <Form.Input className="input-box-w-100" label="Fax" />
                      <Form.Input className="input-box-w-100" label="Mobile Phone #" />
                      <Form.Input className="input-box-w-100" label="Address" />
                      <Form.Input className="input-box-w-100" label="City" />
                      <Form.Input className="input-box-w-100" label="Last Action" />
                    </Form>
                  </Grid.Column>
                  <Grid.Column>
                    <Form>
                      <Form.Input className="input-box-w-100" label="Collector Account" />
                      <Form.Input className="input-box-w-100" label="Email" />
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
                        label="Dispute Status"
                        options={stateOptions}
                        placeholder="Select One"
                      />
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field control={TextArea} className="input-box-w-100" label="Dispute History/Files" rows={22} />
              </Form>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Field control={TextArea} className="input-box-w-100" label="Notes" rows={5} />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </ModalContent>
    );
  }
}
