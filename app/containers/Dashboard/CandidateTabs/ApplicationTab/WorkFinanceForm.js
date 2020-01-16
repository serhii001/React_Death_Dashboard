import React from 'react';
import { connect } from 'react-redux';
import AccordionForm from '../../../../components/AccordionForm';
import { BoldLabelTitle, InlineItem } from '../styles';
import { Form } from 'semantic-ui-react';

import StatusBox from '../StatusBox';
import SalaryBox from '../SalaryBox';
import { RowContainer, YourselfApplicationContactContainer, ColumnContainer } from './style';
import { applicationActions, GetWorkAndFinances } from '../../../../redux/actions/candidate/application';

class WorkFinanceForm extends React.Component {
  constructor(props) {
    super(props);

    this.setFieldsValue = this.setFieldsValue.bind(this);
    this.setDate = this.setDate.bind(this);
  }
  state = {
    current: {
      employer_name: '',
      start_date: '',
      end_date: '',
      gross_salary: '',
      gross_salary_frequency: 'MONTHLY',
      other_income: '',
      other_income_frequency: 'MONTHLY',
      current: true
    },
    previous: {
      employer_name: '',
      start_date: '',
      end_date: '',
      gross_salary: '',
      gross_salary_frequency: 'MONTHLY',
      other_income: '',
      other_income_frequency: 'MONTHLY',
      current: false
    },
    status: 'retired'
  };

  componentDidMount() {
    this.loadData()
  }

  componentDidUpdate(prevProps) {
    const { candidate } = this.props;

    if (prevProps.candidate !== candidate) {
      this.loadData()
    }
  }

  loadData = async () => {
    const { dispatch } = this.props;
    const res = await dispatch(GetWorkAndFinances(this.props.candidate.public_id));
    if (res) {
      const { employments } = res;
      this.getFilterData(employments);
    }
  };

  getFilterData = data => {
    if (data) {
      let stateData = {};
      data.forEach(item => {
        item.start_date = item.start_date.split('T')[0];
        item.end_date = item.end_date.split('T')[0];

        if (item.current === true) {
          stateData.current = { ...item };
        } else {
          stateData.previous = { ...item };
        }
      });
      this.setState({ ...this.state, ...stateData });
    }
  };

  setDate = (parent, type, date) => {
    this.setState(prevState => {
      let data = parent === 'current' ? prevState.current : prevState.previous;
      type === 'from' ? (data.start_date = date) : (data.end_date = date);
      if (parent === 'current') {
        return {
          current: data
        };
      }
      return {
        previous: data
      };
    }, this.updateRequest);
  };

  setFieldsValue = async (parent, type, value) => {
    await this.setState(prevState => {
      let data = parent === 'current' ? prevState.current : prevState.previous;
      data[type] = value;
      if (parent === 'current') {
        return {
          current: data
        };
      }
      return {
        previous: data
      };
    });
    this.updateRequest();
  };

  onChangeStatus = status => {
    this.setState({ status });
    // TODO update dbase status value
  };

  updateRequest = async () => {
    const { current, previous } = this.state;
    const requestModel = [];

    if (current.start_date && current.end_date && current.gross_salary) {
      requestModel.push(
        {
          ...this.state.current,
          start_date: this.state.current.start_date + 'T12:00:00.000Z',
          end_date: this.state.current.end_date + 'T12:00:00.000Z',
          gross_salary: parseFloat(this.state.current.gross_salary),
          other_income: parseFloat(this.state.current.other_income)
        }
      );
    }

    if (previous.start_date && previous.end_date && previous.gross_salary) {
      requestModel.push(
        {
          ...this.state.previous,
          start_date: this.state.previous.start_date + 'T12:00:00.000Z',
          end_date: this.state.previous.end_date + 'T12:00:00.000Z',
          gross_salary: parseFloat(this.state.previous.gross_salary),
          other_income: parseFloat(this.state.previous.other_income)
        }
      );
    }

    if (requestModel) {
      await applicationActions.PostWorkAndFinances(this.props.candidate.public_id, requestModel);
    }
  }

