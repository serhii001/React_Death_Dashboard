import { Table } from 'semantic-ui-react';
import React from 'react';
import { get } from 'axios';
import { API_ENDPOINT_URL } from '../../constants/defaults';

class Candidates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount = async () => {
    const url = `${API_ENDPOINT_URL}/candidates/`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    return get(url, config)
      .then(res => {
        console.log('res', res);
        this.setState({ data: (res && res.data && res.data.data) || [] });
      })
      .catch(err => console.log('error', err));
  };

  render() {
    const { data } = this.state;
    console.log(data);

    const rows = data.map(record => (
      <Table.Row key={record.public_id}>
        <Table.Cell>{record.public_id}</Table.Cell>
        <Table.Cell>{record.first_name}</Table.Cell>
        <Table.Cell>{record.middle_initial}</Table.Cell>
        <Table.Cell>{record.last_name}</Table.Cell>
        <Table.Cell>{record.campaign_id}</Table.Cell>
      </Table.Row>
    ));

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Middle Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Campaign ID</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{rows}</Table.Body>
      </Table>
    );
  }
}

export default Candidates;
