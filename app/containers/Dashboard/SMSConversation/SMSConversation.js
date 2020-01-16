import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

import {
  Container,
  ContainerCOllapsed,
  NameBox,
  DateLabel,
  ActionIcons,
  Messages,
  MessageLeftWrap,
  MessageLeft,
  MessageRightWrap,
  MessageRight,
  MessageDate,
  Footer,
  InputBox,
  IconClose,
  IconExpand,
  InputBoxWrap,
  IconCollapse,
  IconSend,
  NameBoxCollapsed
} from "./styles";
import TemplatesDropdown from "../CandidateTabs/TemplatesDropdown";

class SMSConversation extends React.Component {
  state = {
    isCollapsed: false
  };

  onCollapse = () => {
    const { isCollapsed } = this.state;

    this.setState({ isCollapsed: !isCollapsed })
  };

  onSend = () => {
    // TODO send message
  };

  render() {
    const { isCollapsed } = this.state;
    const { candidate, onClose } = this.props;

    return isCollapsed ? (
      <ContainerCOllapsed>
        <NameBoxCollapsed>
          { candidate.first_name } { candidate.last_name } - SMS Conversation
          <ActionIcons><IconExpand name="expand" onClick={this.onCollapse} /></ActionIcons>
        </NameBoxCollapsed>
      </ContainerCOllapsed>
    ) : (
      <Container>
        <NameBox>
          { candidate.first_name } { candidate.last_name } - SMS Conversation
          <ActionIcons><IconCollapse name="minus circle" onClick={this.onCollapse} /><IconClose name="times circle" onClick={onClose} /></ActionIcons>
        </NameBox>
        <Messages>
          <DateLabel>FEB 23 3:46PM - CST</DateLabel>
          <MessageLeftWrap>
            <MessageLeft>Hi Maria, are you available right now?</MessageLeft>
          </MessageLeftWrap>
          <MessageLeftWrap>
            <MessageLeft>Smart Credit Pulled</MessageLeft>
            <MessageDate>10:24</MessageDate>
          </MessageLeftWrap>
          <MessageRightWrap>
            <span>Maria Smith - </span><MessageRight>Yes, I am! What's up?</MessageRight>
          </MessageRightWrap>
        </Messages>
        <Footer>
          <TemplatesDropdown />
          <InputBoxWrap>
            <InputBox transparent placeholder="Type your message here…"></InputBox>
            <IconSend name="send" size="large" onClick={this.onSend}></IconSend>
          </InputBoxWrap>
        </Footer>
      </Container>
    );
  }
}

export default SMSConversation;
