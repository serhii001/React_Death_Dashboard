import React, { Component } from 'react'
import { Step, Modal } from 'semantic-ui-react'
import CreateAccountForm from './CreateAccountForm';
import AccountDetailsForm from './AccountDetailsForm';
import AccountVerifyForm from './AccountVerifyForm';
import CompleteAccountForm from './CompleteAccountForm';


class SmartCreditModal extends Component {
  state = {
    identify_flow_state: true,
    account_create: false,
    account_details: false,
    account_verify: false,
    account_complete: false
  };

  completed = (step, credit_data) => {
    this.setState({ credit_data });

    if ('create' === step) {
      this.setState({ account_create: true })
    } else if ('details' === step) {
      this.setState({ account_details: true })
    } else if ('verify' === step) {
      this.setState({ account_verify: true })
    } else if ('complete' === step) {
      this.handleClose();
    }
  };

  handleOpen = () => {
    const { data = {} } = this.props;
    const account_status = data.credit_report_account && data.credit_report_account.status;

    if (account_status === 'INITIATING_SIGNUP') {
      this.setState({
        account_create: false,
        account_details: false,
        account_verify: false,
        account_complete: false,
        identify_flow_state: false
      });
    }
    if (account_status === 'ACCOUNT_CREATED') {
      this.setState({
        account_create: true,
        account_details: false,
        account_verify: false,
        account_complete: false,
        identify_flow_state: false
      });
    }
    if (account_status === 'ACCOUNT_VALIDATING') {
      this.setState({
        account_create: true,
        account_details: true,
        account_verify: false,
        account_complete: false,
        identify_flow_state: false
      });
    }
    if (account_status === 'ACCOUNT_VALIDATED') {
      this.setState({
        account_create: true,
        account_details: true,
        account_verify: true,
        account_complete: false,
        identify_flow_state: false
      });
    }
    if (account_status === 'FULL_MEMBER') {
      // TODO: screen to show that no more action is needed since this account is complete
      this.setState({
        account_create: true,
        account_details: true,
        account_verify: true,
        account_complete: true,
        identify_flow_state: false
      });
    }
  };

  handleClose = () => {
    const { onClose } = this.props;
    this.setState({
      account_create: false,
      account_details: false,
      account_verify: false,
      account_complete: false,
      identify_flow_state: true
    });
    onClose();
  };

  render() {
    const { credit_data, account_create, account_details, account_verify, account_complete, identify_flow_state } = this.state;
    const { data, open, dimmer } = this.props;

    if (open && identify_flow_state) {
      this.handleOpen();
    }

    let modalContent = null;
    if (!account_create) {
      modalContent = <CreateAccountForm data={ data } onComplete={ this.completed.bind(this) } onclose={ onclose } />
    } else if (account_create && !account_details) {
      modalContent =
        <AccountDetailsForm data={ Object.assign(data, credit_data) } onComplete={ this.completed.bind(this) }
                            onclose={ onclose } />
    } else if (account_details && !account_verify) {
      modalContent =
        <AccountVerifyForm data={ Object.assign(data, credit_data) } onComplete={ this.completed.bind(this) }
                           onclose={ onclose } />
    } else if (account_verify) {
      modalContent =
        <CompleteAccountForm data={ Object.assign(data, credit_data) } complete={ account_complete }
                             onComplete={ this.completed.bind(this) } onclose={ onclose } />
    }

    return (
      <div>
        <Modal size={ 'large' } dimmer={ dimmer } open={ open }
               closeIcon={ true } closeOnEscape={ false } closeOnDimmerClick={ false }
               onOpen={ () => console.log('opening') } onClose={ this.handleClose.bind(this) }>
          <Modal.Header>Smart Credit Profile</Modal.Header>
          <Modal.Content>
            { modalContent }
          </Modal.Content>
          <Modal.Actions>
            <Step.Group ordered>
              <Step active={ !account_create } completed={ account_create }>
                <Step.Content>
                  <Step.Title>Credit Account</Step.Title>
                  <Step.Description>Create Smart Credit account</Step.Description>
                </Step.Content>
              </Step>

              <Step active={ account_create && !account_details } completed={ account_details }>
                <Step.Content>
                  <Step.Title>Account Details</Step.Title>
                  <Step.Description>Provide additional details</Step.Description>
                </Step.Content>
              </Step>

              <Step active={ account_details && !account_verify } completed={ account_verify }>
                <Step.Content>
                  <Step.Title>Verify Identity</Step.Title>
                  <Step.Description>Answer questions to verify identity</Step.Description>
                </Step.Content>
              </Step>
              <Step active={ account_verify }>
                <Step.Content>
                  <Step.Title>Account Verified</Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default SmartCreditModal
