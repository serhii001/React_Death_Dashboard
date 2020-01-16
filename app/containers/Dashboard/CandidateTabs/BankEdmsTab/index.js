import React from 'react';
import styled from 'styled-components';
import { Grid, Table, Form, Checkbox } from 'semantic-ui-react';
import FilterDropDownComponent from '../../../../components/FilterDropDownComponent';
import ActionDropDownComponent from '../../../../components/ActionDropDownComponent';
import BankForm from './BankForm';
import PaymentPlanForm from './PaymentPlanForm';
import BankEdmsTableHeader from './BankEdmsTableHeader';
import response from './fakeserver';
import AccordionForm from '../../../../components/AccordionForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToggleContainer = styled.div`
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

class BankEdmsTab extends React.Component {
  state = {
    formType: 1,
    filterColumns: [
      { value: 'Description', show: true },
      { value: 'Type', show: true },
      { value: 'Status', show: true },
      { value: '+', show: true },
      { value: '-', show: true },
      { value: 'Balance', show: true },
      { value: 'Transaction Date', show: true },
      { value: 'Payment ID', show: true },
      { value: 'Invoice #', show: true },
      { value: 'Projected Date', show: true },
      { value: 'Projected Amount', show: true },
      { value: 'Projected Balance', show: true },
      { value: 'Commission', show: true },
      { value: 'Earned', show: true }
    ],
    actionLists: [
      { value: 'Send to Client', selected: true },
      { value: 'Refund', selected: false },
      { value: 'Change Draft Date', selected: false },
      { value: 'Add to EFT', selected: false },
      { value: 'Add Debt', selected: false },
      { value: 'New EFT Authorization', selected: false },
      { value: 'Skip Payment', selected: false },
      { value: 'Modify Debt', selected: false },
      { value: 'Manual Adjustment', selected: false },
      { value: 'New Term', selected: false },
      { value: 'Remove Debt', selected: false },
      { value: 'Remove Co-Client', selected: false },
      { value: 'Re-instate', selected: false },
      { value: 'Receive Summon', selected: false },
      { value: 'New Contract with Co-Client', selected: false }
    ]
  };

  updateView = data => {
    this.setState({ filterColumns: data });
  };

  changeAction = () => {};

  isColumnShow = name => {
    const { filterColumns } = this.state;
    return filterColumns.find(column => column.value === name).show;
  };

