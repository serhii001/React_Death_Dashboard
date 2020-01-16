import React from 'react';
import styled from "styled-components";
import { findIndex, forEach, map, size } from 'lodash';
import { Accordion, Input, Icon, Dropdown } from 'semantic-ui-react';
import ChatFilters from "./ChatFilters";
import { chatFilters as initialFilters } from 'constants/defaults';

const MessageDay = styled.div`
  margin-bottom: 30px;
`;
const MessageHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #00A7FA;
  text-align: left;
  font: 18px Lato;
  line-height: 35px;
  letter-spacing: 0;
  opacity: 1;
  margin-bottom: 10px;
  color: #9EA0A5;
`;
const MessageTitle = styled.div`
  text-align: left;
  font: 18px Lato;
  line-height: 35px;
  letter-spacing: 0;
  color: #00A7FA;
`;
const MessageTitleOwn = styled.div`
  text-align: left;
  font: 18px Lato;
  line-height: 35px;
  letter-spacing: 0;
  color: #FF7F00;
`;
const Message = styled.div`
  text-align: left;
  font: 18px Lato;
  line-height: 35px;
  letter-spacing: 0;
  color: #9EA0A5;
  margin-bottom: 10px;
`;
const Date = styled.div`
  color: #3E3F42;
  width: 12%;
`;
const Time = styled.div`
  color: #3E3F42;
  width: 12%;
`;
const Type = styled.div`
  & span {
    color: #00A7FA;
  }
  width: 15%;
`;
const By = styled.div`
  & span {
    color: #00A7FA;
  }
`;
const Content = styled.div`
  padding: 20px;
  height: 400px;
  overflow-y: auto;
  position: relative;
`;
const Footer = styled.div`
  border-top: 1px solid #ddd;
  padding: 10px 5px;
`;
const InputField = styled(Input)`
  & input {
    border: none !important;
    font-size: 18px;
  }
`;
const Filters = styled(Dropdown)`
  position: absolute !important;
  right: 100px;
  top: 100px;
  font: 15px Medium Lato;
  color: #959494;
  boxShadow: rgba(0, 0, 0, 0.224) 0px 3px 6px;
  border: 1px solid rgb(149, 148, 148);
  width: 170px;
  padding: 10px 10px;
`;

class AllNotes extends React.Component {
  state = {
    active: false,
    openFilters: false,
    filters: initialFilters,
    all: false
  };

  handleClick = e => {
    const { active } = this.state;
    console.log(e);
    this.setState({ active: !active });
  };

  onClickMenu = (event, data) => {
    event.preventDefault();
    event.stopPropagation();
  };

  checkAll = (filters = { ...this.state.filters }) => {
    let unchecked = 0;
    let count = size(filters.leftColumn) + size(filters.rightColumn);
    forEach(filters.leftColumn, item => {
      if (!item.value) {
        unchecked++;
      }
    });
    forEach(filters.rightColumn, item => {
      if (!item.value) {
        unchecked++;
      }
    });
    const all = unchecked === 0  ? 1 : (unchecked === count ? -1 : 0);
    return all;
  };

  onChangeAll = () => {
    const filters = { ...this.state.filters };
    const all = this.checkAll();
    console.log('all', all);
    filters.leftColumn = map(filters.leftColumn, item => {
      return {...item, value: all <= 0 };
    });
    filters.rightColumn = map(filters.rightColumn, item => {
      return {...item, value: all <= 0 };
    });
    this.setState({ filters, all: this.checkAll(filters) })
  };

  onChange = (column, item) => event => {
    const filters = { ...this.state.filters };
    const index = findIndex(filters[column], f => f.key === item.key);

    if (index > -1) {
      filters[column][index]['value'] = !item.value
      const all = this.checkAll(filters);
      this.setState({ filters, all })
    }
  };

  onClick = (event, data) => {
    // console.log('onClick', event, data);
    this.setState({ openFilters: !this.state.openFilters })
  };

  render() {
    const { active, filters, openFilters, all } = this.state;
    const { data } = this.props;
    const titleStyle = {
      fontSize: '20px',
      fontWeight: 'regular',
      color: '#00a7fa',
      marginRight: 50
    };
    return (
      <Accordion fluid styled>
        <Accordion.Title style={{borderBottom: active === true ? '1px solid #ddd' : 'none', padding: '16px 22px'}} active={active === true} index={0} onClick={this.handleClick}>
          <span style={titleStyle}>All notes</span>
          <span>
            <Icon
              name={active === true ? 'angle down' : 'angle right'}
              style={{
                fontSize: '18px',
                color: '#00A7FA'
              }}
            />
          </span>
        </Accordion.Title>
        <Accordion.Content active={active === true}>
          <Content>
            <MessageDay>
              <MessageHeader><Date>Feb 21, 2019</Date> <Time>05:52 AM</Time> <Type><span>Type:</span> Action</Type> <By><span>By:</span> Sarah Flores</By></MessageHeader>
              <Message>Submitted to Underwriter</Message>
            </MessageDay>
            <MessageDay>
              <MessageHeader><Date>Feb 18, 2019</Date> <Time>05:52 AM</Time> <Type><span>Type:</span> SMS</Type> <By><span>By:</span> Sarah Flores</By></MessageHeader>
              <MessageTitle>Sarah Flores - 800.657.9876</MessageTitle>
              <Message>Hi Maria, sorry for the text message. I forgot to ask you what time is best to call tomorrow?</Message>
              <MessageTitleOwn>Maria Flores - 619.956.8453</MessageTitleOwn>
              <Message>No problem! Does 1pm EST work?</Message>
              <MessageTitle>Sarah Flores - 800.657.9876</MessageTitle>
              <Message>That works fine. Thank you! I will be sending you an email calendar invite for the call.</Message>
            </MessageDay>
            <MessageDay>
              <MessageHeader><Date>Feb 15, 2019</Date> <Time>05:52 AM</Time> <Type><span>Type:</span> Notes</Type> <By><span>By:</span> Sarah Flores</By></MessageHeader>
              <Message>Caller was very excited about the opportunity.</Message>
            </MessageDay>
            <Filters
              open={openFilters}
              onClick={this.onClick}
              text="Filters"
            >
              <Dropdown.Menu onClick={this.onClickMenu} content={
                <ChatFilters
                  all={all}
                  onChangeAll={this.onChangeAll}
                  filters={filters}
                  onChange={this.onChange}
                />
              }>
              </Dropdown.Menu>
            </Filters>
          </Content>
          <Footer>
            <InputField placeholder="Type a message…and hit enter…." />
          </Footer>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default AllNotes;
