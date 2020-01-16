import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { map, forEach, find, differenceWith, isEqual } from 'lodash';
import AccordionForm from '../../../components/AccordionForm';
import { NameLabel, InputGroup, BoldLabel, MediumLabel } from './styles';
import LanguageBox from './LanguageBox';
import { Form, Button, Input, Grid, Radio, Image } from 'semantic-ui-react';
import PhoneInputSelectBox from './PhoneInputSelectBox';
import AllNotes from "../../../components/AllNotes/index";
import {
  getCandidateIncome, getCandidateMonthlyExpenses,
  updateCandidateIncome, updateCandidateMonthlyExpenses
} from "../../../redux/actions/candidates";
import {FREQUENCY_TYPES} from "../../../constants/defaults";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionContainer = styled.div`
  justify-content: space-around;
  & .candidate-name {
    text-align: center;
    font: 25px Medium Lato !important;
    letter-spacing: 0;
    color: #00a7fa !important;
  }
  & form {
    width: 100%;
    display: inline-flex;
    & .fields {
      width: 100%;
    }
  }
  & label {
    font: 18px Medium Lato !important;
    letter-spacing: 0;
    color: #959494 !important;
  }
  & .ui.input input {
    border-radius: 20px !important;
    height: 35px !important;
    width: 120px !important;
    color: #20cb96;
    font-size: 16px;
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
  & .phone {
    margin: 0px !important;
  }
  & .phone label {
    font: 16px Medium Lato !important;
    letter-spacing: 0 !important;
    color: #959494 !important;
    padding: 7px 25px !important;
    &:before {
      width: 23px !important;
      height: 23px !important;
      top: 5px !important;
      border: 2px solid #00a7fa !important;
    }
    &:after {
      top: -1.5px !important;
      left: -6.1px !important;
      width: 35.5px !important;
      height: 35.5px !important;
      background-color: #00a7fa !important;
    }
  }
  & .income-employment-box .row .column:nth-child(2) {
    padding-left: 50px !important;
  }
`;

const FormField = styled(Form)`
  margin-bottom: 25px !important;
`;

const BudgetInlineForm = styled.div`
  display: inline-block;
  & .ui.input input {
    margin-left: 10px;
    color: #20cb96;
  }
  & .ui.disabled.input {
    opacity: 1 !important;
  }
  & .last-child input {
    margin-left: 10px;
    color: #ac2e2e !important;
  }
`;

class BudgetTab extends React.Component {
  state = {
    currentStatus: 'retired',
    householdIncome: 'monthly',
    alimony: 'monthly',
    childSupport: 'monthly',
    other: 'monthly',
    income: {},
    incomeFrequency: {},
    expenses: {}
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { income, expenses } = this.props;

    if (!isEqual(income, prevProps.income)) {
      this.setIncome();
    }

    if (expenses && !isEqual(expenses, prevProps.expenses)) {
      this.setExpenses();
    }
  }

  loadData = () => {
    const { candidate, getIncomeAction, getMonthlyExpensesAction } = this.props;

    if (candidate && candidate.public_id) {
      getIncomeAction({ id: candidate.public_id });
      getMonthlyExpensesAction({ id: candidate.public_id })
    }
  };

  setIncome = () => {
    const { income = [] } = this.props;
    const newIncome = {};
    const incomeFrequency = {};

    forEach(income, item => {
      newIncome[item.income_type] = item.value;
      incomeFrequency[item.income_type] = item.frequency.toLowerCase();
    });

    this.setState({ incomeFrequency, income: newIncome });
  };

  setExpenses = () => {
    const { expenses = [] } = this.props;
    const newExpenses = {};

    forEach(expenses, item => {
      newExpenses[item.expense_type] = item.value;
    });
    console.log('setExpenses', newExpenses)
    this.setState({ expenses: newExpenses });
  };

  handleStatusChange = (e, { value }) => this.setState({ currentStatus: value });

  changeExpenses = field => (e, { value }) => {console.log('changeExpenses', field, value); return this.setState(state => ({
    expenses: { ...state.expenses, [field]: parseFloat(value) }
  }), () => {this.updateExpenses()})};