  render() {
    const { formType, filterColumns, actionLists } = this.state;
    return (
      <Container>
        <Grid>
          <Grid.Row style={{ boxShadow: '0px 2px 6px #7B7B7B57', alignItems: 'baseline' }}>
            <Grid.Column width={3}>
              {formType === 2 && <ActionDropDownComponent lists={actionLists} changeAction={this.changeAction} />}
            </Grid.Column>
            <Grid.Column width={10}>
              <ToggleContainer>
                <div
                  className={'button left-round ' + (formType === 1 ? 'selected' : 'unselected')}
                  onClick={() => this.setState({ formType: 1 })}
                >
                  $ Bank
                </div>
                <div
                  className={'button right-round ' + (formType === 2 ? 'selected' : 'unselected')}
                  onClick={() => this.setState({ formType: 2 })}
                >
                  EDMS
                </div>
              </ToggleContainer>
            </Grid.Column>
            <Grid.Column width={3} textAlign="right">
              {formType === 2 && <FilterDropDownComponent lists={filterColumns} updateView={this.updateView} />}
            </Grid.Column>
          </Grid.Row>
          {formType === 1 && (
            <Grid.Row>
              <Grid.Column width={8}>
                <BankForm />
              </Grid.Column>
              <Grid.Column width={8}>
                <PaymentPlanForm />
              </Grid.Column>
            </Grid.Row>
          )}
          {formType === 2 && (
            <Grid.Row>
              <Table selectable compact stackable>
                <BankEdmsTableHeader columns={filterColumns} />
                <Table.Body>
                  {response.data.map((row, id) => (
                    <Table.Row key={`debit-creditor-${id}-0`}>
                      <Table.Cell key={`debit-creditor-${id}-1`}>
                        <Form.Field control={Checkbox} />
                      </Table.Cell>
                      <Table.Cell key={`debit-creditor-${id}-2`} />
                      <Table.Cell style={{ color: '#3E3F42' }} key={`debit-creditor-${id}-3`}>
                        {id + 1}
                      </Table.Cell>
                      <Table.Cell key={`debit-creditor-${id}-4`} />
                      {this.isColumnShow('Description') && (
                        <Table.Cell key={`debit-creditor-${id}-5`}>
                          <span className="underline-name" style={{ color: '#9EA0A5' }}>
                            {row.description}
                          </span>
                        </Table.Cell>
                      )}
                      {this.isColumnShow('Type') && (
                        <Table.Cell key={`debit-creditor-${id}-6`}>
                          <span style={{ color: '#9EA0A5' }}>{row.type}</span>
                        </Table.Cell>
                      )}
                      {this.isColumnShow('Status') && (
                        <Table.Cell key={`debit-creditor-${id}-7`}>
                          <span style={{ color: '#9EA0A5' }}>{row.status}</span>
                        </Table.Cell>
                      )}

                      {this.isColumnShow('+') && (
                        <Table.Cell key={`debit-creditor-${id}-8`}>
                          <span style={{ color: '#20CB96' }}>{row.plus}</span>
                        </Table.Cell>
                      )}

                      {this.isColumnShow('-') && (
                        <Table.Cell key={`debit-creditor-${id}-9`}>
                          <span style={{ color: '#FF6C6C' }}>{row.minus}</span>
                        </Table.Cell>
                      )}

                      {this.isColumnShow('Balance') && (
                        <Table.Cell key={`debit-creditor-${id}-10`}>
                          <span style={{ color: '#20CB96' }}>{row.balance}</span>
                        </Table.Cell>
                      )}

                      {this.isColumnShow('Transaction Date') && (
                        <Table.Cell key={`debit-creditor-${id}-11`}>
                          <span style={{ color: '#5FA1FC' }}>{row.transaction_date}</span>
                        </Table.Cell>
                      )}

                      {this.isColumnShow('Payment ID') && (
                        <Table.Cell key={`debit-creditor-${id}-12`}>
                          <span style={{ color: '#9EA0A5' }}>{row.payment_id}</span>
                        </Table.Cell>
                      )}
                      {this.isColumnShow('Invoice #') && (
                        <Table.Cell key={`debit-creditor-${id}-13`}>
                          <span style={{ color: '#9EA0A5' }}>{row.invoice}</span>
                        </Table.Cell>
                      )}
                      {this.isColumnShow('Projected Date') && (
                        <Table.Cell key={`debit-creditor-${id}-14`}>
                          <span style={{ color: '#9EA0A5' }}>{row.projected_date}</span>
                        </Table.Cell>
                      )}

                      {this.isColumnShow('Projected Amount') && (
                        <Table.Cell key={`debit-creditor-${id}-15`}>
                          <span className="underline-name" style={{ color: '#9EA0A5' }}>
                            {row.projected_amount}
                          </span>
                        </Table.Cell>
                      )}
                      {this.isColumnShow('Projected Balance') && (
                        <Table.Cell key={`debit-creditor-${id}-16`}>
                          <span className="underline-name" style={{ color: '#9EA0A5' }}>
                            {row.projected_balance}
                          </span>
                        </Table.Cell>
                      )}

                      {this.isColumnShow('Commission') && (
                        <Table.Cell key={`debit-creditor-${id}-17`}>
                          <span className="underline-name" style={{ color: '#5FA1FC' }}>
                            {row.commission}
                          </span>
                        </Table.Cell>
                      )}

                      {this.isColumnShow('Earned') && (
                        <Table.Cell key={`debit-creditor-${id}-18`}>
                          <span style={{ color: '#20CB96' }}>{row.earned}</span>
                        </Table.Cell>
                      )}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column>
              <AccordionForm title="Co - Client" bluetitle />
              <AccordionForm title="All Notes" bluetitle />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default BankEdmsTab;
