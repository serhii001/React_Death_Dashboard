import React from 'react'
import { Button, Dimmer, Form, Header, Loader, Message, Modal } from 'semantic-ui-react'
import { API_ENDPOINT_URL } from "../../constants/defaults";


class AccountVerifyForm extends React.Component {
  state = {
    loading: false,
    error: null,
    referenceNumber: null,
    questions: null,
    answers: {}
  };

  componentDidMount = async () => {
    const { data } = this.props;
    this.setState({ loading: true });
    const response = await fetch(`${API_ENDPOINT_URL}/candidates/${ data.public_id }/credit-report/account/${ data.credit_report_account.public_id }/verification-questions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const json_response = await response.json();
    if (response.ok) {
      this.setState({
        reference_number: json_response.idVerificationCriteria.referenceNumber,
        questions: json_response
      })
    } else {
      this.setState({ error: json_response.message })
    }
    this.setState({ loading: false });
  }

  handleChoiceSelect = (key, answer) => {
    let { answers } = this.state;
    answers[key.replace('question', 'answer')] = answer;
    this.setState({ answers })
  };

  resetForm = () => {
    this.setState({ error: false })
  };

  handleSubmit = async (e) => {
    const { reference_number, answers } = this.state;
    const { onComplete, data } = this.props;
    e.stopPropagation();
    this.resetForm();
    this.setState({ loading: true });

    let credit_report_account_id = data.credit_report_account.public_id;
    const response = await fetch(`${API_ENDPOINT_URL}/candidates/${ data.public_id }/credit-report/account/${ credit_report_account_id }/verification-questions`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        reference_number,
        answers
      })
    });
    const json_response = await response.json();
    if (response.ok) {
      onComplete('verify', { 'credit_report_account': { 'public_id': credit_report_account_id } })
    } else {
      this.setState({ error: json_response.message })
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading, error, questions } = this.state;

    let loader = null;
    if (questions === null) {
      loader = <Loader active inline='centered'>Retrieving verification questions...</Loader>
    } else {
      loader = <Loader active inline='centered'>Sending verification answers...</Loader>
    }

    let question_els = null;

    if (questions != null) {
      const verificationCriteria = questions.idVerificationCriteria;

      question_els = Object.keys(verificationCriteria).filter(key => {
        return key.startsWith('question');
      }).map(key => {
        const answers = verificationCriteria[key].choiceList.choice.map((choice) => {
          return (
            <Form.Field
              label={ choice.display }
              control='input'
              type='radio'
              value={ choice.key }
              name={ key }
              onChange={ () => this.handleChoiceSelect(key, choice.key) }
            />
          )
        });

        return (
          <Form.Group grouped>
            <label>{ verificationCriteria[key].displayName }</label>
            { answers }
          </Form.Group>
        )
      });
    }

    let error_message = null;
    if (error != null) {
      error_message = <Message error header='Error' content={ error } />
    }

    return (
      <Modal.Description>
        <Dimmer active={ loading }>
          { loader }
        </Dimmer>

        <Header>Verify Identity</Header>
        <Form error={ error != null }>
          { question_els }
          { error_message }
          <Button onClick={ (e) => this.handleSubmit(e) }>Submit</Button>
        </Form>
      </Modal.Description>
    )
  }
}

export default AccountVerifyForm;
