import React from 'react';
import { Select } from 'semantic-ui-react';

const limitOptions = [
  { key: '0', value: '10', text: '10' },
  { key: '1', value: '25', text: '25' },
  { key: '2', value: '50', text: '50' },
  { key: '3', value: '100', text: '100' },
  { key: '4', value: '500', text: 'All' }
];

export const CandidatePageSizeSelect = props => (
  <React.Fragment>
    <Select options={limitOptions} defaultValue={props.limit} onChange={props.onChangeLimit} />
  </React.Fragment>
);
