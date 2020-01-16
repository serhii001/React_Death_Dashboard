import React from 'react';
import styled from 'styled-components';

import AccordionForm from '../../../../components/AccordionForm';
import FilterDropDownComponent from '../../../../components/FilterDropDownComponent';
import { Form, Input, Grid, Table, Checkbox, Button, Icon } from 'semantic-ui-react';
import DebitCreditorTableHeader from './DebitCreditorTableHeader';
import AddCollectorModal from './AddCollectorModal';

// import response from './fakeserver';
import AddDebtModal from './AddDebtModal';
import DebtCreditorTableFooter from './DebtCreditorTableFooter';

import { debitCreditorApis } from '../../../../utils/api/candidate/debitcreditor';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionContainer = styled.div`
  justify-content: space-around;
  font-family: Medium Lato;
  & .candidate-name {
    text-align: center;
    font: 20px Light Lato !important;
    letter-spacing: 0;
    color: #5fa1fc !important;
  }
  & form {
    width: 100%;
    display: inline-flex;
    & .fields {
      width: 100%;
    }
  }
  & label {
    font: 15px Light Lato !important;
    letter-spacing: 0;
    color: #959494 !important;
  }
  & .ui.input.disabled input {
    border-radius: 20px !important;
    height: 25px;
    width: 120px;
    color: #20cb96;
    font: 16px Light Lato !important;
  }
  & .header-name {
    text-align: center;
  }
  & .input-box-w-100 {
    width: 100% !important;
    & label {
      font-size: 16px !important;
    }
  }
  & .ui.checkbox input:checked ~ .box:before,
  & .ui.checkbox input:checked ~ label:before {
    background: #5fa1fc !important;
    border-color: #ebebeb !important;
  }

  & .ui.checkbox input:checked ~ .box:after,
  & .ui.checkbox input:checked ~ label:after {
    opacity: 1;
    color: rgba(255, 255, 255, 0.95) !important;
  }
  & span.underline-name {
    text-decoration: underline;
    font: 14px Medium Lato;
    letter-spacing: 0;
    color: #20cb96;
    opacity: 1;
    cursor: pointer;
  }
  & table tbody td {
    font-size: 14px;
    color: #9ea0a5;
  }
  & table tbody th {
    font-size: 16px;
    color: #9ea0a5;
  }
`;

const DebtCreditorInlineForm = styled.div`
  display: inline-block;
  & .ui.input input {
    margin-left: 10px;
    color: #ff6c6c;
  }
  & .ui.disabled.input {
    opacity: 1 !important;
  }
  & .ui.input.last-child input {
    margin-left: 10px;
    color: #20cb96 !important;
  }
`;

const DebtTableToolBar = styled.div`
  display: inline-block;
  margin-left: 10px;
  & button {
    font-size: 12px !important;
  }
`;

class DebtCreditorTab extends React.Component {
  state = {
    currentStatus: 'retired',
    householdIncome: 'monthly',
    alimony: 'monthly',
    childSupport: 'monthly',
    other: 'monthly',
    openCollectorModal: false,
    openDebtModal: false,
    columns: [
      { value: 'Account Number', show: false },
      { value: 'Balance Original', show: true },
      { value: 'Bureaus', show: false },
      { value: 'Collector Account #', show: false },
      { value: 'Credit limit', show: true },
      { value: 'Creditor Name', show: false },
      { value: 'Days Late', show: false },
      { value: 'Debt Name', show: true },
      { value: 'ECOA', show: true },
      { value: 'Graduation', show: false },
      { value: 'Last Collector', show: false },
      { value: 'Last Debt Status', show: true },
      { value: 'Last Update', show: true },
      { value: 'Payment Amount', show: true },
      { value: 'Push', show: true },
      { value: 'Type', show: true }
    ],
    _page: 1,
    _limit: 10,
    totalCount: 0,
    creditors: []
  };

  async componentDidMount() {
    const res = await debitCreditorApis.GetCreditReportData(this.props.candidate.public_id);
    if (res.data) {
      this.setState({ creditors: res.data, totalCount: res.data.length });
    }
  }

