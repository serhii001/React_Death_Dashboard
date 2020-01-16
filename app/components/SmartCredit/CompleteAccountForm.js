import React from 'react'
import { Button, Segment, Icon, Header, Modal, Loader, Dimmer } from 'semantic-ui-react'
import { API_ENDPOINT_URL } from "../../constants/defaults";

class CompleteAccountForm extends React.Component {
  state = {
    loading: false,
    error: null,
    ...this.props.data
  };

  handleSubmit = async (e) => {
    const { public_id } = this.state;
    const { onComplete, complete, data } = this.props;
    e.stopPropagation();
    if (complete) {
      onComplete('complete');
      return;
    }
    this.setState({ loading: true });

    const response = await fetch(`${API_ENDPOINT_URL}/candidates/${ public_id }/credit-report/account/${ data.credit_report_account.public_id }/complete`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const json_response = await response.json();
    if (response.ok) {
      onComplete('complete');
    } else {
      this.setState({ error: json_response.message })
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
    const { data } = this.props;

    return (
      <Modal.Description>
        <Dimmer active={ loading }>
          <Loader active inline='centered'>Completing Account SignUp with third party...</Loader>
        </Dimmer>

        <Segment placeholder>
          <Header icon>
            <Icon name='certificate' />
            Credit Report account for { data.first_name } { data.last_name } has been verified!
          </Header>
          <Segment.Inline>
            <Button positive onClick={ (e) => this.handleSubmit(e) }>Complete Profile</Button>
          </Segment.Inline>
        </Segment>
      </Modal.Description>
    )
  }
}

export default CompleteAccountForm;
