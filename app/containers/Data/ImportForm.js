import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Message, Form } from 'semantic-ui-react';

// import "./styles.css";
import { post } from 'axios';
import { API_ENDPOINT_URL } from '../../constants/defaults';

class ImportForm extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  fileInputRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  onFormSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file)
      .then(response => {
        console.log(response.data);
        onSubmit();
      })
      .catch(err => console.log('error', err));
  };

  fileChange = e => {
    this.setState({ file: e.target.files[0] }, () => {
      console.log('File chosen --->', this.state.file);
    });
  };

  // Import datasources/schemas Tab 1
  fileUpload = file => {
    const url = `${API_ENDPOINT_URL}/candidates/upload`;
    const formData = new FormData();
    formData.append('csv_file', file);
    const config = {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    };
    return post(url, formData, config);
  };

  handleChoose = event => {
    event.preventDefault();
    this.fileInputRef.current.click();
  };

  render() {
    const { onClose } = this.props;

    return (
      <div>
        <Message>Choose file for import</Message>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <Button content="Choose File" labelPosition="left" icon="file" onClick={this.handleChoose} />
            <input ref={this.fileInputRef} type="file" hidden onChange={this.fileChange} />
          </Form.Field>
          <div>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Upload</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default ImportForm;
