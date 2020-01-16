import React, { Component } from 'react';
import { Button, Modal, Grid, Table, Label } from 'semantic-ui-react';
import styled from 'styled-components';

import NewCollectorForm from './NewCollectorForm';
import AddDebtModalRow from './AddDebtModalRow';

const Container = styled.div`
  width: 1300px !important;
`;

const ModalActions = styled.div`
  margin-bottom: 20px;
  padding: 0 35px;
  & .link-button-bottom {
    margin: auto !important;
    & span {
      text-decoration: underline;
      letter-spacing: 0;
      color: #5fa1fc;
      opacity: 1;
      cursor: pointer;
    }
    & i {
      text-decoration: unset;
      margin-left: 10px;
      font-size: 18px;
      vertical-align: text-top;
    }
  }
  & .ui.button.white-button {
    background-color: white;
    color: #5fa1fc;
    box-shadow: 0px 10px 20px #00000033;
    border: 1px solid #ebebeb;
    border-radius: 5px;
  }
  & .ui.button.blue-button {
    margin-left: 5px;
    background-color: #5fa1fc;
    color: white;
    box-shadow: 0px 10px 20px #00000033;
    border-radius: 5px;
  }
  & .ui.label {
    background: none;
    font: 16px Medium Lato;
    margin-right: 100px;
    & span {
      color: #5fa1fc;
    }
  }
`;

const ModalContent = styled.div`
  padding: 50px 20px 20px;
  background-color: #f8f7f7;
  & .ui.input.input-box-w-100 {
    width: 165px !important;
  }
  & th {
    border: none !important;
    font: 14px Medium Lato;
    color: #9ea0a5 !important;
  }
  & td {
    border: none !important;
    font: 16px Medium Lato;
    color: #000000 !important;
    padding: 6px !important;
    & input {
      padding: 6px !important;
    }
  }
  & .phone {
    margin: 0px !important;
  }
  & .phone label {
    font: 16px Medium Lato !important;
    letter-spacing: 0 !important;
    color: #959494 !important;
    padding: 7px 25px !important;
    &:before {
      width: 24px !important;
      height: 24px !important;
      top: 5px !important;
      border: 2px solid #00a7fa !important;
    }
    &:after {
      top: -1px !important;
      left: -6px !important;
      width: 36px !important;
      height: 36px !important;
      background-color: #00a7fa !important;
    }
  }
`;

class AddDebtModal extends Component {
  state = {
    addCollectorContentChildren: [<NewCollectorForm key="form-one-0" />],
    rows: new Array(10).fill().map((item, index) => ({ index }))
  };

  handleRowChange = (data, rowIndex) => {
    const { rows } = this.state;
    const editRow = rows[rowIndex];
    const resRow = { ...editRow, [data.name]: data.value };
    const resRows = rows.map((v, i) => (i === rowIndex ? resRow : v));
    this.setState({ rows: resRows }, () => {
      console.log(this.state.rows);
    });
  };

  render() {
    const { rows } = this.state;
    const { open, dimmer } = this.props;
    return (
      <Container>
        <Modal
          dimmer={dimmer}
          open={open}
          onClose={this.props.close}
          style={{ width: '1600px', backgroundColor: '#F8F7F7' }}
        >
          <ModalContent>
            <Table basic="very" celled collapsing>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ width: '50px' }}>No.</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '190px' }}>Debt Name</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '190px' }}>Creditor</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '190px' }}>Type</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '190px' }}>ECOA</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '190px' }}>Account Number</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '190px' }}>Balance Original</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '190px' }}>Push</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '190px' }}>Days of Delinquent</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {rows.map((row, index) => (
                  <AddDebtModalRow key={index} row={row} onChangeElement={this.handleRowChange} />
                ))}
              </Table.Body>
            </Table>
          </ModalContent>
          <ModalActions>
            <Grid>
              <Grid.Row>
                <Grid.Column width={10} className="link-button-bottom" />
                <Grid.Column width={3}>
                  <Label>
                    Sub Pushed Total
                    <span> $0.00</span>
                  </Label>
                </Grid.Column>
                <Grid.Column width={3} style={{ textAlign: 'right' }}>
                  <Button className="white-button" onClick={this.props.close}>
                    CANCEL
                  </Button>
                  <Button className="blue-button" onClick={this.props.close}>
                    ADD
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </ModalActions>
        </Modal>
      </Container>
    );
  }
}

export default AddDebtModal;
