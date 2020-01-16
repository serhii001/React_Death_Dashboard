import React from 'react';

import AccordionForm from '../../../../components/AccordionForm';
import {
  NameLabel,
  PullSmartCreditButton,
  ExpeditedDecisionButton,
  SubmitToUnderwriterButton,
  InputGroup,
  BoldLabelTitle,
  InlineItem,
  DatePickerWrap,
  SelectWrap,
  FormRight,
  AutoFill
} from '../styles';
import {
  Container,
  ActionContainer,
  YourselfApplicationContainer,
  YourselfApplicationNameColumnContainer,
  YourselfApplicationContactContainer,
  YourselfApplicationContact2ColumnContainer,
  YourselfApplicationContactColumnContainer,
  RowContainer,
  ColumnContainer
} from './style';
import LanguageBox from '../LanguageBox';
import StatusBox from '../StatusBox';
import { Form, Button } from 'semantic-ui-react';
import PhoneInputSelectBox from '../PhoneInputSelectBox';
import AllNotes from '../../../../components/AllNotes';
import SalaryBox from '../SalaryBox';
import UserProfileForm from './UserProfileForm';
import WorkFinanceForm from './WorkFinanceForm';

class ApplicationTab extends React.Component {
  state = {
    candidate: {}
  };

  componentDidMount() {
    this.setCandidate();
  }

  componentDidUpdate(prevProps, prevState) {
    const { candidate } = this.props;

    if (candidate !== prevProps.candidate) {
      this.setCandidate();
    }

    if (this.state.candidate !== prevState.candidate && prevState.candidate) {
      this.updateCandidate();
    }
  }

  setCandidate = () => {
    const { candidate } = this.props;

    this.setState({ candidate });
  };

  updateCandidate = () => {
    const { candidate } = this.state;
    const { onUpdate } = this.props;

    onUpdate(candidate);
  };

  onChange = field => event => {
    const value = event.target && event.target.value;
    this.setState(state => ({ candidate: { ...state.candidate, [field]: value }}));
  };

  onChangeDate = field => value => {
    console.log('onChangeDate', field, value)
    this.setState(state => ({ candidate: { ...state.candidate, [field]: value }}));
  };

  onCreditPull = () => {
    const { onCreditPull, candidate } = this.props;
    onCreditPull(candidate);
  };

