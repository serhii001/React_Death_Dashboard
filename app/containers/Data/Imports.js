import React from 'react';
import { forEach, filter } from 'lodash';
import { get } from 'axios';
import { Table, Button, Modal, Icon, Progress } from 'semantic-ui-react';
import { API_ENDPOINT_URL } from '../../constants/defaults';
import ImportForm from './ImportForm';

class Imports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tasks: {},
      progress: {},
      openModal: false
    };
  }

  componentWillMount() {
    this.getImports();
  };

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state;

    if (prevState.data !== data) {
      this.checkStatus();
    }
  };

  checkStatus = () => {
    const { data, tasks } = this.state;
    const newTasks = {};
    forEach(data, item => {
      if ((item.status === 'RUNNING' || item.status === 'CREATED') && !tasks[item.public_id]) {
        const timerId = setInterval(() => {
          this.getImportStatus(item.public_id);
        }, 10 * 1000);
        newTasks[item.public_id] = timerId;
      }
    });
    this.setState({ tasks: { ...tasks, ...newTasks } })
  };

  getImportStatus = (id) => {
    const self = this;
    const url = `${API_ENDPOINT_URL}/candidates/imports/${id}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    return get(url, config)
      .then(res => {
        const { tasks, progress, data } = self.state;

        if (res.data) {
          const status = res.data && res.data.status;
          if (status === 'RUNNING' || status === 'CREATED') {
            const progressValue = res.data && res.data.tasks && res.data.tasks[0] && res.data.tasks[0].progress;
            self.setState({
              progress: { ...progress, [id]: progressValue }
            })
          } else {
            clearInterval(tasks[id]);
            const newData = filter(data, item => item.public_id !== res.data.public_id);
            self.setState({
              data: [ ...newData, { ...res.data } ],
              tasks: { ...tasks, [id]: undefined },
              progress: { ...progress, [id]: undefined }
            })
          }
        }

      })
      .catch(err => console.log('error', err));
  };

  getImports = () => {
    const self = this;
    const url = `${API_ENDPOINT_URL}/candidates/imports`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    return get(url, config)
      .then(res => {
        console.log('res', res);
        self.setState({ data: (res && res.data && res.data.data) || [] });
      })
      .catch(err => console.log('error', err));
  };

  openModal = () => {
    this.setState({ openModal: true });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  submitImport = () => {
    this.closeModal();
    this.getImports();
  };

  renderModal = () => {
    const { openModal } = this.state;
    return (
      <Modal open={openModal}>
        <Modal.Header>Edit</Modal.Header>
        <Modal.Content image scrolling>
          <ImportForm onClose={this.closeModal} onSubmit={this.submitImport} />
        </Modal.Content>
      </Modal>
    );
  };

  render() {
    const { data, tasks, progress } = this.state;
    const rows = data.map(record => (
      <Table.Row key={record.public_id}>
        <Table.Cell>{record.public_id}</Table.Cell>
        <Table.Cell>{record.file}</Table.Cell>
        <Table.Cell textAlign='center'>
          {record.status === 'ERROR' ?
            <Icon color="red" name="times" size='large' />
            : (record.status === 'FINISHED' ?
              <Icon color="green" name="check" size='large' />
              : <Progress size="small" color="yellow" percent={progress[record.public_id] || 0} indicating />
            )
          }
        </Table.Cell>
        <Table.Cell>{record.inserted_on}</Table.Cell>
        <Table.Cell>{record.updated_on}</Table.Cell>
      </Table.Row>
    ));

    return (
      <div>
        <Button onClick={this.openModal}>Import</Button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>File</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Status</Table.HeaderCell>
              <Table.HeaderCell>Uploaded On</Table.HeaderCell>
              <Table.HeaderCell>Last Updated</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{rows}</Table.Body>
        </Table>
        {this.renderModal()}
      </div>
    );
  }
}

export default Imports;
