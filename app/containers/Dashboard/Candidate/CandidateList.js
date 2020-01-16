import React from 'react'
import PropTypes from 'prop-types';
import { Divider, Segment } from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';

import CandidateTable from './CandidateTable';
import { CandidateFilter } from './CandidateFilter';
// import CandidateItemTab from './CandidateItemTab';
import { API_ENDPOINT_URL } from '../../../constants/defaults';

import GlobalStyle from '../../../global-styles';
import SmartCreditModal from 'components/SmartCredit/SmartCreditModal';
import { geteExpenseTypes, getIncomeTypes, getCandidates, updateCandidate } from 'redux/actions/candidates';

const queryParams = ['_limit', '_order', '_sort', 'q', '_page'];

class CandidateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      _sort: 'id',
      _page: 1,
      _order: null,
      _limit: 500,
      q: '',
      totalCount: 0,
      loading: false,
      isSelectAll: false,
      hasRowExpanded: false,
      expanded_row_id: 0,
      open: false
    };
    this.onSubmitFilter = debounce(this.onSubmitFilter, 800);
  }

  componentDidMount() {
    this.loadData({});
  }

  componentDidUpdate(prevProps) {
    const { searchQuery, candidates } = this.props;

    if (prevProps.searchQuery !== searchQuery) {
      this.loadData({});
    }

    if (prevProps.candidates !== candidates) {
      this.setCandidates();
    }
  }

  static directionConverter(order) {
    if (order === 'asc') {
      return 'ascending';
    } else if (order === 'desc') {
      return 'descending';
    } else {
      return null;
    }
  }

  setCandidates = () => {
    const { candidates, candidatesCount } = this.props;

    this.setState({ candidates, totalCount: candidatesCount, loading: false });
  };

  handleSort = clickedColumn => {
    const { _sort, _order } = this.state;

    let newOrder = _order === 'asc' ? 'desc' : 'asc';
    if (_sort !== clickedColumn) {
      newOrder = 'asc';
    }

    this.loadData({
      _sort: clickedColumn,
      _page: 1,
      _order: newOrder
    });
  };

  onChangeLimit = (event, data) => {
    if (data.value !== this.state._limit) {
      this.loadData({ _limit: data.value, _page: 1 });
    }
  };

  onSubmitFilter = filter => {
    if (filter !== this.state.q) {
      this.loadData({ q: filter, _page: 1 });
    }
  };

  onChangePage = (event, data) => {
    const { activePage } = data;
    if (activePage !== this.state._page) {
      this.loadData({ _page: activePage });
    }
  };

  expandRow = async candidateId => {
    await this.setState({
      hasRowExpanded: true,
      expanded_row_id: candidateId
    });
    // fetch(`/api/v1/candidates/${candidate.id}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(candidate)
    // }).then(response => {
    //     if (response.ok) {
    //         response.json().then(data => {
    //             const index = this.state.candidates.findIndex(
    //                 candidate => candidate.id === data.id
    //             );
    //             this.setState({
    //                 candidates: Object.assign([...this.state.candidates], {
    //                     [index]: data
    //                 })
    //             });
    //         });
    //     } else {
    //         response.json().then(error => {
    //             console.log(`Failed to load data: ${error.message}`);
    //         });
    //     }
    // });
  };

  hideItemTab = () => {
    this.setState({ hasRowExpanded: false });
    this.candidateTable.close(this.state.expanded_row_id);
  };

  handleSelect = candidate => {
    candidate.checked = !candidate.checked;
    fetch(`${API_ENDPOINT_URL}/candidates/${candidate.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candidate)
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          const index = this.state.candidates.findIndex(candidate => candidate.id === data.id);
          this.setState({
            candidates: Object.assign([...this.state.candidates], {
              [index]: data
            })
          });
        });
      } else {
        response.json().then(error => {
          console.log(`Failed to load data: ${error.message}`);
        });
      }
    });
  };

  selectAll = () => {
    let data = this.state.candidates;
    data.forEach(element => {
      element.checked = !this.state.isSelectAll;
    });
    this.setState({ isSelectAll: !this.state.isSelectAll });
    this.setState({ candidates: data });
  };

  isItemSelected = id => {
    const index = this.state.candidates.findIndex(candidate => candidate.id === id);
    return this.state.candidates[index].checked;
  };

  loadData = params => {
    const { searchQuery, getIncomeTypesAction, geteExpenseTypesAction, getCandidatesAction } = this.props;
    getIncomeTypesAction();
    geteExpenseTypesAction();
    const newState = Object.assign({}, this.state, params, {
      loading: false
    });
    this.setState({ loading: true });

    queryParams.forEach(function(element) {
      if (!(element in params)) {
        params[element] = newState[element];
      }
    });
    params['search'] = searchQuery || '';
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');

    // Make a request without limit first to get the total number of data.
    let totalCountQuery = '';
    if (params.q !== '') {
      totalCountQuery = `q=${params.q}`;
    }

    getCandidatesAction({ query });
  };

  show = (data = {}) => {
    this.setState({ data, open: true });
  };

  onUpdateCandidate = (data) => {
    const { updateCandidateAction } = this.props;

    updateCandidateAction(data)
  };

  close = () => this.setState({ open: false });

  render() {
    const { hasRowExpanded, open, data } = this.state;
    const { filter } = this.props;

    console.log('filter', filter)
    return (
      <Segment>
        <GlobalStyle />
        <CandidateFilter
          filter={this.state.q}
          totalCount={this.state.totalCount}
          onSubmitFilter={this.onSubmitFilter}
          loading={this.state.loading}
        />
        <Divider />
        <CandidateTable
          candidates={this.state.candidates}
          totalCount={this.state.totalCount}
          totalPages={Math.ceil(this.state.totalCount / this.state._limit)}
          currentPage={this.state._page}
          onChangePage={this.onChangePage}
          expandRow={this.expandRow}
          handleSelect={this.handleSelect}
          isItemSelected={this.isItemSelected}
          column={this.state._sort}
          direction={CandidateList.directionConverter(this.state._order)}
          selectAll={this.selectAll}
          handleSort={this.handleSort}
          onChangeLimit={this.onChangeLimit}
          limit={this.state._limit.toString()}
          hasRowExpanded={hasRowExpanded}
          onRef={ref => (this.candidateTable = ref)}
          onCreditPull={this.show}
          filter={filter}
          onUpdateCandidate={this.onUpdateCandidate}
        />
        <SmartCreditModal dimmer={'blurring'} open={open} onClose={this.close} data={data} />
        {/* {hasRowExpanded && <CandidateItemTab hideItemTab={this.hideItemTab} />} */}
      </Segment>
    );
  }
}

CandidateList.propTypes = {
  candidates: PropTypes.arrayOf(PropTypes.any),
  candidatesCount: PropTypes.number,
  incomeTypes: PropTypes.arrayOf(PropTypes.any),
  expenseTypes: PropTypes.arrayOf(PropTypes.any),
  searchQuery: PropTypes.string,
  filter: PropTypes.objectOf(PropTypes.any),
  getIncomeTypesAction: PropTypes.func.isRequired,
  geteExpenseTypesAction: PropTypes.func.isRequired,
  updateCandidateAction: PropTypes.func.isRequired,
  getCandidatesAction: PropTypes.func.isRequired
};

const mapStateToProps = ({ users, candidates }) => ({
  filter: users.filter,
  searchQuery: users.searchQuery,
  candidates: candidates.candidates.data,
  candidatesCount: candidates.candidates.count,
});

const mapDispatchToProps = dispatch => ({
  getCandidatesAction: (data) => {
    dispatch(getCandidates(data));
  },
  updateCandidateAction: (data) => {
    dispatch(updateCandidate(data));
  },
  getIncomeTypesAction: () => {
    dispatch(getIncomeTypes());
  },
  geteExpenseTypesAction: () => {
    dispatch(geteExpenseTypes());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateList);
