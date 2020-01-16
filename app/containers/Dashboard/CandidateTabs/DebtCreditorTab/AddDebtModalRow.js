import React from 'react';
import { Table, Radio, Input, Select } from 'semantic-ui-react';

const typeOptions = [
  { key: '1', value: 'credit card', text: 'Credit Card' },
  { key: '2', value: 'Medical Bill', text: 'Medical Bill' },
  { key: '3', value: 'Line of Credit', text: 'Line of Credit' },
  { key: '4', value: 'Personal Loan', text: 'Personal Loan' },
  { key: '5', value: 'Unsecured Debt', text: 'Unsecured Debt' },
  { key: '6', value: 'Other', text: 'Other' }
];

export default class AddDebtModalRow extends React.Component {
  render() {
    const { row, onChangeElement } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{row.index + 1}</Table.Cell>
        <Table.Cell>
          <Input
            className="input-box-w-100"
            value={row.debt_name || ''}
            onChange={(e, { value }) => onChangeElement({ value, name: 'debt_name' }, row.index)}
          />
        </Table.Cell>
        <Table.Cell>
          <Input
            className="input-box-w-100"
            value={row.creditor || ''}
            onChange={(e, { value }) => onChangeElement({ value, name: 'creditor' }, row.index)}
          />
        </Table.Cell>
        <Table.Cell>
          {/* <Input
            className="input-box-w-100"
            value={row.type || ''}
            onChange={(e, { value }) => onChangeElement({ value, name: 'type' }, row.index)}
          /> */}
          <Select options={typeOptions} placeholder="Select One" />
        </Table.Cell>
        <Table.Cell>
          <Input
            className="input-box-w-100"
            value={row.ecoa || ''}
            onChange={(e, { value }) => onChangeElement({ value, name: 'ecoa' }, row.index)}
          />
        </Table.Cell>
        <Table.Cell>
          <Input
            className="input-box-w-100"
            value={row.account_number || ''}
            onChange={(e, { value }) => onChangeElement({ value, name: 'account_number' }, row.index)}
          />
        </Table.Cell>
        <Table.Cell>
          <Input
            className="input-box-w-100"
            value={row.balance_original || ''}
            onChange={(e, { value }) => onChangeElement({ value, name: 'balance_original' }, row.index)}
          />
        </Table.Cell>
        <Table.Cell>
          <Radio
            name={`radioGroup-${row.index}`}
            className="phone"
            value={'Yes'}
            label="Yes"
            checked={row.is_push === 'Yes'}
            onChange={(e, { value }) => onChangeElement({ value, name: 'is_push' }, row.index)}
          />
          <Radio
            name={`radioGroup-${row.index}`}
            className="phone"
            value={'No'}
            label="No"
            checked={row.is_push === 'No'}
            onChange={(e, { value }) => onChangeElement({ value, name: 'is_push' }, row.index)}
          />
        </Table.Cell>
        <Table.Cell>
          <Input
            className="input-box-w-100"
            value={row.days_of_delinquent || ''}
            onChange={(e, { value }) => onChangeElement({ value, name: 'days_of_delinquent' }, row.index)}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}
