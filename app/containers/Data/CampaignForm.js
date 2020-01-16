import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filter, map } from 'lodash';
import { Button, Form, Select } from 'semantic-ui-react';

// import "./styles.css";

class ImportForm extends Component {
  static propTypes = {
    editItem: PropTypes.objectOf(PropTypes.any),
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    imports: PropTypes.arrayOf(PropTypes.any)
  };

  static defaultProps = {
    editItem: null
  };

  constructor(props) {
    super(props);
    const { editItem } = props;
    this.state = {
      name: (editItem && editItem.name) || '',
      description: (editItem && editItem.description) || '',
      phone: (editItem && editItem.phone) || '',
      jobNumber: (editItem && editItem.job_number) || '',
      offerExpireDate: (editItem && editItem.offer_expire_date) || '',
      mailingDate: (editItem && editItem.mailing_date) || ''
    };
  }

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    const { editItem } = this.props;

    if (prevProps.editItem !== editItem) {
      this.setData();
    }
  }

  setData = () => {
    const { editItem } = this.props;

    this.setState({
      name: (editItem && editItem.name) || '',
      description: (editItem && editItem.description) || '',
      phone: (editItem && editItem.phone) || '',
      jobNumber: (editItem && editItem.job_number) || '',
      offerExpireDate: (editItem && editItem.offer_expire_date) || '',
      mailingDate: (editItem && editItem.mailing_date) || ''
    });
  };

  onFormSubmit = e => {
    e.preventDefault(); // Stop form submit
    const { name, description, phone, jobNumber, offerExpireDate, mailingDate } = this.state;
    const { onSubmit } = this.props;
    const payload = {
      name,
      description,
      phone,
      job_number: jobNumber,
      offer_expire_date: offerExpireDate,
      mailing_date: mailingDate
    };

    onSubmit(payload);
  };

  onChange = field => event => {
    this.setState({ [field]: event.target.value });
  };

  onSelectChange = field => (event, data) => {
    this.setState({ [field]: data.value });
  };

  render() {
    const { name, description, phone, jobNumber, offerExpireDate, mailingDate } = this.state;
    const { onClose, imports } = this.props;
    const jobs = filter(imports, item => item.status === 'FINISHED');
    const jobOptions = map(jobs, item => ({ key: item.public_id, value: item.public_id, text: item.public_id }));

    return (
      <div>
        <Form size="large" onSubmit={this.onFormSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              width={8}
              label="Name"
              control="input"
              placeholder="Name"
              value={name}
              onChange={this.onChange('name')}
            />

            <Form.Field
              width={8}
              label="Phone"
              control="input"
              placeholder="Phone"
              value={phone}
              onChange={this.onChange('phone')}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              label="Description"
              control="input"
              placeholder="Description"
              value={description}
              onChange={this.onChange('description')}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Select width={16} placeholder='Select job' options={jobOptions} value={jobNumber} onChange={this.onSelectChange('jobNumber')} />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              width={8}
              type="date"
              label="Offer Expire Date"
              control="input"
              placeholder="Offer Expire Date"
              value={offerExpireDate}
              onChange={this.onChange('offerExpireDate')}
            />
            <Form.Input
              width={8}
              type="date"
              label="Mailing Date"
              control="input"
              placeholder="Mailing Date"
              value={mailingDate}
              onChange={this.onChange('mailingDate')}
            />
          </Form.Group>
          <div>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default ImportForm;
