import React from "react";
import { map } from 'lodash';
import { Checkbox, FieldLabel, Form, RadioGroup, Radio, FormControlLabel, FormControl, FormLabel, Select, MenuItem } from "semantic-ui-react";
import {
  Container, NameBox, LeftBox, ActionBox, CancelCallButton, YesCallButton
} from "./styles";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import CallPopup from "../CallPopup/CallPopup";

class SendEmailForm extends React.Component {
  state = {
  };

  render() {
    const { onClose } = this.props;
    const templateOptions = [
      {
        key: "template1",
        text: "Template 1",
        value: 1
      }
    ];

    return (
      <Container>
        <NameBox>
          Send email
        </NameBox>
        <Form>
          <Form.Group>
            <Form.Field width="16">
              <input placeholder='To' />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width="16">
              <input placeholder='CC' />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width="16">
              <input placeholder='Subject' />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width="16">
              <LeftBox>
                <Select options={templateOptions} />
              </LeftBox>
              <textarea placeholder='Write Something' />
            </Form.Field>
          </Form.Group>
          <ActionBox>
            <CancelCallButton onClick={onClose}>Cancel</CancelCallButton>
            <YesCallButton onClick={onClose}>Send</YesCallButton>
          </ActionBox>
        </Form>
      </Container>
    );
  }
}

export default SendEmailForm;