  changeIncome = field => (e, { value }) => this.setState(state => ({
    income: { ...state.income, [field]: parseFloat(value) }
  }), () => {this.updateIncome()});

  changeIncomeFrequency = field => (e, { value }) => this.setState(state => ({
    incomeFrequency: { ...state.incomeFrequency, [field]: value }
  }), () => {this.updateIncome()});

  updateIncome = () => {
    const { income, incomeFrequency } = this.state;
    const { updateIncomeAction, incomeTypes, candidate } = this.props;
    const data = [];
    forEach(incomeTypes, item => {
      if (item && income[item.name] && incomeFrequency[item.name]) {
        data.push({
          income_type_id: item.id,
          income_type: item.name,
          value: income[item.name],
          frequency: FREQUENCY_TYPES[incomeFrequency[item.name]]
        });
      }
    });
    updateIncomeAction({ data, id: candidate.public_id });
  };

  updateExpenses = () => {
    const { expenses } = this.state;
    const { updateExpensesAction, expenseTypes, candidate } = this.props;
    const data = [];
    forEach(expenseTypes, item => {
      if (item && expenses[item.name]) {
        data.push({
          expense_type_id: item.id,
          expense_type: item.name,
          value: expenses[item.name],
        });
      }
    });
    console.log('updateExpenses', data)
    updateExpensesAction({ data, id: candidate.public_id });
  };

  resetIncome = () => {
    this.setState({ income: {}, incomeFrequency: {} }, () => {this.updateIncome()});
  };

  resetExpense = () => {
    console.log('resetExpense')
    this.setState({ expenses: {} }, () => {this.updateExpenses()});
  };

