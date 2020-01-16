import React from 'react';
import { Dropdown, Input, Checkbox, Grid, Form, Button, Icon } from 'semantic-ui-react';
// import moment from 'moment';
import styled from 'styled-components';

const DropDownContent = styled.div`
  width: 720px;
  padding: 10px;
  margin: 10px;
  & label {
    background-color: #5fa1fc;
    box-shadow: 0px 4px 7px #00000026;
    border-radius: 19px;
    display: list-item;
    color: #ffffff;
    font: 14px Regular Lato;
    cursor: pointer;
    padding: 4px 10px;
    text-align: center;
    &.selected {
      background-color: #20cb96;
    }
  }
`;

const ActionButton = styled.div`
  margin: 10px;
`;

class ActionDropDownComponent extends React.Component {
  state = {
    popupOpen: false,
    columns: []
  };
  actionOn = () => {
    this.setState({ popupOpen: !this.state.popupOpen });
  };
  actionOff = () => {
    this.setState({ popupOpen: false });
  };
  noAction = e => {
    e.stopPropagation();
    let { columns } = this.state;
    if (e.target.htmlFor !== undefined) {
      columns.forEach(column => {
        if (column.value === e.target.htmlFor) {
          column.selected = true;
        } else {
          column.selected = false;
        }
      });
      this.setState({ columns: columns, popupOpen: false });
    }
  };
  componentDidMount() {
    this.setState({ columns: this.props.lists });
  }
  close = e => {
    this.setState({ popupOpen: false });
  };
  render() {
    const { popupOpen, columns } = this.state;
    return (
      <Dropdown
        text="ACTIONS"
        floating
        labeled
        open={popupOpen}
        multiple
        className="icon"
        direction="right"
        upward={false}
        onClick={this.actionOn}
        onBlur={this.actionOff}
        style={{
          font: '16px Regular Lato',
          color: '#9EA0A5',
          boxShadow: '0px 3px 4px #00000039',
          backgroundColor: '#5FA1FC',
          borderRadius: '7px',
          color: 'white'
        }}
      >
        <Dropdown.Menu onClick={this.noAction}>
          <DropDownContent>
            <Grid>
              <Grid.Row columns="3">
                {columns.map(
                  (item, id) =>
                    id % 3 === 0 && (
                      <Grid.Column key={id}>
                        <ActionButton>
                          <label htmlFor={item.value} className={item.selected ? 'selected' : ''}>
                            {item.value}
                          </label>
                        </ActionButton>
                      </Grid.Column>
                    )
                )}
                {columns.map(
                  (item, id) =>
                    id % 3 === 1 && (
                      <Grid.Column key={id}>
                        <ActionButton>
                          <label htmlFor={item.value} className={item.selected ? 'selected' : ''}>
                            {item.value}
                          </label>
                        </ActionButton>
                      </Grid.Column>
                    )
                )}
                {columns.map(
                  (item, id) =>
                    id % 3 === 2 && (
                      <Grid.Column key={id}>
                        <ActionButton>
                          <label htmlFor={item.value} className={item.selected ? 'selected' : ''}>
                            {item.value}
                          </label>
                        </ActionButton>
                      </Grid.Column>
                    )
                )}
              </Grid.Row>
            </Grid>
          </DropDownContent>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default ActionDropDownComponent;
