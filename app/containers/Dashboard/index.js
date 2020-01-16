import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Segment, Sidebar, Container } from 'semantic-ui-react';
import VerticalSidebar from 'components/VerticalSidebar/VerticalSidebar';
import TopBar from 'components/TopBar/TopBar';
import PrivateRoute from 'components/PrivateRoute';
import { adminRoutes } from 'constants/adminRoutes';
import routes  from 'constants/routes.json';
import { logout } from 'redux/actions/auth';
import { setFilter, setSearch } from 'redux/actions/users';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Data from '../Data/Data';
import CandidateList from "./Candidate/CandidateList";
import LeadList from "./Leads/LeadList";

const AppWrapper = styled('div')`
  min-height: 100vh;
`;
const RightWrapper = styled(Segment)`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0 !important;
`;
const TopBarWrapper = styled(Container)`
  min-height: 212px;
  display: block;
`;
const ContentWrapper = styled(Container)`
  flex: 1;
  display: block;
  overflow-y: auto;
  padding: 24px;
`;

class App extends Component {
  static propTypes = {
    setFilterAction: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    user: PropTypes.shape({
      email: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      photo: PropTypes.string
    })
  };

  static defaultProps = {
    user: {}
  };

  state = {
    animation: 'push',
    direction: 'left',
    dimmed: false,
    visible: false,
    activeMenuItem: {
      content: 'Dashboard',
      key: 'dashboard'
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateSize);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
  }

  updateSize = () => {
    if (window.innerWidth < 1600) {
      this.setState({ visible: false });
    }
  };

  handleAnimationChange = animation => () => this.setState(prevState => ({ animation, visible: !prevState.visible }));

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  selectMenu = item => () => {
    const { history } = this.props;

    this.setState({ activeMenuItem: item });
    history.push(item.to);
  };

  onFilter = filters => {
    this.props.setFilterAction(filters);
  };

  onSearch = query => {
    this.props.setSearchAction(query);
  };

  render() {
    const { user, filter } = this.props;
    const { animation, dimmed, direction, visible, activeMenuItem } = this.state;

    const userData = {
      ...user,
      name: 'Sara Flores',
      description: 'Sr. Manager of Openers',
      photo: require('../../assets/images/avatar.jpg')
    };

    return (
      <AppWrapper>
        <Sidebar.Pushable as={Segment} style={{ border: 'none' }}>
          <VerticalSidebar
            menu={adminRoutes}
            user={userData}
            animation={animation}
            direction={direction}
            visible={visible}
            onToggle={this.handleAnimationChange('push')}
            onSelect={this.selectMenu}
            onLogout={this.handleLogout}
            active={activeMenuItem}
          />

          <Sidebar.Pusher
            dimmed={dimmed && visible}
            style={{
              width: visible ? 'calc(100% - 391px)' : 'calc(100% - 105px)'
            }}
          >
            <RightWrapper basic>
              <TopBarWrapper fluid style={{ marginRight: '0 !important' }}>
                <TopBar active={activeMenuItem} onFilter={this.onFilter} onSearch={this.onSearch} />
              </TopBarWrapper>
              <ContentWrapper fluid style={{ marginRight: '0 !important' }}>
                <Switch>
                  <PrivateRoute exact path={routes.HOME} component={CandidateList} />
                  <PrivateRoute exact path={routes.LEADS} component={LeadList} />
                  <PrivateRoute exact path={routes.DATA} component={Data} />
                  <PrivateRoute component={NotFoundPage} />
                </Switch>
              </ContentWrapper>
            </RightWrapper>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  setFilterAction: data => dispatch(setFilter(data)),
  setSearchAction: data => {
    dispatch(setSearch(data));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
