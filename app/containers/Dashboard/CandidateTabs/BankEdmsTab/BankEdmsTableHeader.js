import React from 'react';
import { Table, Checkbox } from 'semantic-ui-react';

class BankEdmsTableHeader extends React.Component {
  render() {
    const { columns } = this.props;
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Checkbox onClick={this.props.selectAll} />
          </Table.HeaderCell>
          <Table.HeaderCell />
          <Table.HeaderCell />
          <Table.HeaderCell />
          {columns.map((item, id) => item.show && <Table.HeaderCell key={id}>{item.value}</Table.HeaderCell>)}
        </Table.Row>
      </Table.Header>
    );
  }
}

export default BankEdmsTableHeader;
