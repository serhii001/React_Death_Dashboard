import { Table, Button, Modal, Icon } from 'semantic-ui-react';
import React from 'react';
import { get, put, post } from 'axios';
import { API_ENDPOINT_URL } from '../../constants/defaults';
import CampaignForm from './CampaignForm';

var fileDownload = require('js-file-download');

class Campaings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      openModal: false,
      editItem: null,
      imports: []
    };
  }

  componentWillMount = async () => {
    this.getCampaigns();
    this.getImports();
  };

  getCampaigns = () => {
    const url = `${API_ENDPOINT_URL}/campaigns/`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    return get(url, config)
      .then(res => {
        console.info('res', res);
        this.setState({ data: (res && res.data && res.data.data) || [] });
      })
      .catch(err => console.info('error', err));
  };

  getImports = () => {
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
        this.setState({ imports: (res && res.data && res.data.data) || [] });
      })
      .catch(err => console.log('error', err));
  };

  addCampaignRequest = payload => {
    const { editItem } = this.state;
    const url = `${API_ENDPOINT_URL}/campaigns/${editItem ? `${editItem.public_id}` : ''}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    const method = editItem ? put : post;
    method(url, payload, config)
      .then(response => {
        console.info(response.data);
        this.closeModal();
        this.getCampaigns();
      })
      .catch(err => {
        console.info('error', err);
        this.closeModal();
      });
  };

  connectCandidates = data => () => {
    if (data && data.job_number && data.public_id) {
      const url = `${API_ENDPOINT_URL}/campaigns/${data.public_id}/import/${data.job_number}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      };
      put(url, null, config)
        .then(response => {
          console.info(response.data);
        })
        .catch(err => {
          console.info('error', err);
        });
    }
  };

  sendMail = record => () => {
    const url = `${API_ENDPOINT_URL}/campaigns/${record.public_id}/mailer-file`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    return put(url, config)
      .then(res => {
        console.info('res', res);
        setTimeout(() => {
          this.getCampaigns();
        }, 10000);
      })
      .catch(err => console.info('error', err));
  };

  downloadMail = record => () => {
    const url = `${API_ENDPOINT_URL}/campaigns/${record.public_id}/mailer-file`;
    const config = {
      headers: {
        'Content-Disposition': 'attachment;filename=mailer-file',
        'Content-Type': 'application/octet-stream'
      }
    };
    return get(url, config)
      .then(res => {
        console.info('res', res);
        fileDownload(res.data, `${record.public_id}.csv`);
      })
      .catch(err => console.info('error', err));
  };

  addCampaign = () => {
    this.setState({ openModal: true, editItem: null });
  };

  closeModal = () => {
    this.setState({ openModal: false, editItem: null });
  };

  editCampaign = record => () => {
    this.setState({ openModal: true, editItem: record });
  };

  renderModal = () => {
    const { openModal, editItem, imports } = this.state;
    return (
      <Modal size="small" open={openModal}>
        <Modal.Header>Compaign {editItem ? 'Edit' : 'Add'}</Modal.Header>
        <Modal.Content image scrolling>
          <CampaignForm editItem={editItem} onClose={this.closeModal} onSubmit={this.addCampaignRequest} imports={imports} />
        </Modal.Content>
      </Modal>
    );
  };

  render() {
    const { data } = this.state;

    const rows = data.map(record => {
      const mailerFile = record.mailer_file ? (
        <Button onClick={this.downloadMail(record)}>Download mail</Button>
      ) : (
        <Button onClick={this.sendMail(record)}>Send mail</Button>
      );

      return (
        <Table.Row key={record.public_id}>
          <Table.Cell>{record.public_id}</Table.Cell>
          <Table.Cell>{record.name}</Table.Cell>
          <Table.Cell>{record.description}</Table.Cell>
          <Table.Cell>{record.phone}</Table.Cell>
          <Table.Cell>{record.job_number}</Table.Cell>
          <Table.Cell>{record.offer_expire_date}</Table.Cell>
          <Table.Cell>{mailerFile}</Table.Cell>
          <Table.Cell>{record.mailing_date}</Table.Cell>
          <Table.Cell>{record.inserted_on}</Table.Cell>
          <Table.Cell>
            <Button onClick={this.editCampaign(record)} title="Edit">
              <Icon name="pencil" />
            </Button>
            {record.job_number ? (
              <Button onClick={this.connectCandidates(record)} title="Connect Candidates">
                <Icon name="exchange" />
              </Button>
            ) : null}
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <div>
        <Button onClick={this.addCampaign}>Add Campaign</Button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Public ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Job Number</Table.HeaderCell>
              <Table.HeaderCell>Offer Expire Date</Table.HeaderCell>
              <Table.HeaderCell>Mailer File</Table.HeaderCell>
              <Table.HeaderCell>Mailing Date</Table.HeaderCell>
              <Table.HeaderCell>Inserted On</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{rows}</Table.Body>
        </Table>
        {this.renderModal()}
      </div>
    );
  }
}

export default Campaings;
