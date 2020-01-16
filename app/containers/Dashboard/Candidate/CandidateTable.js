import React from 'react';
import PropTypes from 'prop-types';
import {map, orderBy, filter} from 'lodash';
import { Table, Accordion, Form, Checkbox, Message, Pagination } from 'semantic-ui-react';
import styled from 'styled-components';

import CandidateTableHeader from './CandidateTableHeader';
import CandidateRowContent from './CandidateRowContent';
import { CandidatePageSizeSelect } from './CandidatePageSizeSelect';
import { filters, candidateFields } from 'constants/defaults';

const TableWrapper = styled.div`
  & .table thead tr:first-child > th:first-child,
  & .table thead tr:first-child > th:nth-child(2),
  & .table thead tr:first-child > th:nth-child(3),
  & .table thead tr:first-child > th:nth-child(4) {
    width: 20px;
  }
  & .table thead tr:first-child > th:nth-child(2),
  & .table thead tr:first-child > th:nth-child(4) {
    padding: 1px;
    & i {
      margin: 0px;
      font-size: 15px;
    }
  }
  & .table thead tr:first-child > th:nth-child(3) i {
    font-size: 15px;
  }
  & .table thead tr:first-child > th {
    cursor: pointer;
    background: none;
    color: #9ea0a5;
  }
  & .table thead {
    box-shadow: 0px 3px 2px rgb(123, 123, 123, 0.3);
  }
  & .table {
    color: #3e3f42;
    font: 15px Medium Lato;
  }
  & tfoot .pageItem {
    width: 80px;
    text-align: center;
    margin: auto;
    padding: 12px;
    background: #ebebeb 0% 0% no-repeat padding-box;
    font: 15px Regular Roboto;
    letter-spacing: 0;
    color: #3e3f42;
  }
  & .pagenationBar {
    border-radius: 20px !important;
    background: #00a7fa !important;
    float: right;
    & a {
      color: white !important;
    }
    & a:focus {
      outline: unset;
    }
    & a:hover {
      outline: unset;
    }
  }
`;

const PageControl = styled.div`
  display: flex;
  float: right;
  .ui & .dropdown {
    min-width: unset;
    margin-right: 20px;
  }
`;

const PageItem = styled.div`
  width: 80px;
  text-align: center;
  margin: auto;
  padding: 12px;
  background: #ebebeb 0% 0% no-repeat padding-box;
  font: 15px Regular Roboto;
  letter-spacing: 0;
  color: #3e3f42;
`;

class TRWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className } = this.props;

    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        className: { className }
      });
    });

    return (
      <tr style={{ display: className.includes('active') ? 'table-row' : 'none' }} className="tablerow">
        {children}
      </tr>
    );
  }
}

export default class CandidateTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  prepareColumns = () => {
    const activeFilters = filter([...filters.leftColumn, ...filters.rightColumn], item => this.props.filter[item.key] && item.field);
    const candidateActiveFilters = map(activeFilters, item => item.field);
    console.log('prepareColumns', filters, this.props.filter)
    return filter(orderBy(candidateFields, ['order'], ['asc']), item => candidateActiveFilters.includes(item.field));
  };

  render() {
    const { candidates, onCreditPull, onUpdateCandidate, leads } = this.props;

    if (!candidates) {
      return <React.Fragment />;
    }
    return (
      <React.Fragment>
        <TableWrapper>
          <Table selectable compact stackable>
            <CandidateTableHeader
              fields={this.prepareColumns()}
              column={this.props.column}
              direction={this.props.direction}
              handleSort={this.props.handleSort}
              selectAll={this.props.selectAll}
            />

            <Accordion
              fluid={true}
              as={Table.Body}
              defaultActiveIndex={1}
              panels={map(candidates, (candidate, id) => {
                return {
                  key: id,
                  class: 'tr',
                  title: {
                    as: Table.Row,
                    className: '',
                    children: [
                      <Table.Cell key={`title-${id}-1`}>
                        <Form.Field control={Checkbox} />
                      </Table.Cell>,
                      <Table.Cell key={`title-${id}-2`} />,
                      <Table.Cell key={`title-${id}-3`}>{candidate.id}</Table.Cell>,
                      <Table.Cell key={`title-${id}-4`} />,
                      ...map(this.prepareColumns(), (item, index) => (
                        <Table.Cell key={`title-field-${id}-${index}`}>{candidate[item.field]}</Table.Cell>
                        )),
                    ]
                  },
                  content: {
                    as: TRWrapper,
                    children: [
                      <td key={`content-${id}-1`} colSpan={10}>
                        <CandidateRowContent leads={leads} candidate={candidate} onCreditPull={onCreditPull} onUpdateCandidate={onUpdateCandidate} />
                      </td>
                    ]
                  }
                };
              })}
            />

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="11">
                  <PageControl>
                    <CandidatePageSizeSelect
                      className="pageSizeSelect"
                      limit={this.props.limit}
                      onChangeLimit={this.props.onChangeLimit}
                    />
                    <Pagination
                      className="pagenationBar"
                      totalPages={this.props.totalPages}
                      activePage={this.props.currentPage}
                      onPageChange={this.props.onChangePage}
                      siblingRange={0}
                      boundaryRange={0}
                      firstItem={false}
                      ellipsisItem={null}
                      lastItem={false}
                      pageItem={
                        <PageItem className="pageItem" disabled>
                          <span>
                            {this.props.currentPage} of {this.props.totalPages}
                          </span>
                        </PageItem>
                      }
                    />
                  </PageControl>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </TableWrapper>
      </React.Fragment>
    );
  }
}

CandidateTable.propTypes = {
  filter: PropTypes.objectOf(PropTypes.any),
  leads: PropTypes.bool,
  totalCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  expandRow: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  isItemSelected: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  onChangeLimit: PropTypes.func.isRequired,
  limit: PropTypes.string.isRequired
};
