import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

import styled from 'styled-components';

const ResetFieldButton = styled.span`
  font: 17px Semibold Open Sans;
  letter-spacing: 0;
  text-decoration: underline;
  letter-spacing: 0;
  color: #ff0000;
  cursor: pointer;
  float: right;
  margin: 0 10px;
`;

class AccordionForm extends React.Component {
  state = {
    active: false
  };
  handleClick = e => {
    const { active } = this.state;
    this.setState({ active: !active });
  };
  handleReset = e => {
    e.stopPropagation();
    const { resetConfig } = this.props;
    if (resetConfig && typeof resetConfig === 'function') {
      resetConfig();
    }
  };
  render() {
    const { active } = this.state;
    const { title, resetConfig, bluetitle } = this.props;
    const titleStyle = {
      fontSize: '20px',
      color: '#00a7fa'
    };
    const titleblueStyle = {
      fontSize: '20px',
      color: '#00a7fa !important'
    };
    return (
      <Accordion fluid styled>
        <Accordion.Title
          style={bluetitle ? { fontSize: '20px', color: '#00a7fa' } : { fontSize: '20px', color: '#FF7F00' }}
          active={active === true}
          index={0}
          onClick={this.handleClick}
        >
          {title}
          <span style={{ float: 'right' }}>
            <Icon
              name={active === true ? 'angle down' : 'angle right'}
              style={{
                fontSize: '25px',
                color: '#00A7FA'
              }}
            />
          </span>
          {active && resetConfig && <ResetFieldButton onClick={this.handleReset}>Reset Fields</ResetFieldButton>}
        </Accordion.Title>
        <Accordion.Content active={active === true} style={{ padding: '0 20px 20px 20px' }}>
          {this.props.children}
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default AccordionForm;