  render() {
    const { current, previous, status } = this.state;
    return (
      <AccordionForm title="Tell Us About Your Work and Finances">
        <RowContainer>
          <StatusBox label="Current Status" value={status} onChange={this.onChangeStatus} />
        </RowContainer>
        <YourselfApplicationContactContainer>
          <ColumnContainer>
            <BoldLabelTitle>Current Employment</BoldLabelTitle>
            <Form>
              <Form.Group>
                <Form.Input
                  label="Employer Name"
                  width={6}
                  value={current.employer_name || ''}
                  onChange={e => {
                    this.setFieldsValue('current', 'employer_name', e.target.value);
                  }}
                />
                <InlineItem>
                  <label>From</label>
                  <Form.Input
                    type="date"
                    value={current.start_date || ''}
                    onChange={e => {
                      this.setDate('current', 'from', e.target.value);
                    }}
                  />
                </InlineItem>
                <InlineItem>
                  <label>To</label>
                  <Form.Input
                    type="date"
                    value={current.end_date || ''}
                    onChange={e => this.setDate('current', 'to', e.target.value)}
                  />
                </InlineItem>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Gross Salary / Pension ($)"
                  width={6}
                  value={current.gross_salary || ''}
                  onChange={e => {
                    this.setFieldsValue('current', 'gross_salary', e.target.value);
                  }}
                />
                <InlineItem>
                  <label>&nbsp;</label>
                  <SalaryBox
                    type="gross_salary_frequency"
                    parent="current"
                    boxValue={current.gross_salary_frequency}
                    radioGroupName="currentGrossSalaryFrequency"
                    handleChange={this.setFieldsValue}
                  />
                </InlineItem>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Other Income ($)"
                  width={6}
                  value={current.other_income || ''}
                  onChange={e => {
                    this.setFieldsValue('current', 'other_income', e.target.value);
                  }}
                />
                <InlineItem>
                  <label>&nbsp;</label>
                  <SalaryBox
                    type="other_income_frequency"
                    parent="current"
                    boxValue={current.other_income_frequency}
                    radioGroupName="currentOtherIncomeFrequency"
                    handleChange={this.setFieldsValue}
                  />
                </InlineItem>
              </Form.Group>
            </Form>
          </ColumnContainer>
          <ColumnContainer>
            <BoldLabelTitle>Past Employment</BoldLabelTitle>
            <Form>
              <Form.Group>
                <Form.Input
                  label="Employer Name"
                  width={6}
                  value={previous.employer_name}
                  onChange={e => {
                    this.setFieldsValue('previous', 'employer_name', e.target.value);
                  }}
                />
                <InlineItem>
                  <label>From</label>
                  <Form.Input
                    type="date"
                    value={previous.start_date || ''}
                    onChange={e => {
                      this.setDate('previous', 'from', e.target.value);
                    }}
                  />
                </InlineItem>
                <InlineItem>
                  <label>To</label>
                  <Form.Input
                    type="date"
                    value={previous.end_date || ''}
                    onChange={e => {
                      this.setDate('previous', 'to', e.target.value);
                    }}
                  />
                </InlineItem>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Gross Salary / Pension ($)"
                  width={6}
                  value={previous.gross_salary || ''}
                  onChange={e => {
                    this.setFieldsValue('previous', 'gross_salary', e.target.value);
                  }}
                />
                <InlineItem>
                  <label>&nbsp;</label>
                  <SalaryBox
                    type="gross_salary_frequency"
                    parent="previous"
                    boxValue={previous.gross_salary_frequency}
                    radioGroupName="previousGrossSalaryFrequency"
                    handleChange={this.setFieldsValue}
                  />
                </InlineItem>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Other Income ($)"
                  width={6}
                  value={previous.other_income || ''}
                  onChange={e => {
                    this.setFieldsValue('previous', 'other_income', e.target.value);
                  }}
                />
                <InlineItem>
                  <label>&nbsp;</label>
                  <SalaryBox
                    type="other_income_frequency"
                    parent="previous"
                    boxValue={previous.other_income_frequency}
                    radioGroupName="previousOtherIncomeFrequency"
                    handleChange={this.setFieldsValue}
                  />
                </InlineItem>
              </Form.Group>
            </Form>
          </ColumnContainer>
        </YourselfApplicationContactContainer>
      </AccordionForm>
    );
  }
}
const mapStateToProps = state => ({
  employments: state.application.employments
});
export default connect(mapStateToProps)(WorkFinanceForm);
