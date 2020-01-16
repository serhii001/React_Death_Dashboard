import React from 'react'
import _ from 'lodash';
import { Dimmer, Form, Header, Loader, Message, Modal } from 'semantic-ui-react'
import { API_ENDPOINT_URL } from "../../constants/defaults";

class AccountDetailsForm extends React.Component {
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

  handleAddressChange = (address) => {
    this.setState({ address })
  };

  handleAddress2Change = (address2) => {
    this.setState({ address2 })
  };

  handleCityChange = (city) => {
    this.setState({ city })
  };

  handleStateChange = (state) => {
    this.setState({ state })
  };

  handleZipChange = (zip) => {
    this.setState({ zip })
  };

  handlePhoneChange = (phone) => {
    this.setState({ phone })
  };

  handleDateOfBirthChange = (dob) => {
    this.setState({ dob })
  };

  handleSSNChange = (ssn) => {
    this.setState({ ssn })
  };

  handleSSN4Change = (ssn4) => {
    this.setState({ ssn4 })
  };

  resetForm = () => {
    this.setState({error: false})
  };

  handleSubmit = async (e) => {
    const { public_id, first_name, last_name, phone, address, address2, city, state, zip, dob, ssn, ssn4 } = this.state;
    const { onComplete, data } = this.props;
    e.stopPropagation();
    this.resetForm();
    this.setState({ loading: true });
    let payload = {
      first_name,
      last_name,
      phone,
      street: address,
      dob,
      zip: (zip || '').split('-')[0]
    };

    if (ssn != null) {
      payload['ssn'] = ssn;
      payload['ssn4'] = ssn4;
      // _.unset(payload, 'ssn4')
    } else {
      payload['ssn4'] = ssn4
    }

    Object.assign(payload, this.optionallyAddToPayload({ 'street2': address2, 'city': city, 'state': state }));

    const response = await fetch(`${API_ENDPOINT_URL}/candidates/${ public_id }/credit-report/account/${ data.credit_report_account.public_id }`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const json_response = await response.json();
    if (response.ok) {
      onComplete('details', { 'credit_report_account': { 'public_id': data.credit_report_account.public_id } });
      this.setState({ error: false });
    } else {
      this.setState({ error: json_response.message })
    }
    this.setState({ loading: false });
  };


  render() {
    const { loading, error, first_name, last_name, address, address2, city, state, zip, phone, dob, ssn, ssn4 } = this.state;

    let error_message = null;
    if (error != null) {
      error_message = <Message error header='Error' content={ error } />
    }

    return (
      <Modal.Description>
        <Dimmer active={ loading }>
          <Loader active inline='centered'>Updating detailed account information...</Loader>
        </Dimmer>

        <Header>Detailed Information</Header>
        <Form error={ error != null }>
          <Form.Group widths='equal'>
            <Form.Input fluid label='First name' placeholder='First name' value={ first_name }
                        onChange={ (e) => this.handleFirstNameChange(e.target.value) } />
            <Form.Input fluid label='Last name' placeholder='Last name' value={ last_name }
                        onChange={ (e) => this.handleLastNameChange(e.target.value) } />
          </Form.Group>
          <Form.Group>
            <Form.Input fluid label='Address' placeholder='Street Address' value={ address }
                        onChange={ (e) => this.handleAddressChange(e.target.value) } width={ 9 } />
            <Form.Input fluid label='Address 2' placeholder='Apt / Unit' value={ address2 }
                        onChange={ (e) => this.handleAddress2Change(e.target.value) } width={ 4 } />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid label='City' placeholder='City' value={ city }
                        onChange={ (e) => this.handleCityChange(e.target.value) } width={ 6 } />
            <Form.Input fluid label='State' placeholder='2 Letter State' value={ state }
                        onChange={ (e) => this.handleStateChange(e.target.value) } width={ 3 } />
            <Form.Input fluid label='Zip Code' placeholder='5 digit zip' value={ (zip || '').split('-')[0] }
                        onChange={ (e) => this.handleZipChange(e.target.value) } width={ 5 } />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Phone' placeholder='###-###-####' value={ phone }
                        onChange={ (e) => this.handlePhoneChange(e.target.value) } />
            <Form.Input fluid label='Date of Birth' placeholder='MM/DD/YYYY' value={ dob }
                        onChange={ (e) => this.handleDateOfBirthChange(e.target.value) } />
            <Form.Input fluid label='SSN' placeholder='###-###-####' value={ ssn }
                        onChange={ (e) => this.handleSSNChange(e.target.value) } />
            <Form.Input fluid label='SSN (last 4 digits)' placeholder='####' value={ ssn4 }
                        onChange={ (e) => this.handleSSN4Change(e.target.value) } />
          </Form.Group>
          { error_message }
          <Form.Button onClick={ (e) => this.handleSubmit(e) }>Submit</Form.Button>
        </Form>
      </Modal.Description>
    )
  }

  optionallyAddToPayload(values) {
    let additionalValues = {};
    _.forOwn(values, (value, key) => {
      if (value != null || value !== '') {
        additionalValues[key] = value;
      }
    });
    return additionalValues;
  }
}

export default AccountDetailsForm
