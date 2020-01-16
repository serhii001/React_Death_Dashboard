import React from "react";
import { map } from 'lodash';
import { Form, Select } from "semantic-ui-react";
import {
  Container,
  NameBox,
  IconClose,
  IconBell,
  Wrapper,
  DatePickerWrap,
  Label,
  CheckboxWrap,
  SelectWrap,
  LinkWrap,
  RadioWrap,
  LabelBlack,
  RightBox,
  ActionBox, CancelCallButton, YesCallButton
} from "./styles";

class Schedule extends React.Component {
  state = {
    date: new Date(),
    time: new Date(),
  };

  onChangeDate = field => value => {
    this.setState({ [field]: value })
  };

  render() {
    const { date, time } = this.state;
    const { onClose } = this.props;
    const sampleOptions = [
      { key: 'aa', value: 'aa', text: 'Option 1' },
      { key: 'bb', value: 'bb', text: 'Option 2' },
    ];
    const sampleZone = [
      { key: 'aa', value: 'aa', text: 'CST' },
      { key: 'bb', value: 'bb', text: 'EST' },
    ];
    const phoneOptions = [
      { key: 'aa', value: 'aa', text: '619.956.8453' },
      { key: 'bb', value: 'bb', text: '719.956.7453' },
    ];
    const emailOptions = [
      { key: 'aa', value: 'aa', text: 'Maria@gmail.com' },
      { key: 'bb', value: 'bb', text: 'john@gmail.com' },
    ];
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
          <span>Schedule an Appointment</span>
          <IconClose size="large" name="times circle" onClick={onClose} />
        </NameBox>
        <Form>
          <Wrapper>
            <Form.Group>
              <Form.Field width="9">
                <Label>CALL SUBJECT</Label>
                <Select fluid options={sampleOptions} />
              </Form.Field>
              <Form.Field width="7">
                <Label>OPENER ASSIGNED</Label>
                <Select fluid options={sampleOptions} />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Label>WHEN</Label>
                <DatePickerWrap
                  selected={date}
                  onChange={this.onChangeDate('date')}
                />
              </Form.Field>
              <Form.Field>
                <Label>&nbsp;</Label>
                <DatePickerWrap
                  selected={time}
                  onChange={this.onChangeDate('time')}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                />
              </Form.Field>
              <Form.Field>
                <Label>&nbsp;</Label>
                <SelectWrap fluid options={sampleZone} />
              </Form.Field>
              <Form.Field>
                <Label>&nbsp;</Label>
                <CheckboxWrap label="flexible on time" />
              </Form.Field>
            </Form.Group>
            <Form.Group>
                <RadioWrap checked/>
              <IconBell name="bell" size="big" />
              <LinkWrap>Send 15 minute alert before appointment</LinkWrap>
            </Form.Group>
          </Wrapper>
          <Wrapper>
            <Form.Group>
              <LabelBlack>Send invite:</LabelBlack>
              <RadioWrap name="type" label="Email"/>
              <RadioWrap name="type" label="SMS"/>
              <RadioWrap name="type" label="BOTH" checked />
            </Form.Group>
            <Form.Group>
              <Form.Field width="8">
                <Select fluid options={phoneOptions} />
              </Form.Field>
              <Form.Field width="8">
                <Select fluid options={emailOptions} />
              </Form.Field>
            </Form.Group>
          </Wrapper>
          <Wrapper>
            <Form.Group>
              <Form.Field width="16">
                <Label>LOCATION</Label>
                <input placeholder='Phone Number to Call' />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width="16">
                <Label>NOTES</Label>
                <RightBox>
                  <Select options={templateOptions} />
                </RightBox>
                <textarea placeholder='Notes...' />
              </Form.Field>
            </Form.Group>
          </Wrapper>
          <ActionBox>
            <CancelCallButton onClick={onClose}>Cancel</CancelCallButton>
            <YesCallButton onClick={onClose}>Save</YesCallButton>
          </ActionBox>
        </Form>
      </Container>
    );
  }
}

export default Schedule;
