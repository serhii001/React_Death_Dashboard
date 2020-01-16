import React from 'react'
import { Button, Dimmer, Form, Header, Loader, Message, Modal } from 'semantic-ui-react'
import { API_ENDPOINT_URL } from "../../constants/defaults";

class CreateAccountForm extends React.Component {
  state = {
    loading: false,
    error: null,
    ...this.props.data
  };


  handleFirstNameChange = (first_name) => {
    this.setState({ first_name })
  };

  handleLastNameChange = (last_name) => {
    this.setState({ last_name })
  };

  handleEmailChange = (email) => {
    this.setState({ email })
  };

  handlePhoneChange = (phone) => {
    this.setState({ phone })
  };

  handleZipChange = (zip) => {
    this.setState({ zip })
  };

  resetForm = () => {
    this.setState({error: false})
  };

  handleSubmit = async (e) => {
    const { public_id, first_name, last_name, email, phone, zip } = this.state;
    const { onComplete } = this.props;
    e.stopPropagation();
    this.resetForm();
    this.setState({ loading: true });
    const response = await fetch(`${API_ENDPOINT_URL}/candidates/${ public_id }/credit-report/account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        first_name,
        last_name,
        // email,
        phone,
        zip: (zip || '').split('-')[0]
      })
    });

    const json_response = await response.json();
    if (response.ok) {
      onComplete('create', { 'credit_report_account': { 'public_id': json_response.public_id, phone } });
      this.setState({ error: false });
    } else {
      this.setState({ error: json_response.message })
    }
    this.setState({ loading: false });
  };


  render() {
    const { loading, error, first_name, last_name, email, phone, zip } = this.state;

    let error_message = null;
    if (error != null) {
      console.log('setting error message');
      error_message = <Message error header='Error' content={ error } />
    }

    return (
      <Modal.Description>
        <Dimmer active={ loading }>
          <Loader active inline='centered'>Creating Account...</Loader>
        </Dimmer>

        <Header>Candidate Information</Header>
        <Form error={ error != null }>
          <Form.Group widths='equal'>
            <Form.Input fluid label='First name' placeholder='First name' value={ first_name }
                        onChange={ (e) => this.handleFirstNameChange(e.target.value) } />
            <Form.Input fluid label='Last name' placeholder='Last name' value={ last_name }
                        onChange={ (e) => this.handleLastNameChange(e.target.value) } />
          </Form.Group>
          <Form.Group widths='equal'>
            {/*<Form.Input fluid label='Email' placeholder='Email' value={ email || '' }*/}
                        {/*onChange={ (e) => this.handleEmailChange(e.target.value) } />*/}
            <Form.Input fluid label='Phone Number' placeholder='###-###-####' value={ phone || '' }
                        onChange={ (e) => this.handlePhoneChange(e.target.value) } />
            <Form.Input fluid label='Zip Code' placeholder='5 digit zip' value={ (zip || '').split('-')[0] }
                        onChange={ (e) => this.handleZipChange(e.target.value) } />
          </Form.Group>
          { error_message }
          <Button onClick={ (e) => this.handleSubmit(e) }>Submit</Button>
        </Form>
      </Modal.Description>
    );
  }
}

export default CreateAccountForm;
