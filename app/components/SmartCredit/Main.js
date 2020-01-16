  import React from 'react';
import { Container } from 'semantic-ui-react';
import SmartCreditModal from './SmartCreditModal';
import CandidatesTable from '../Dashboard/CandidateTable';

class Main extends React.Component {
  state = { open: false }

  show = (data) => {
    this.setState({ data, open: true });
  };

  close = () => this.setState({ open: false });

  render() {
    const { open, data } = this.state;

    return (
      <Container fluid>
        <CandidatesTable onCreditPull={ this.show } />

        <SmartCreditModal dimmer={ 'blurring' } open={ open } onClose={ this.close } data={ data } />
      </Container>
    )
  }
}

export default Main;
