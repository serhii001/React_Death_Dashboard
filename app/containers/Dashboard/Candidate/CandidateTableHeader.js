import { Table, Checkbox, Icon, Image } from 'semantic-ui-react';
import React from 'react';
import { map } from 'lodash';
import styled from 'styled-components';

import download_image from '../../../assets/img/arrow_to_bottom.png';

const DownloadIcon = styled.div`
  width: 19px;
  & img {
    width: 100%;
  }
  cursor: pointer;
`;

const AddIcon = styled.div`
  & i {
    color: #00a7fa;
  }
  cursor: pointer;
`;

const DeleteIcon = styled.div`
  & i {
    color: #ac2e2e;
  }
  cursor: pointer;
`;

export default class CandidateTableHeader extends React.Component {
  downloadRows = () => {
    alert('Download');
  };

  addRow = () => {
    alert('Add');
  };

  removeRows = () => {
    alert('Remove');
  };

  render() {
    const { fields } = this.props;


    console.log('fields', fields)
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Checkbox onClick={this.props.selectAll} />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <DownloadIcon onClick={this.downloadRows}>
              <Image src={download_image} />
            </DownloadIcon>
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={this.props.column === 'id' ? this.props.direction : null}
            onClick={() => this.props.handleSort('id')}
          >
            <AddIcon onClick={this.addRow}>
              <Icon name="plus circle" />
            </AddIcon>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <DeleteIcon onClick={this.removeRows}>
              <Icon name="trash" />
            </DeleteIcon>
          </Table.HeaderCell>
          {map(fields, item => (
            <Table.HeaderCell
              sorted={this.props.column === item.field ? this.props.direction : null}
              onClick={() => this.props.handleSort(item.field)}
            >
              {item.tableName}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
    );
  }
}