  handleStatusChange = (e, { value }) => this.setState({ currentStatus: value });
  handleHouseholdIncomeChange = (e, { value }) => this.setState({ householdIncome: value });
  handleAlimonyChange = (e, { value }) => this.setState({ alimony: value });
  handleChildSupportChange = (e, { value }) => this.setState({ childSupport: value });
  handleOtherChange = (e, { value }) => this.setState({ other: value });
  openAddCollectorModal = dimmer => this.setState({ dimmer, openCollectorModal: true });
  closeAddCollectorModal = () => this.setState({ openCollectorModal: false });
  openAddDebtModal = dimmer => this.setState({ dimmer: true, openDebtModal: true });
  closeAddDebtModal = () => this.setState({ openDebtModal: false });
  isColumnShow = name => {
    const { columns } = this.state;
    return columns.find(column => column.value === name).show;
  };

  updateView = data => {
    this.setState({ columns: data });
  };

  onChangeLimit = (event, data) => {
    if (data.value !== this.state._limit) {
      this.setState({ _limit: data.value, _page: 1 });
    }
  };
  onChangePage = (event, data) => {
    const { activePage } = data;
    if (activePage !== this.state._page) {
      this.setState({ _page: activePage });
    }
  };

  render() {
    const { openCollectorModal, openDebtModal, dimmer, columns, creditors, _page, _limit } = this.state;
    const { candidate } = this.props;
    return (
      <Container>
        <ActionContainer>
          <Grid>
            <Grid.Row style={{ boxShadow: '0px 2px 6px #7B7B7B57', alignItems: 'baseline' }}>
              <Grid.Column className="header-name" width={2}>
                <label className="candidate-name">
                  {candidate.first_name} {candidate.last_name}
                </label>
              </Grid.Column>
              <Grid.Column width={2}>
                <DebtCreditorInlineForm>
                  <label>Client ID:</label>
                  <label className="candidate-name">8798773</label>
                </DebtCreditorInlineForm>
              </Grid.Column>
              <Grid.Column width={3}>
                <DebtCreditorInlineForm>
                  <label>Balance Original</label>
                  <Input value="$15,300.00" disabled />
                </DebtCreditorInlineForm>
              </Grid.Column>
              <Grid.Column width={3}>
                <DebtCreditorInlineForm>
                  <label>Payment Amount</label>
                  <Input value="$650.00" disabled />
                </DebtCreditorInlineForm>
              </Grid.Column>
              <Grid.Column width={3}>
                <DebtCreditorInlineForm>
                  <label>Credit Limit</label>
                  <Input className="last-child" value="$15,000.00" disabled />
                </DebtCreditorInlineForm>
              </Grid.Column>
              <Grid.Column width={1} />
              <Grid.Column width={2} floated="left">
                <FilterDropDownComponent lists={columns} updateView={this.updateView} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <DebtTableToolBar>
                <Button basic color="blue">
                  <Icon name="add circle" />
                  Add Debt
                </Button>
                <Button basic color="red">
                  <Icon name="remove circle" />
                  Delete Debt
                </Button>
                <Button basic color="teal">
                  <Icon name="credit card" />
                  Pull Credit
                </Button>
                <Button basic color="green">
                  <Icon name="thumbtack" />
                  Push Yes
                </Button>
                <Button basic color="grey">
                  <Icon rotated="clockwise" name="thumbtack" />
                  Push No
                </Button>
                <Button basic>
                  <Icon name="wordpress forms" />
                  Bureau Credit Dispute Letter
                </Button>
                <Button basic>
                  <Icon name="edit" />
                  Change Debt Status
                </Button>
              </DebtTableToolBar>
              <Table selectable compact stackable>
                <DebitCreditorTableHeader addRow={this.openAddDebtModal} columns={columns} />
                <Table.Body>
                  {creditors.map(
                    (row, id) =>
                      id < _page * _limit &&
                      id >= (_page - 1) * _limit && (
                        <Table.Row key={`debit-creditor-${id}-0`}>
                          <Table.Cell key={`debit-creditor-${id}-1`}>
                            <Form.Field control={Checkbox} />
                          </Table.Cell>
                          <Table.Cell key={`debit-creditor-${id}-2`} />
                          <Table.Cell style={{ color: '#3E3F42' }} key={`debit-creditor-${id}-3`}>
                            {id + 1}
                          </Table.Cell>
                          <Table.Cell key={`debit-creditor-${id}-4`} />
                          {this.isColumnShow('Account Number') && (
                            <Table.Cell key={`debit-creditor-${id}-5`}>
                              <span className="underline-name">{row.account_number}</span>
                            </Table.Cell>
                          )}
                          {this.isColumnShow('Balance Original') && (
                            <Table.Cell key={`debit-creditor-${id}-6`}>
                              <span style={{ color: '#FF6C6C' }}>{row.balance_og}</span>
                            </Table.Cell>
                          )}
                          {this.isColumnShow('Bureaus') && (
                            <Table.Cell key={`debit-creditor-${id}-7`}>
                              <span style={{ color: '#FF6C6C' }}>{row.bureaus}</span>
                            </Table.Cell>
                          )}
                          {this.isColumnShow('Collector Account #') && (
                            <Table.Cell key={`debit-creditor-${id}-8`}>
                              <span className="underline-name">{row.collector_account_number}</span>
                            </Table.Cell>
                          )}
                          {this.isColumnShow('Credit limit') && (
                            <Table.Cell key={`debit-creditor-${id}-9`}>
                              <span className="underline-name">{row.credit_limit}</span>
                            </Table.Cell>
                          )}
                          {this.isColumnShow('Creditor Name') && (
                            <Table.Cell key={`debit-creditor-${id}-10`}>
                              <span className="underline-name">{row.creditor}</span>
                            </Table.Cell>
                          )}
                          {this.isColumnShow('Days Late') && (
                            <Table.Cell key={`debit-creditor-${id}-11`}>
                              <span className="underline-name">{row.days_late}</span>
                            </Table.Cell>
                          )}
                          {this.isColumnShow('Debt Name') && (
                            <Table.Cell key={`debit-creditor-${id}-12`}>
                              <span className="underline-name">{row.debt_name}</span>
                            </Table.Cell>
                          )}
                          {this.isColumnShow('ECOA') && (
                            <Table.Cell key={`debit-creditor-${id}-13`}>{row.ecoa}</Table.Cell>
                          )}
                          {this.isColumnShow('Graduation') && (
                            <Table.Cell key={`debit-creditor-${id}-14`}>{row.graduation}</Table.Cell>
                          )}
                          {this.isColumnShow('Last Collector') && (
                            <Table.Cell key={`debit-creditor-${id}-15`}>
                              <span className="underline-name" onClick={() => this.openAddCollectorModal('blurring')}>
                                {row.last_collector ? row.last_collector : 'Add Collector'}
                              </span>
                            </Table.Cell>
                          )}
                          {this.isColumnShow('Last Debt Status') && (
                            <Table.Cell key={`debit-creditor-${id}-16`}>
                              <span className="underline-name">{row.last_debt_status}</span>
                            </Table.Cell>
                          )}
                          {this.isColumnShow('Last Update') && (
                            <Table.Cell key={`debit-creditor-${id}-17`}>
                              <span className="underline-name">{row.last_update}</span>
                            </Table.Cell>
                          )}
                          {this.isColumnShow('Payment Amount') && (
                            <Table.Cell key={`debit-creditor-${id}-18`}>
                              <span style={{ color: '#20CB96' }}>{row.payment}</span>
                            </Table.Cell>
                          )}
                          {this.isColumnShow('Push') && (
                            <Table.Cell key={`debit-creditor-${id}-19`}>{row.push}</Table.Cell>
                          )}
                          {this.isColumnShow('Type') && (
                            <Table.Cell key={`debit-creditor-${id}-20`}>{row.type}</Table.Cell>
                          )}
                        </Table.Row>
                      )
                  )}
                </Table.Body>
                <DebtCreditorTableFooter
                  totalCount={this.state.totalCount}
                  totalPages={Math.ceil(this.state.totalCount / this.state._limit)}
                  currentPage={this.state._page}
                  onChangePage={this.onChangePage}
                  onChangeLimit={this.onChangeLimit}
                  limit={this.state._limit.toString()}
                />
              </Table>
              <AddCollectorModal dimmer={dimmer} open={openCollectorModal} close={this.closeAddCollectorModal} />
              <AddDebtModal dimmer={dimmer} open={openDebtModal} close={this.closeAddDebtModal} />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <AccordionForm title="Co - Client" bluetitle />
                <AccordionForm title="All Notes" bluetitle />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </ActionContainer>
      </Container>
    );
  }
}

export default DebtCreditorTab;
