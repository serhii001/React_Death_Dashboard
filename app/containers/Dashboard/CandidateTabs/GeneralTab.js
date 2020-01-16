import React from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
// import { Image, Icon } from "semantic-ui-react";

import ContactBox from './ContactBox';
import LanguageBox from './LanguageBox';
import ActionDropdown from './ActionDropdown';

import { BoldLabel, MediumLabel, InputGroup } from './styles';
import { Input } from 'semantic-ui-react';
import SMSConversation from '../SMSConversation/SMSConversation';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const PersonalContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 10px;
  justify-content: center;
  flex: 1;
`;
const PersonalDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 4px 4px 7px #00000055;
  border: 1px solid #d8d8d8;
  border-radius: 25px;
  opacity: 1;
  padding: 10px;
  margin: 0 10px;
  align-items: center;
  flex: 3;
  height: 100%;
`;

const PersonalDetailColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ChatBox = styled.div`
  width: 30%;
  opacity: 1;
  right: 12px;
  bottom: 0;
  position: absolute;
`;

class GeneralTab extends React.Component {
  state = {
    openChatBox: false
  };

  showSMSChatBox = event => {
    this.setState({ openChatBox: true });
  };

  onClose = event => {
    this.setState({ openChatBox: false });
  };

  render() {
    const { candidate } = this.props;
    const { openChatBox } = this.state;

    return (
      <Container>
        <PersonalContactContainer>
          <ContactBox candidate={candidate} onShowSMSChat={this.showSMSChatBox} />
        </PersonalContactContainer>
        <PersonalDetailContainer>
          <PersonalDetailColumnContainer>
            <InputGroup>
              <BoldLabel>Preferred Language</BoldLabel>
              <LanguageBox candidate={candidate} />
            </InputGroup>
            <InputGroup>
              <MediumLabel>Client ID</MediumLabel>
              <Input className="medium" value={candidate.public_id || ''} />
            </InputGroup>
            <InputGroup>
              <MediumLabel>Assigned to</MediumLabel>
              <Input className="medium" />
            </InputGroup>
            <InputGroup>
              <MediumLabel>Contact Number</MediumLabel>
              <Input className="medium" value={candidate.phone || ''} />
            </InputGroup>
          </PersonalDetailColumnContainer>
          <PersonalDetailColumnContainer>
            <InputGroup>
              <MediumLabel>Latest Action</MediumLabel>
              <ActionDropdown />
            </InputGroup>
            <InputGroup>
              <MediumLabel>Fico</MediumLabel>
              <Input className="small" />
            </InputGroup>
            <InputGroup>
              <MediumLabel>Application Date</MediumLabel>
              <Input className="medium" value={format(parseISO(candidate.inserted_on), 'yyyy-MM-dd')} readOnly />
            </InputGroup>
            <InputGroup>
              <MediumLabel>Created Date</MediumLabel>
              <Input className="medium" value={format(parseISO(candidate.inserted_on), 'yyyy-MM-dd')} readOnly />
            </InputGroup>
          </PersonalDetailColumnContainer>
          <PersonalDetailColumnContainer>
            <InputGroup>
              <MediumLabel>Total Talk Time</MediumLabel>
              <Input className="call" value="09 min : 07 sec" />
            </InputGroup>
            <InputGroup>
              <MediumLabel>
                <span>13</span> Total Calls
              </MediumLabel>
            </InputGroup>
            <InputGroup>
              <MediumLabel>Last Call</MediumLabel>
              <Input className="longcall" value="02/12/2019 - 12:29 PM" />
            </InputGroup>
            <InputGroup>
              <MediumLabel>Campaign Name</MediumLabel>
              <Input className="medium" />
            </InputGroup>
          </PersonalDetailColumnContainer>
        </PersonalDetailContainer>
        {openChatBox ? (
          <ChatBox>
            <SMSConversation candidate={candidate} onClose={this.onClose} />
          </ChatBox>
        ) : null}
      </Container>
    );
  }
}

export default GeneralTab;
