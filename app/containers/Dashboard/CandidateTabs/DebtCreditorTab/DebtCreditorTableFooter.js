import React from 'react';
import { Select, Table, Pagination } from 'semantic-ui-react';
import styled from 'styled-components';

const limitOptions = [
  { key: '0', value: '10', text: '10' },
  { key: '1', value: '25', text: '25' },
  { key: '2', value: '50', text: '50' },
  { key: '3', value: '100', text: '100' },
  { key: '4', value: '500', text: 'All' }
];

const PageControl = styled.div`
  display: flex;
  float: right;
  .ui & .dropdown {
    min-width: unset;
    margin-right: 20px;
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

export default class DebtCreditorTableFooter extends React.Component {
  render() {
    const { totalPages, currentPage, limit } = this.props;
    return (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="16">
            <PageControl>
              <React.Fragment>
                <Select options={limitOptions} defaultValue={limit} onChange={this.props.onChangeLimit} />
              </React.Fragment>
              <Pagination
                className="pagenationBar"
                boundaryRange={0}
                onPageChange={this.props.onChangePage}
                size="mini"
                siblingRange={0}
                totalPages={totalPages}
                activePage={currentPage}
                firstItem={null}
                ellipsisItem={null}
                lastItem={null}
                pageItem={
                  <PageItem className="pageItem" disabled>
                    <span>
                      {currentPage} of {totalPages}
                    </span>
                  </PageItem>
                }
              />
            </PageControl>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    );
  }
}
