import React from 'react';
import { Tab } from 'semantic-ui-react';
import { map } from 'lodash';

import GeneralTab from '../CandidateTabs/GeneralTab';
import ApplicationTab from '../CandidateTabs/ApplicationTab';
import BudgetTab from '../CandidateTabs/BudgetTab';
import AllNotes from "../../../components/AllNotes/index";
import DebtCreditorTab from '../CandidateTabs/DebtCreditorTab';

import './style.css';
import BankEdmsTab from '../CandidateTabs/BankEdmsTab';

export default class CandidateRowContent extends React.Component {
  state = {
    candidate: null
  };
  close = () => {
    this.props.hideItemTab();
  };

  render() {
    const { candidate, onCreditPull, leads, onUpdateCandidate } = this.props;

    const panes = [
      {
        menuItem: 'General',
        render: () => (
          <Tab.Pane>
            <GeneralTab candidate={candidate} />
            <AllNotes />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Application Information',
        render: () => (
          <Tab.Pane>
            <ApplicationTab candidate={candidate} onCreditPull={onCreditPull} onUpdate={onUpdateCandidate} />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Budget',
        render: () => (
          <Tab.Pane>
            <BudgetTab candidate={candidate} />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Debt & Creditors',
        render: leads ? () => (
          <Tab.Pane>
            <DebtCreditorTab candidate={candidate} />
          </Tab.Pane>
        ) : null
      },
      {
        menuItem: 'Bank & EDMS',
        render: leads ? () => (
          <Tab.Pane>
            <BankEdmsTab candidate={candidate} />
          </Tab.Pane>
        ) : null
      }
    ];
    return (
      <div>
        {/* you can pass a function as a child here */}
        <Tab className="tabmenu" panes={map(panes, item => !!item.render && item)} />
      </div>
    );
  }
}
