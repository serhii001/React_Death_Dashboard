import React from 'react';
import { Table, Checkbox, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class CandidateRow extends React.Component {
  constructor(props) {
    super(props);
    this.props.onRef(this);
  }
  state = {
    isExpanded: false
  };
  expandRow = () => {
    this.setState({ isExpanded: true });
    this.props.expandRow(this.props.candidateId);
  };
  collapseRow = () => {
    this.setState({ isExpanded: false });
    console.log('here - candidate row', this.props.candidate, this.props.candidateId, this.state.isExpanded);
  };
  componentDidMount() {
    this.props.onRef(this);
  }
  render() {
    const { isExpanded } = this.state;
    return (
      <Table.Row>
        <Table.Cell>
          <Checkbox
            onClick={() => this.props.handleSelect(this.props.candidate)}
            checked={this.props.isItemSelected(this.props.candidate.id)}
          />
        </Table.Cell>
        <Table.Cell />
        <Table.Cell>{this.props.candidate.id}</Table.Cell>
        <Table.Cell />
        <Table.Cell>{this.props.candidate.first_name}</Table.Cell>
        <Table.Cell>{this.props.candidate.last_name}</Table.Cell>
        <Table.Cell>{this.props.candidate.status}</Table.Cell>
        <Table.Cell>{this.props.candidate.inserted_on}</Table.Cell>
        <Table.Cell>{this.props.candidate.inserted_on}</Table.Cell>
        <Table.Cell>{this.props.candidate.calls}</Table.Cell>
        <Table.Cell textAlign="center">
          <span style={{ color: '#9EA0A5', cursor: 'pointer' }} onClick={this.expandRow}>
            {isExpanded === false && <Icon name="sort" />}
            {isExpanded === true && <Icon rotated="clockwise" name="sort" />}
          </span>
        </Table.Cell>
      </Table.Row>
    );
  }
}

CandidateRow.propTypes = {
  candidate: PropTypes.object.isRequired,
  expandRow: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  isItemSelected: PropTypes.func.isRequired
};
