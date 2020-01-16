import { Table, Checkbox, Icon, Image, Button } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';
import AddDebtModal from './AddDebtModal';

const AddIcon = styled.div`
  & i {
    color: #5fa1fc;
  }
  cursor: pointer;
`;

const DeleteIcon = styled.div`
  & i {
    color: #ff6c6c;
  }
  cursor: pointer;
`;

const TableHeaderBreak = styled.div`
  height: 20px;
`;

export default class DebitCreditorTableHeader extends React.Component {
  state = {
    openDebtModal: false
  };

  downloadRows = () => {
    alert('Download');
  };

  removeRows = () => {
    alert('Remove');
  };

  openAddDebtModal = dimmer => this.setState({ dimmer, openDebtModal: true });
  closeAddDebtModal = () => this.setState({ openDebtModal: false });

  render() {
    const { openDebtModal, dimmer } = this.state;
    const { columns } = this.props;
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Checkbox onClick={this.props.selectAll} />
            <TableHeaderBreak />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <AddIcon onClick={this.props.addRow}>
              <Icon name="plus circle" />
            </AddIcon>
            <TableHeaderBreak />
          </Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'id' ? this.props.direction : null}>
            <DeleteIcon onClick={this.removeRows}>
              <Icon name="trash" />
            </DeleteIcon>
            <TableHeaderBreak />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <AddIcon onClick={this.props.addRow}>
              <Icon name="edit" />
            </AddIcon>
            <TableHeaderBreak />
          </Table.HeaderCell>
          {columns.map(
            (item, id) =>
              item.show && (
                <Table.HeaderCell key={id} sorted={this.props.column === item.value ? this.props.direction : null}>
                  <TableHeaderBreak />
                  {item.value}
                </Table.HeaderCell>
              )
          )}
        </Table.Row>
      </Table.Header>
    );
  }
}
