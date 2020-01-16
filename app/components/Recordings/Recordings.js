import React from "react";
import { map } from 'lodash';
import { Table } from "semantic-ui-react";

import {
  Container,
  RecordTable,
  RecordRow,
  RecordCell,
  NameBox,
  ActionIcons,
  CallBox,
  IconClose,
  CallBoxActions,
  CallBackLink,
  DeleteLink,
  IconPlay
} from "./styles";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import CallPopup from "../CallPopup/CallPopup";

class Recordings extends React.Component {
  state = {
    openDeleteRecordConfirm: false,
    openCallConfirm: false,
    deleteEl: null,
    deleteIndex: null,
    callIndex: null,
    callEl: null
  };

  onSelect = index => () => {
    this.setState({ selected: index + 1 })
  };

  onCallBack = callIndex => event => {
    const elm = event.target || {};
    this.setState({
      callIndex,
      openCallConfirm: true,
      callEl: { left: elm.offsetLeft, top: elm.offsetTop, width: elm.offsetWidth, height: elm.offsetHeight } })
  };

  onPlay = () => {
    // TODO play
  };

  deleteRecord = deleteIndex => event => {
    const elm = event.target || {};
    this.setState({
      deleteIndex,
      openDeleteRecordConfirm: true,
      deleteEl: { left: elm.offsetLeft, top: elm.offsetTop, width: elm.offsetWidth, height: elm.offsetHeight } })
  };

  closeRecordingDeleteBox = () => this.setState({ openDeleteRecordConfirm: false, deleteEl: null });

  closeCallBox = () => this.setState({ openCallConfirm: false, callEl: null });

  confirmDeleteRecord = () => {
    // TODO delete record by deleteIndex
    this.closeRecordingDeleteBox();
  };

  confirmCall = () => {
    // TODO delete record by deleteIndex
    this.closeCallBox();
  };

  render() {
    const { selected, openDeleteRecordConfirm, openCallConfirm, deleteEl, callEl } = this.state;
    const { data, onClose } = this.props;

    return (
      <>
        <NameBox>
          Recordings
          <ActionIcons><IconClose size="large" name="times circle" onClick={onClose} /></ActionIcons>
        </NameBox>
        <Container>
          <RecordTable selectable>
            <Table.Body>
              {map(data, (item, index) => (
                <RecordRow onClick={this.onSelect(index)} active={selected === (index + 1)} >
                  <RecordCell></RecordCell>
                  <RecordCell>{item.number}</RecordCell>
                  <RecordCell>{item.date}</RecordCell>
                  <RecordCell>{item.type}</RecordCell>
                  <RecordCell>{item.duration}</RecordCell>
                </RecordRow>
              ))}
            </Table.Body>
          </RecordTable>
          {selected > 0 ? (
            <CallBox>
              <CallBoxActions>
                <CallBackLink onClick={this.onCallBack(selected - 1)}>Call Back</CallBackLink>
                <IconPlay size="big" name="play circle" onClick={this.onPlay} />
                <DeleteLink onClick={this.deleteRecord(selected - 1)}>Delete</DeleteLink>
              </CallBoxActions>
            </CallBox>
          ) : null}
          <ConfirmPopup
            show={openDeleteRecordConfirm}
            originEl={deleteEl}
            onClose={this.closeRecordingDeleteBox}
            onSubmit={this.confirmDeleteRecord}
          />
          <CallPopup
            show={openCallConfirm}
            originEl={callEl}
            onClose={this.closeCallBox}
            onSubmit={this.confirmCall}
          />
        </Container>
      </>
    );
  }
}

export default Recordings;
