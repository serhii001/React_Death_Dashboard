// This is a template for creating new reactJS files

// Importing React
import React from 'react';
import { Container, Tab } from 'semantic-ui-react';
import styles from 'styled-components';
import CandidatesTable from './Candidates';
import CampaignTable from './Campaign';
import Imports from './Imports';

const Tabs = styles(Tab)`
  border: none !important;
  box-shadow: none !important;
  color: #000;
`;
const Pane = styles(Tab.Pane)`
  border: none !important;
  box-shadow: none !important;
  color: #000;
`;

export default class Data extends React.Component {
  render() {
    const panes = [
      {
        menuItem: 'Campaign',
        render: () => (
          <Pane attached={false}>
            <CampaignTable />
          </Pane>
        )
      },
      {
        menuItem: 'Candidates',
        render: () => (
          <Pane attached={false}>
            <CandidatesTable />
          </Pane>
        )
      },
      {
        menuItem: 'Imports',
        render: () => (
          <Pane attached={false}>
            <Imports />
          </Pane>
        )
      }
    ];

    return (
      <Container fluid>
        <Tabs menu={{ pointing: true }} panes={panes} />
      </Container>
    );
  }
}
