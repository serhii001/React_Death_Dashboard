import React from 'react';
import Dock from 'react-dock';
import { Tab } from 'semantic-ui-react';
import GeneralTab from '../CandidateTabs/GeneralTab';

import './style.css';
import ApplicationTab from '../CandidateTabs/ApplicationTab';

export default class CandidateItemTab extends React.Component {
  close = () => {
    this.props.hideItemTab();
  };

  render() {
    const panes = [
      {
        menuItem: 'General',
        render: () => (
          <Tab.Pane>
            <GeneralTab />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Application Information',
        render: () => (
          <Tab.Pane>
            <ApplicationTab />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Budget',
        render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
      }
    ];
    return (
      <div>
        <Dock position="bottom" dimMode="opaque" isVisible defaultSize={0.5} onVisibleChange={this.close}>
          {/* you can pass a function as a child here */}
          <Tab className="tabmenu" panes={panes} />
        </Dock>
      </div>
    );
  }
}
