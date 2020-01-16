import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Label, Icon } from 'semantic-ui-react';

import { ModalCancelButton, ModalVerifyButton } from './styles';

const NotificationsModalContent = styled.div`
  display: flex;
  flex-direction: column;
  & .description {
    text-align: left;
    font: 17px Regular Lato, sans-serif;
    letter-spacing: 2.4px;
    color: #707070;
    margin: 30px 20px;
  }
`;
const NotificationsModalAction = styled.div`
  display: flex;
  flex-direction: row;
  margin: 30px;
`;
const LabelWrap = styled(Label)`
  font-size: 20px !important;
  font-weight: 400 !important;
  background: #ff4848 !important;
  color: #fff !important;
  border-radius: 25px !important;
  width: 100% !important;
  & i {
    font-size: 34px !important;
    display: inline-block !important;
  }
`;
const Item = styled.div`
  font-size: 20px !important;
  font-weight: 400 !important;
  color: #959494 !important;
  width: 100% !important;
  border-top: 1px solid #959494;
  border-bottom: 1px solid #959494;
  padding: 20px 10px 20px 20px;
  margin-top: 5px;
  & span {
    color: #ff0000;
  }
  & i {
    float: right;
    color: #00a7fa !important;
  }
`;

class NotificationsModal extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { children } = this.props;
    return (
      <Modal
        style={{ borderRadius: '25px', width: '400px' }}
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={children || <span className="linkButton">YES</span>}
      >
        <NotificationsModalContent>
          <LabelWrap>
            <Icon name="bell" /> 2 Unread Notifications!
          </LabelWrap>
          <Item>
            <span>Missed call</span> | 619.783.4567 <Icon name="chevron right" />
          </Item>
          <Item>
            <span>Voicemail</span> | 619.783.4567 <Icon name="chevron right" />
          </Item>
          <NotificationsModalAction>
            <ModalCancelButton onClick={this.close}>Ignore</ModalCancelButton>
            <ModalVerifyButton
              onClick={() => {
                this.close();
                // this.props.onSubmit();
              }}
            >
              View All
            </ModalVerifyButton>
          </NotificationsModalAction>
        </NotificationsModalContent>
      </Modal>
    );
  }
}

export default NotificationsModal;
