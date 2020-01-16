import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

import StatusDropdown from "./StatusDropdown";
import {
  NameLabel,
  AddressLabel,
  PullSmartCreditButton,
  CancelCallButton,
  YesCallButton,
  CallActions,
  LabelCall,
} from "./styles";
import PhoneDropdown from "./PhoneDropdown";
import Recordings from "../../../components/Recordings/Recordings";
import Schedule from "../../../components/Schedule/Schedule";
import SendEmailForm from "../../../components/SendEmailForm/SendEmailForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 4px 4px 7px #00000055;
  border: 1px solid #d8d8d8;
  border-radius: 25px;
  opacity: 1;
  padding: 10px;
  align-items: center;
`;

const ToolContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 25px 0px;
  & i {
    background-color: #ff7f00;
    color: white;
    font-size: 20px;
    border-radius: 500em !important;
    line-height: 1 !important;
    padding: 0.5em 0 !important;
    width: 2em !important;
    height: 2em !important;
    cursor: pointer;
  }
`;
const CallBox = styled.div`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 1px 1px 6px #00ABFF;
  border: 1px solid #707070;
  border-radius: 11px;
  opacity: 1;
  padding: 15px 10px;
  width: auto;
  left: ${props => props.left + 13}px;
  top: ${props => props.top + 13}px;
  position: absolute;
  z-index: 100;
`;
const RecordingsBox = styled.div`
  background: #EBEBEB 0% 0% no-repeat padding-box;
  box-shadow: 1px 1px 6px #00ABFF;
  border: 1px solid #707070;
  border-radius: 11px;
  opacity: 1;
  padding: 15px 10px;
  width: auto;
  left: ${props => props.left + 13}px;
  bottom: ${props => props.top - 38}px;
  position: absolute;
  z-index: 100;
`;
const ScheduleBox = styled.div`
  opacity: 1;
  width: auto;
  left: ${props => props.originEl.left + 230}px;
  bottom: ${props => props.originEl.top - 400}px;
  position: absolute;
  z-index: 100;
`;
const SendEmailBox = styled.div`
  opacity: 1;
  width: auto;
  left: ${props => props.originEl.left + 13}px;
  bottom: ${props => props.originEl.top - 38}px;
  position: absolute;
  z-index: 100;
`;

const records = [
  {number: '619.956.8453', date: '02 / 12 / 2019', type: 'Voicemail', duration: '03 : 25'},
  {number: '789.556.8453', date: '02 / 12 / 2019', type: 'Voicemail', duration: '03 : 25'},
  {number: '467.356.8453', date: '02 / 12 / 2019', type: 'Voicemail', duration: '03 : 25'},
  {number: '619.956.8453', date: '02 / 12 / 2019', type: 'Voicemail', duration: '03 : 25'},
  {number: '789.556.8453', date: '02 / 12 / 2019', type: 'Voicemail', duration: '03 : 25'},
];

class ContactBox extends React.Component {
  state = {
    openMailBox: false,
    openScheduleBox: false,
    openRecordingsBox: false,
    openCallBox: false,
    callBoxLeft: 0,
    callBoxTop: 0,
    recordingBoxLeft: 0,
    recordingBoxTop: 0,
    scheduleEl: {},
    mailEl: {},
    phone: null
  };

  showScheduleBox = event => {
    const elm = event.target;
    this.setState({ openScheduleBox: true, scheduleEl: { left: elm.offsetLeft, top: elm.offsetTop } });
  };

  showMailBox = event => {
    const elm = event.target;
    this.setState({ openMailBox: true, mailEl: { left: elm.offsetLeft, top: elm.offsetTop } });
  };

  showCallBox = event => {
    const elm = event.target;
    this.setState({ openCallBox: true, callBoxLeft: elm && elm.offsetLeft, callBoxTop: elm && elm.offsetTop });
  };

  showRecordingBox =  event => {
    const elm = event.target;
    this.setState({ openRecordingsBox: true, recordingBoxLeft: elm && elm.offsetLeft, recordingBoxBottom: elm && elm.offsetTop });
  };

  closeCallBox = () => this.setState({ openCallBox: false });

  closeRecordingBox = () => this.setState({ openRecordingsBox: false });

  closeScheduleBox = () => this.setState({ openScheduleBox: false });

  closeMailBox = () => this.setState({ openMailBox: false });

  handleCall = () => {
    const { phone } = this.state;
    this.setState({ openCallBox: false });
    if (phone) {
      // TODO Call
    }
  };

  onChangePhone = value => {
    // TODO Call
    this.setState({ phone: value });
  };

  sendEmail = () => {
    // TODO send email
    this.closeMailBox();
  };

  confirmDeleteRecord = (index) => {
    // TODO delete record by deleteIndex
  };

  render() {
    const { candidate, onShowSMSChat } = this.props;
    const {
      openCallBox,
      callBoxLeft,
      callBoxTop,
      recordingBoxLeft,
      recordingBoxBottom,
      openRecordingsBox,
      scheduleEl,
      openScheduleBox,
      openMailBox,
      mailEl
    } = this.state;

    return (
      <Container>
        <NameLabel>
          {candidate.first_name} {candidate.last_name}
        </NameLabel>
        <AddressLabel>
          {candidate.city}, {candidate.state}
        </AddressLabel>
        <StatusDropdown />
        <ToolContainer>
          <Icon name="calendar alternate outline" onClick={this.showScheduleBox} />
          <Icon rotated="clockwise" name="call" onClick={this.showCallBox}></Icon>
          <Icon name="comment alternate outline" onClick={onShowSMSChat} />
          <Icon name="volume up" onClick={this.showRecordingBox} />
          <Icon name="mail" onClick={this.showMailBox} />
        </ToolContainer>
        <PullSmartCreditButton>
          Pull Smart Credit
        </PullSmartCreditButton>
        {openCallBox ? (
          <CallBox left={callBoxLeft} top={callBoxTop}>
            <PhoneDropdown onChange={this.onChangePhone} />
            <CallActions>
              <LabelCall>Call?</LabelCall>
              <CancelCallButton onClick={this.closeCallBox}>Cancel</CancelCallButton>
              <YesCallButton onClick={this.handleCall}>Yes</YesCallButton>
            </CallActions>
          </CallBox>
        ) : null}
        {openRecordingsBox ? (
          <RecordingsBox left={recordingBoxLeft} top={recordingBoxBottom} >
            <Recordings candidate={candidate} onClose={this.closeRecordingBox} onDelete={this.confirmDeleteRecord} data={records} />
          </RecordingsBox>
        ) : null}
        {openScheduleBox ? (
          <ScheduleBox originEl={scheduleEl} >
            <Schedule onClose={this.closeScheduleBox} />
          </ScheduleBox>
        ) : null}
        {openMailBox ? (
          <SendEmailBox originEl={mailEl} >
            <SendEmailForm onClose={this.closeMailBox} onSubmit={this.sendEmail} />
          </SendEmailBox>
        ) : null}
      </Container>
    );
  }
}

export default ContactBox;