  render() {
    const { candidate } = this.state;
    const sampleOptions = [{ key: 'aa', value: 'aa', text: 'Before' }, { key: 'bb', value: 'bb', text: 'After' }];
    const timezoneOptions = [{ key: 'aa', value: 'aa', text: 'EST' }, { key: 'bb', value: 'bb', text: 'EST' }];
    return (
      <Container>
        <ActionContainer>
          <div>
            <NameLabel>
              {candidate.first_name} {candidate.last_name}
            </NameLabel>
          </div>
          <PullSmartCreditButton onClick={this.onCreditPull}>Pull Smart Credit</PullSmartCreditButton>
          <ExpeditedDecisionButton>Expedited Decision</ExpeditedDecisionButton>
          <SubmitToUnderwriterButton>Submit to Underwriter</SubmitToUnderwriterButton>
        </ActionContainer>
        <UserProfileForm candidate={candidate} />
        <WorkFinanceForm candidate={candidate} />
        <AccordionForm title="Tell Us About Your Co-Borrower (Optional)">
          <YourselfApplicationContainer>
            <YourselfApplicationContactContainer>
              <YourselfApplicationContactColumnContainer>
                <InputGroup>
                  <BoldLabelTitle>Preferred Language</BoldLabelTitle>
                  <LanguageBox value={candidate.language} />
                </InputGroup>
                <Form>
                  <Form.Group>
                    <Form.Input label="Client ID #" width={10} value={candidate.public_id} />
                    <Form.Input content="Verify" width={6} className="verifybutton" control={Button} />
                  </Form.Group>
                </Form>
              </YourselfApplicationContactColumnContainer>
              <YourselfApplicationNameColumnContainer>
                <Form>
                  <Form.Group>
                    <Form.Input label="First name" width={6} value={candidate.first_name || ''} />
                    <Form.Input label="Last name" width={6} value={candidate.last_name || ''} />
                    <Form.Input label="MI" width={4} value={candidate.middle_initial || ''} />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group>
                    <InlineItem>
                      <label>DOB</label>
                      <DatePickerWrap selected={candidate.dob} />
                    </InlineItem>
                    <Form.Input label="SSN" width={10} value={candidate.ssn4 || ''} />
                  </Form.Group>
                </Form>
              </YourselfApplicationNameColumnContainer>
              <YourselfApplicationContact2ColumnContainer>
                <PhoneInputSelectBox candidate={candidate} />
              </YourselfApplicationContact2ColumnContainer>
            </YourselfApplicationContactContainer>
            <YourselfApplicationContactContainer>
              <YourselfApplicationNameColumnContainer>
                <FormRight>
                  <Form.Group>
                    <Form.Input label="Email" width={3} value={candidate.email || ''} />
                    <InlineItem width={150}>
                      <label>&nbsp;</label>
                      <SelectWrap fluid options={sampleOptions} />
                    </InlineItem>
                    <Form.Input label="Best Time to Contact" width={3} value={candidate.timeToContact || ''} />
                    <InlineItem width={100}>
                      <label>Time Zone</label>
                      <SelectWrap fluid options={timezoneOptions} />
                    </InlineItem>
                  </Form.Group>
                </FormRight>
              </YourselfApplicationNameColumnContainer>
            </YourselfApplicationContactContainer>
            <YourselfApplicationContactContainer>
              <YourselfApplicationNameColumnContainer>
                <BoldLabelTitle>Address Information</BoldLabelTitle>
                <Form>
                  <Form.Group>
                    <Form.Input label="Address" width={6} value={candidate.address || ''} />
                    <Form.Input label="APT #" width={6} value={candidate.apt || ''} />
                    <Form.Input label="Zip Code" width={4} value={candidate.zip_code || ''} />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group>
                    <Form.Input label="City" width={4} value={candidate.city || ''} />
                    <Form.Input label="State" width={8} value={candidate.state || ''} />
                    <Form.Input label="Time Zone" width={4} value={candidate.time_zone || ''} />
                  </Form.Group>
                </Form>
                <BoldLabelTitle>Duration at current address</BoldLabelTitle>
                <Form>
                  <Form.Group>
                    <InlineItem>
                      <label>From</label>
                      <DatePickerWrap />
                    </InlineItem>
                    <InlineItem>
                      <label>To</label>
                      <DatePickerWrap />
                    </InlineItem>
                  </Form.Group>
                </Form>
              </YourselfApplicationNameColumnContainer>
              <AutoFill>
                <a>Auto Fill</a>
              </AutoFill>
              <YourselfApplicationNameColumnContainer>
                <BoldLabelTitle>Previous Address Information</BoldLabelTitle>
                <Form>
                  <Form.Group>
                    <Form.Input label="Address" width={6} value={candidate.address || ''} />
                    <Form.Input label="APT #" width={6} value={candidate.apt || ''} />
                    <Form.Input label="Zip Code" width={4} value={candidate.zip_code || ''} />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group>
                    <Form.Input label="City" width={4} value={candidate.city || ''} />
                    <Form.Input label="State" width={8} value={candidate.state || ''} />
                    <Form.Input label="Time Zone" width={4} value={candidate.time_zone || ''} />
                  </Form.Group>
                </Form>
                <BoldLabelTitle>Duration at past address</BoldLabelTitle>
                <Form>
                  <Form.Group>
                    <InlineItem>
                      <label>From</label>
                      <DatePickerWrap />
                    </InlineItem>
                    <InlineItem>
                      <label>To</label>
                      <DatePickerWrap />
                    </InlineItem>
                  </Form.Group>
                </Form>
              </YourselfApplicationNameColumnContainer>
              <AutoFill>
                <a>Auto Fill</a>
              </AutoFill>
            </YourselfApplicationContactContainer>
          </YourselfApplicationContainer>
        </AccordionForm>
        <AccordionForm title="Tell Us About Your Co-Borrower's Work and Finances (Optional)">
          <RowContainer>
            <StatusBox label="Current Status" />
          </RowContainer>
          <YourselfApplicationContactContainer>
            <ColumnContainer>
              <BoldLabelTitle>Current Employment</BoldLabelTitle>
              <Form>
                <Form.Group>
                  <Form.Input label="Employer Name" width={6} value={candidate.employer || ''} />
                  <InlineItem>
                    <label>From</label>
                    <DatePickerWrap />
                  </InlineItem>
                  <InlineItem>
                    <label>To</label>
                    <DatePickerWrap />
                  </InlineItem>
                </Form.Group>
                <Form.Group>
                  <Form.Input label="Gross Salary / Pension ($)" width={6} value={candidate.salary || ''} />
                  <InlineItem>
                    <label>&nbsp;</label>
                    <SalaryBox radioGroupName="current_gross_salary_radio_group" />
                  </InlineItem>
                </Form.Group>
                <Form.Group>
                  <Form.Input label="Other Income ($)" width={6} value={candidate.other_income || ''} />
                  <InlineItem>
                    <label>&nbsp;</label>
                    <SalaryBox radioGroupName="current_other_income_radio_group" />
                  </InlineItem>
                </Form.Group>
              </Form>
            </ColumnContainer>
            <ColumnContainer>
              <BoldLabelTitle>Past Employment</BoldLabelTitle>
              <Form>
                <Form.Group>
                  <Form.Input label="Employer Name" width={6} value={candidate.employer || ''} />
                  <InlineItem>
                    <label>From</label>
                    <DatePickerWrap />
                  </InlineItem>
                  <InlineItem>
                    <label>To</label>
                    <DatePickerWrap />
                  </InlineItem>
                </Form.Group>
                <Form.Group>
                  <Form.Input label="Gross Salary / Pension ($)" width={6} value={candidate.salary || ''} />
                  <InlineItem>
                    <label>&nbsp;</label>
                    <SalaryBox radioGroupName="previous_gross_salary_radio_group" />
                  </InlineItem>
                </Form.Group>
                <Form.Group>
                  <Form.Input label="Other Income ($)" width={6} value={candidate.other_income || ''} />
                  <InlineItem>
                    <label>&nbsp;</label>
                    <SalaryBox radioGroupName="previous_other_income_radio_group" />
                  </InlineItem>
                </Form.Group>
              </Form>
            </ColumnContainer>
          </YourselfApplicationContactContainer>
        </AccordionForm>
        <AllNotes />
      </Container>
    );
  }
}

export default ApplicationTab;
