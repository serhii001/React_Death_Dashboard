import React, { Component } from 'react';
import { Form, Radio, Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import { applicationApis } from '../../../utils/api/candidate/application';
import { async } from 'q';

const Container = styled.div`
  & {
    display: flex;
    flex-direction: column;
  }
  & > .field {
    margin-bottom: 0px !important;
    display: flex;
    flex-direction: row;
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
  & .row {
    padding: 3px !important;
    text-align: center;
  }
`;
export default class PhoneInputSelectBox extends Component {
  state = {
    preferred: 1,
    cell: {
      phone_type_id: 1,
      phone_number: ''
    },
    work: {
      phone_type_id: 2,
      phone_number: ''
    },
    home: {
      phone_type_id: 3,
      phone_number: ''
    }
  };
  async componentDidMount() {
    const res = await applicationApis.GetPhoneNumbers(this.props.candidate.public_id);
    if (res.data) {
      this.getFilterData(res.data);
    }
  }
  getFilterData = data => {
    if (data) {
      console.log(data);
      let stateData = {};
      data.forEach((item, id) => {
        if (item.preferred) {
          this.setState({ preferred: id + 1 });
        }
        item.phone_type_id === 1
          ? (stateData.cell = { ...item })
          : item.phone_type_id === 2
          ? (stateData.work = { ...item })
          : (stateData.home = { ...item });
      });
      this.setState({ ...this.state, ...stateData });
    }
  };
  setFieldsValue = async (parent, type, value) => {
    console.log('post');
    await this.setState(prevState => {
      let data = parent === 'cell' ? prevState.cell : parent === 'work' ? prevState.work : prevState.home;
      data[type] = value;
      if (parent === 'cell') {
        return {
          cell: data
        };
      } else if (parent === 'work') {
        return {
          work: data
        };
      }
      return {
        home: data
      };
    });
    await applicationApis.PostPhoneNumbers(this.props.candidate.public_id, [
      {
        ...this.state.cell,
        preferred: this.state.preferred === 1 ? true : false
      },
      {
        ...this.state.work,
        preferred: this.state.preferred === 2 ? true : false
      },
      {
        ...this.state.home,
        preferred: this.state.preferred === 3 ? true : false
      }
    ]);
  };

  handleChange = async (e, { value }) => {
    await this.setState({ preferred: value });
    await applicationApis.PostPhoneNumbers(this.props.candidate.public_id, [
      {
        ...this.state.cell,
        preferred: this.state.preferred === 1 ? true : false
      },
      {
        ...this.state.work,
        preferred: this.state.preferred === 2 ? true : false
      },
      {
        ...this.state.home,
        preferred: this.state.preferred === 3 ? true : false
      }
    ]);
  };

  render() {
    const { candidate } = this.props;
    const { preferred, cell, work, home } = this.state;
    return (
      <Form>
        <Container>
          <Grid>
            <Grid.Row columns="2">
              <Grid.Column width={3}>
                <Form.Field>
                  <label>Preferred</label>
                  <Radio
                    name="preferredPhoneGroup"
                    value={1}
                    className="phone"
                    checked={preferred === 1}
                    onChange={this.handleChange}
                    width={4}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  label="Cell Phone"
                  width={14}
                  className="verifybutton"
                  value={cell.phone_number || ''}
                  onChange={e => {
                    this.setFieldsValue('cell', 'phone_number', e.target.value);
                  }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="2">
              <Grid.Column width={3}>
                <Form.Field>
                  <label>&nbsp;</label>
                  <Radio
                    name="preferredPhoneGroup"
                    value={2}
                    className="phone"
                    checked={preferred === 2}
                    onChange={this.handleChange}
                    width={4}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  label="Work Phone"
                  width={14}
                  className="verifybutton"
                  value={work.phone_number || ''}
                  onChange={e => {
                    this.setFieldsValue('work', 'phone_number', e.target.value);
                  }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="2">
              <Grid.Column width={3}>
                <Form.Field>
                  <label>&nbsp;</label>
                  <Radio
                    name="preferredPhoneGroup"
                    value={3}
                    className="phone"
                    checked={preferred === 3}
                    onChange={this.handleChange}
                    width={4}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  label="Home"
                  width={14}
                  className="verifybutton"
                  value={home.phone_number || ''}
                  onChange={e => {
                    this.setFieldsValue('home', 'phone_number', e.target.value);
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Form>
    );
  }
}