  render() {
    const { candidate, incomeTypes, expenseTypes } = this.props;
    const { income, incomeFrequency, expenses } = this.state;
    const expenseCount = expenseTypes && expenseTypes.length || 0;
    const expenseColumnSize = Math.ceil(expenseCount / 2) || 0;

    let totalMonthlyIncome = 0;
    let totalAnnualIncome = 0;
    let totalMonthlyExpenses = 0;
    forEach(income, (item, index) => {
      if (incomeFrequency[index] === 'monthly') {
        totalMonthlyIncome += item;
      }
      if (incomeFrequency[index] === 'annual') {
        totalAnnualIncome += item;
      }
    });
    forEach(expenses, item => {
        totalMonthlyExpenses += item;
    });

    return (
      <Container>
        <ActionContainer>
          <Grid>
            <Grid.Row columns={4}>
              <Grid.Column className="header-name">
                <label className="candidate-name">
                  {candidate.first_name} {candidate.last_name}
                </label>
              </Grid.Column>
              <Grid.Column>
                <BudgetInlineForm>
                  <label>Monthly Income</label>
                  <Input value={`$${totalMonthlyIncome}`} disabled />
                </BudgetInlineForm>
              </Grid.Column>
              <Grid.Column>
                <BudgetInlineForm>
                  <label>Annual Income</label>
                  <Input value={`$${totalAnnualIncome}`} disabled />
                </BudgetInlineForm>
              </Grid.Column>
              <Grid.Column>
                <BudgetInlineForm>
                  <label>Monthly Expenses</label>
                  <Input className="last-child" value={`$${totalMonthlyExpenses}`} disabled />
                </BudgetInlineForm>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <AccordionForm title="Income & Employment" resetConfig={this.resetIncome}>
                  <Grid columns={3} className="income-employment-box">
                    <Grid.Row>
                      <Grid.Column>
                        <BoldLabel>Current Status</BoldLabel>
                      </Grid.Column>
                      <Grid.Column>
                        <Radio
                          name="radioGroup1"
                          value="employed"
                          width={4}
                          className="phone"
                          label="Employed"
                          checked={this.state.currentStatus === 'employed'}
                          onChange={this.handleStatusChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Radio
                          name="radioGroup1"
                          value="retired"
                          width={4}
                          className="phone"
                          label="Retired"
                          checked={this.state.currentStatus === 'retired'}
                          onChange={this.handleStatusChange}
                        />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column />
                      <Grid.Column>
                        <Radio
                          name="radioGroup1"
                          value="student"
                          width={4}
                          className="phone"
                          label="Student"
                          checked={this.state.currentStatus === 'student'}
                          onChange={this.handleStatusChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Radio
                          name="radioGroup1"
                          value="unemployed"
                          width={4}
                          className="phone"
                          label="Unemployed"
                          checked={this.state.currentStatus === 'unemployed'}
                          onChange={this.handleStatusChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    {/* Household Income */}
                    {map(incomeTypes, (item, index) =>
                      [
                        <Grid.Row key={`row1${index}`}>
                          <Grid.Column>
                            <MediumLabel>{item.display_name}</MediumLabel>
                          </Grid.Column>
                          <Grid.Column />
                          <Grid.Column />
                        </Grid.Row>,
                        <Grid.Row key={`row2${index}`}>
                          <Grid.Column className="header-name">
                            <Input
                              className="input-box-w-100"
                              error={!income[item.name] || !incomeFrequency[item.name]}
                              value={income[item.name] || 0}
                              onChange={this.changeIncome(item.name)}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Radio
                              name={item.name}
                              value="annual"
                              width={4}
                              className="phone"
                              label="Annual"
                              checked={incomeFrequency[item.name] === 'annual'}
                              onChange={this.changeIncomeFrequency(item.name)}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Radio
                              name={item.name}
                              value="monthly"
                              width={4}
                              className="phone"
                              label="Monthly"
                              checked={incomeFrequency[item.name] === 'monthly'}
                              onChange={this.changeIncomeFrequency(item.name)}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      ]
                    )}
                  </Grid>
                </AccordionForm>
              </Grid.Column>
              <Grid.Column>
                <AccordionForm title="Monthly Expenses" resetConfig={this.resetExpense}>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        {map(expenseTypes, (item, index) => (parseInt(index) < expenseColumnSize) && (
                          <FormField key={index}>
                            <Form.Input
                              className="input-box-w-100"
                              label={item.display_name}
                              error={!expenses[item.name]}
                              value={expenses[item.name] || 0}
                              onChange={this.changeExpenses(item.name)}
                            />
                          </FormField>
                          )
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        {map(expenseTypes, (item, index) => (index >= expenseColumnSize) && (
                            <FormField key={index}>
                              <Form.Input
                                className="input-box-w-100"
                                label={item.display_name}
                                error={!expenses[item.name]}
                                value={expenses[item.name] || 0}
                                onChange={this.changeExpenses(item.name)}
                              />
                            </FormField>
                          )
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </AccordionForm>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <AllNotes />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </ActionContainer>
      </Container>
    );
  }
}

BudgetTab.propTypes = {
  incomeTypes: PropTypes.arrayOf(PropTypes.any),
  expenseTypes: PropTypes.arrayOf(PropTypes.any),
  income: PropTypes.arrayOf(PropTypes.any),
  expenses: PropTypes.arrayOf(PropTypes.any),
  getIncomeAction: PropTypes.func.isRequired,
  updateIncomeAction: PropTypes.func.isRequired,
  getMonthlyExpensesAction: PropTypes.func.isRequired,
  updateExpensesAction: PropTypes.func.isRequired
};

const mapStateToProps = ({ candidates }) => ({
  income: candidates.income,
  expenses: candidates.expenses,
  incomeTypes: candidates.incomeTypes,
  expenseTypes: candidates.expenseTypes
});

const mapDispatchToProps = dispatch => ({
  getIncomeAction: data => {
    dispatch(getCandidateIncome(data));
  },
  updateIncomeAction: data => {
    dispatch(updateCandidateIncome(data));
  },
  getMonthlyExpensesAction: data => {
    dispatch(getCandidateMonthlyExpenses(data));
  },
  updateExpensesAction: data => {
    dispatch(updateCandidateMonthlyExpenses(data));
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetTab);
