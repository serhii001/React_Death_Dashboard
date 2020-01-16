import React from 'react';
import { Form, Button } from 'semantic-ui-react';

import LanguageBox from '../LanguageBox';
import PhoneInputSelectBox from '../PhoneInputSelectBox';
import AccordionForm from '../../../../components/AccordionForm';
import { InputGroup, BoldLabelTitle, InlineItem, SelectWrap, FormRight, AutoFill } from '../styles';
import {
  YourselfApplicationContactContainer,
  YourselfApplicationContainer,
  YourselfApplicationContactColumnContainer,
  YourselfApplicationNameColumnContainer,
  YourselfApplicationContact2ColumnContainer
} from './style';
import { applicationApis } from '../../../../utils/api/candidate/application';
class UserProfileForm extends React.Component {
  state = {
    current: {
      address1: '',
      address2: '',
      zip_code: '',
      city: '',
      state: '',
      from_date: '',
      to_date: '',
      type: 'CURRENT'
    },
    previous: {
      address1: '',
      address2: '',
      zip_code: '',
      city: '',
      state: '',
      from_date: '',
      to_date: '',
      type: 'PAST'
    }
  };
  async componentDidMount() {
    const res = await applicationApis.GetAddress(this.props.candidate.public_id);
    if (res.data) {
      this.getFilterData(res.data);
    }
  }
  getFilterData = data => {
    if (data) {
      console.log(data);
      let stateData = {};
      data.forEach(item => {
        if (item.type === 'CURRENT') {
          stateData.current = { ...item };
        } else {
          stateData.previous = { ...item };
        }
      });
      this.setState({ ...this.state, ...stateData });
    }
  };
  setFieldsValue = async (parent, type, value) => {
    await this.setState(prevState => {
      let data = parent === 'current' ? prevState.current : prevState.previous;
      data[type] = value;
      if (parent === 'current') {
        return {
          current: data
        };
      }
      return {
        previous: data
      };
    });
    await applicationApis.PostAddress(this.props.candidate.public_id, [
      {
        ...this.state.current,
        from_date: this.state.current.from_date,
        to_date: this.state.current.to_date
      },
      {
        ...this.state.previous,
        from_date: this.state.previous.from_date,
        to_date: this.state.previous.to_date
      }
    ]);
  };
  render() {
    const { candidate } = this.props;
    const { current, previous } = this.state;
    const sampleOptions = [{ key: 'aa', value: 'aa', text: 'Before' }, { key: 'bb', value: 'bb', text: 'After' }];
    const timezoneOptions = [{ key: 'aa', value: 'aa', text: 'EST' }, { key: 'bb', value: 'bb', text: 'EST' }];
    return (
      <AccordionForm title="Tell Us About Yourself">
        <YourselfApplicationContainer>
          <YourselfApplicationContactContainer>
            <YourselfApplicationContactColumnContainer>
              <InputGroup>
                <BoldLabelTitle>Preferred Language</BoldLabelTitle>
                <LanguageBox value={candidate.language} />
              </InputGroup>
              <Form>
                <Form.Group>
                  <Form.Input label="Client ID #" width={10} value={candidate.public_id} />
                  <Form.Input content="Verify" width={6} className="verifybutton" control={Button} />
                </Form.Group>
              </Form>
            </YourselfApplicationContactColumnContainer>
            <YourselfApplicationNameColumnContainer>
              <Form>
                <Form.Group>
                  <Form.Input label="First name" width={6} value={candidate.first_name || ''} />
                  <Form.Input label="Last name" width={6} value={candidate.last_name || ''} />
                  <Form.Input label="MI" width={4} value={candidate.middle_initial || ''} />
                </Form.Group>
              </Form>
              <Form>
                <Form.Group>
                  <InlineItem>
                    <label>DOB</label>
                    <Form.Input type="date" />
                  </InlineItem>
                  <Form.Input label="SSN" width={10} value={candidate.ssn4 || ''} />
                </Form.Group>
              </Form>
            </YourselfApplicationNameColumnContainer>
            <YourselfApplicationContact2ColumnContainer>
              <PhoneInputSelectBox candidate={candidate} />
            </YourselfApplicationContact2ColumnContainer>
          </YourselfApplicationContactContainer>
          <YourselfApplicationContactContainer>
            <YourselfApplicationNameColumnContainer>
              <FormRight>
                <Form.Group>
                  <Form.Input label="Email" width={3} value={candidate.email || ''} />
                  <InlineItem width={150}>
                    <label>&nbsp;</label>
                    <SelectWrap fluid options={sampleOptions} />
                  </InlineItem>
                  <Form.Input label="Best Time to Contact" width={3} value={candidate.timeToContact || ''} />
                  <InlineItem width={100}>
                    <label>Time Zone</label>
                    <SelectWrap fluid options={timezoneOptions} />
                  </InlineItem>
                </Form.Group>
              </FormRight>
            </YourselfApplicationNameColumnContainer>
          </YourselfApplicationContactContainer>
          <YourselfApplicationContactContainer>
            <YourselfApplicationNameColumnContainer>
              <BoldLabelTitle>Address Information</BoldLabelTitle>
              <Form>
                <Form.Group>
                  <Form.Input
                    label="Address"
                    width={6}
                    value={current.address1 || ''}
                    onChange={e => {
                      this.setFieldsValue('current', 'address1', e.target.value);
                    }}
                  />
                  <Form.Input
                    label="APT #"
                    width={6}
                    value={current.address2 || ''}
                    onChange={e => {
                      this.setFieldsValue('current', 'address2', e.target.value);
                    }}
                  />
                  <Form.Input
                    label="Zip Code"
                    width={4}
                    value={current.zip_code || ''}
                    onChange={e => {
                      this.setFieldsValue('current', 'zip_code', e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
              <Form>
                <Form.Group>
                  <Form.Input
                    label="City"
                    width={4}
                    value={current.city || ''}
                    onChange={e => {
                      this.setFieldsValue('current', 'city', e.target.value);
                    }}
                  />
                  <Form.Input
                    label="State"
                    width={8}
                    value={current.state || ''}
                    onChange={e => {
                      this.setFieldsValue('current', 'state', e.target.value);
                    }}
                  />
                  <Form.Input label="Time Zone" width={4} />
                </Form.Group>
              </Form>
              <BoldLabelTitle>Duration at current address</BoldLabelTitle>
              <Form>
                <Form.Group>
                  <InlineItem>
                    <label>From</label>
                    <Form.Input
                      type="date"
                      value={current.from_date || ''}
                      onChange={e => {
                        this.setFieldsValue('current', 'from_date', e.target.value);
                      }}
                    />
                  </InlineItem>
                  <InlineItem>
                    <label>To</label>
                    <Form.Input
                      type="date"
                      value={current.to_date || ''}
                      onChange={e => {
                        this.setFieldsValue('current', 'to_date', e.target.value);
                      }}
                    />
                  </InlineItem>
                </Form.Group>
              </Form>
            </YourselfApplicationNameColumnContainer>
            <AutoFill>
              <a>Auto Fill</a>
            </AutoFill>
            <YourselfApplicationNameColumnContainer>
              <BoldLabelTitle>Previous Address Information</BoldLabelTitle>
              <Form>
                <Form.Group>
                  <Form.Input
                    label="Address"
                    width={6}
                    value={previous.address1 || ''}
                    onChange={e => {
                      this.setFieldsValue('previous', 'address1', e.target.value);
                    }}
                  />
                  <Form.Input
                    label="APT #"
                    width={6}
                    value={previous.address2 || ''}
                    onChange={e => {
                      this.setFieldsValue('previous', 'address2', e.target.value);
                    }}
                  />
                  <Form.Input
                    label="Zip Code"
                    width={4}
                    value={previous.zip_code || ''}
                    onChange={e => {
                      this.setFieldsValue('previous', 'zip_code', e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
              <Form>
                <Form.Group>
                  <Form.Input
                    label="City"
                    width={4}
                    value={previous.city || ''}
                    onChange={e => {
                      this.setFieldsValue('previous', 'city', e.target.value);
                    }}
                  />
                  <Form.Input
                    label="State"
                    width={8}
                    value={previous.state || ''}
                    onChange={e => {
                      this.setFieldsValue('previous', 'state', e.target.value);
                    }}
                  />
                  <Form.Input label="Time Zone" width={4} />
                </Form.Group>
              </Form>
              <BoldLabelTitle>Duration at past address</BoldLabelTitle>
              <Form>
                <Form.Group>
                  <InlineItem>
                    <label>From</label>
                    <Form.Input
                      type="date"
                      value={previous.from_date || ''}
                      onChange={e => {
                        this.setFieldsValue('previous', 'from_date', e.target.value);
                      }}
                    />
                  </InlineItem>
                  <InlineItem>
                    <label>To</label>
                    <Form.Input
                      type="date"
                      value={previous.to_date || ''}
                      onChange={e => {
                        this.setFieldsValue('previous', 'to_date', e.target.value);
                      }}
                    />
                  </InlineItem>
                </Form.Group>
              </Form>
            </YourselfApplicationNameColumnContainer>
            <AutoFill>
              <a>Auto Fill</a>
            </AutoFill>
          </YourselfApplicationContactContainer>
        </YourselfApplicationContainer>
      </AccordionForm>
    );
  }
}

export default UserProfileForm;
