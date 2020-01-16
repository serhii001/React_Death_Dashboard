import React from 'react';
import { Dropdown, Checkbox, Grid, Form, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const DropDownContent = styled.div`
  width: max-content;
  padding: 10px;
  margin: 10px;
  & input {
    border-radius: 20px !important;
    color: #5fa1fc !important;
    font: 16px Light Lato !important;
  }
  & label {
    font: 15px Light Lato !important;
    letter-spacing: 0;
    color: #959494 !important;
  }
  & .ui.checkbox input:checked ~ .box:before,
  & .ui.checkbox input:checked ~ label:before {
    background: #5fa1fc !important;
    border-color: #ebebeb !important;
  }

  & .ui.checkbox input:checked ~ .box:after,
  & .ui.checkbox input:checked ~ label:after {
    opacity: 1;
    color: rgba(255, 255, 255, 0.95) !important;
  }
`;

const CheckboxList = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  & li {
    margin-top: 10px;
  }
`;

class FilterDropDownComponent extends React.Component {
  state = {
    popupOpen: false,
    columns: [],
    markAll: false,
    unmarkAll: false,
    filters: {
      data_fine: new Date(),
      data_inizio: new Date()
    }
  };
  filterOn = () => {
    this.setState({ popupOpen: !this.state.popupOpen });
  };
  noAction = e => {
    e.stopPropagation();
    let { columns } = this.state;
    if (e.target.htmlFor === 'Mark All') {
      columns.forEach(column => {
        column.show = true;
      });
      this.setState({ columns: columns, markAll: true, unmarkAll: false });
      return;
    }
    if (e.target.htmlFor === 'Unmark All') {
      columns.forEach(column => {
        column.show = false;
      });
      this.setState({ columns: columns, unmarkAll: true, markAll: false });
      return;
    }
    columns.forEach(column => {
      if (column.value === e.target.htmlFor) {
        column.show = !column.show;
      }
    });
    this.setState({ columns: columns, markAll: false, unmarkAll: false });
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
        text="FILTER"
        floating
        labeled
        open={popupOpen}
        multiple
        className="icon"
        direction="left"
        upward={false}
        onClick={this.filterOn}
        style={{
          font: '16px Light Lato',
          color: '#9EA0A5',
          boxShadow: '0px 1px 2px #00000039',
          border: '1px solid #EBEBEB',
          borderRadius: '7px'
        }}
      >
        <Dropdown.Menu onClick={this.noAction}>
          <DropDownContent>
            <Grid columns="2">
              <Grid.Row style={{ fontSize: '10px', padding: '4px 0px 1px' }}>
                <Grid.Column />
                <Grid.Column textAlign="right">
                  <span onClick={this.close} style={{ cursor: 'pointer' }}>
                    <Icon circular inverted color="red" name="close" />
                  </span>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form>
                    <Form.Input label="From Date" type="date" />
                  </Form>
                </Grid.Column>
                <Grid.Column>
                  <Form>
                    <Form.Input label="To Date" type="date" />
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid columns="2">
              <Grid.Row>
                <Grid.Column>
                  <CheckboxList>
                    <li>
                      <Checkbox label={<label htmlFor="Mark All">Mark All</label>} checked={this.state.markAll} />
                    </li>
                    {columns.map(
                      (item, id) =>
                        id % 2 === 0 && (
                          <li key={id}>
                            <Checkbox label={<label htmlFor={item.value}>{item.value}</label>} checked={item.show} />
                          </li>
                        )
                    )}
                  </CheckboxList>
                </Grid.Column>
                <Grid.Column>
                  <CheckboxList>
                    <li>
                      <Checkbox label={<label htmlFor="Unmark All">Unmark All</label>} checked={this.state.unmarkAll} />
                    </li>
                    {columns.map(
                      (item, id) =>
                        id % 2 === 1 && (
                          <li key={id}>
                            <Checkbox label={<label htmlFor={item.value}>{item.value}</label>} checked={item.show} />
                          </li>
                        )
                    )}
                    <li>
                      <Button
                        style={{ backgroundColor: '#20CB96', color: '#ffffff' }}
                        onClick={() => {
                          this.setState({ popupOpen: false });
                          this.props.updateView(columns);
                        }}
                      >
                        Save View
                      </Button>
                    </li>
                  </CheckboxList>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </DropDownContent>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default FilterDropDownComponent;
