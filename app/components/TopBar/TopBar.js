import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findIndex, forEach, map, size } from 'lodash';
import { Progress, Dropdown, Label, Grid, Checkbox } from 'semantic-ui-react';
import logo from '../../assets/images/logo.png';
import FiltersDropdown from "./FiltersDropdown";
import NotificationsModal from "./NotificationsModal";
import {
  Wrapper,
  LogoWrapper,
  TopIcon,
  IconWrap,
  VericalDivider,
  Avatar,
  TopLogo,
  TopBox,
  TopTitle,
  SearchBox,
  SearchWrapper,
  Filters,
  SearchComponent,
  InfoWrapper,
  TitleInfo1,
  TitleInfo2,
  InfoSectionBottom,
  InfoSectionTop
} from "./styles";
import { filters as initialFilters } from 'constants/defaults';

class TopBar extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    active: PropTypes.objectOf(PropTypes.any)
  };

  static defaultProps = {
    active: {}
  };

  constructor(props) {
    super(props)
    let payload = localStorage.getItem('filter');
    if (payload) {
      payload = JSON.parse(payload);
      payload.from = new Date(payload.from);
      payload.to = new Date(payload.to);
    } else {
      payload = {
        from: new Date(),
        to: new Date(),
        filters: initialFilters
      }
    }
    this.state = {
      openFilters: false,
      ...payload
    };
  }

  componentDidMount() {
    this.onSave();
  }

  onChangeDate = field => value => {
    this.setState({ [field]: value })
  };

  checkAll = (filters = { ...this.state.filters }) => {
    let unchecked = 0;
    let count = size(filters.leftColumn) + size(filters.rightColumn);
    forEach(filters.leftColumn, item => {
      if (!item.value) {
        unchecked++;
      }
    });
    forEach(filters.rightColumn, item => {
      if (!item.value) {
        unchecked++;
      }
    });
    const all = unchecked === 0  ? 1 : (unchecked === count ? -1 : 0);
    return all;
  };

  onChangeAll = () => {
    const filters = { ...this.state.filters };
    const all = this.checkAll();
    console.log('all', all)
    filters.leftColumn = map(filters.leftColumn, item => {
      return {...item, value: all <= 0 };
    });
    filters.rightColumn = map(filters.rightColumn, item => {
      return {...item, value: all <= 0 };
    });
    this.setState({ filters, all: this.checkAll(filters) })
  };

  onChange = (column, item) => event => {
    const filters = { ...this.state.filters };
    const index = findIndex(filters[column], f => f.key === item.key);

    if (index > -1) {
      filters[column][index]['value'] = !item.value
      const all = this.checkAll(filters);
      this.setState({ filters, all })
    }
  };

  toStorage = (object) => {
    localStorage.setItem('filter', JSON.stringify(object));
  };

  onSave = () => {
    const { onFilter } = this.props;
    const { filters, from, to } = this.state;
    this.toStorage({from: from.toString(), to: to.toString(), filters});
    const payload = {
      from,
      to,
    };
    forEach(filters.leftColumn, item => {
      payload[item.key] = item.value;
    });
    forEach(filters.rightColumn, item => {
      payload[item.key] = item.value;
    });

    onFilter(payload);
    this.setState({ openFilters: false, all: this.checkAll(filters) });
  };

  onClick = (event, data) => {
    // console.log('onClick', event, data);
    this.setState({ openFilters: !this.state.openFilters })
  };

  onClickMenu = (event, data) => {
    event.preventDefault();
    event.stopPropagation();
  };

  handleSearch = event => {
    const { onSearch } = this.props;
    console.log('handleSearch', event.target.value);
    onSearch(event.target.value);
  };

  handleNotifications = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const { active } = this.props;
    const { filters, openFilters, from, to, all } = this.state;

    return (
      <Wrapper fluid>
        <LogoWrapper>
          <NotificationsModal>
            <TopIcon onClick={this.handleNotifications}>
              <IconWrap name="bell outline" />
              <Label color="red" floating>
                5
              </Label>
            </TopIcon>
          </NotificationsModal>
          <NotificationsModal>
            <TopIcon onClick={this.handleNotifications}>
              <IconWrap name="comment outline" />
              <Label color="red" floating>
                5
              </Label>
            </TopIcon>
          </NotificationsModal>
          <VericalDivider />
          <Avatar src={logo} alt="" />
          <TopLogo>LOGO</TopLogo>
        </LogoWrapper>
        <TopBox fluid>
          <TopTitle>{active.content}</TopTitle>
          <SearchBox>
            <SearchWrapper>
              <Filters
                open={openFilters}
                text="Filters"
                defaultValue={1}
                icon="chevron down"
                closeOnChange={false}
                closeOnBlur={false}
                onClick={this.onClick}
              >
                <Dropdown.Menu onClick={this.onClickMenu} content={
                  <FiltersDropdown
                    filters={filters}
                    dateFrom={from}
                    dateTo={to}
                    all={all}
                    onChangeDate={this.onChangeDate}
                    onChange={this.onChange}
                    onChangeAll={this.onChangeAll}
                    onSave={this.onSave}
                  />
                }>
                </Dropdown.Menu>
              </Filters>
              <SearchComponent icon="search" iconPosition="left" placeholder="Search..." onChange={this.handleSearch} />
            </SearchWrapper>
          </SearchBox>
          <InfoWrapper>
            <div>
              <TitleInfo1>TODAY:</TitleInfo1>
              <TitleInfo2>WEEK</TitleInfo2>
            </div>
            <div>
              <InfoSectionTop color="#ff7f00">
                <div>
                  136 <span>Calls</span>
                </div>
                <Progress percent={32} />
              </InfoSectionTop>
              <InfoSectionBottom color="#ff7f00">536</InfoSectionBottom>
            </div>
            <div>
              <InfoSectionTop color="#ff0000">
                <div>
                  23% <span>Conversion</span>
                </div>
                <Progress percent={32} />
              </InfoSectionTop>
              <InfoSectionBottom color="#ff0000" margin={20}>
                15%
              </InfoSectionBottom>
            </div>
            <div>
              <InfoSectionTop color="#20cb96">
                <div>
                  94% <span>QA Rate</span>
                </div>
                <Progress percent={32} />
              </InfoSectionTop>
              <InfoSectionBottom color="#20cb96">98%</InfoSectionBottom>
            </div>
          </InfoWrapper>
        </TopBox>
      </Wrapper>
    );
  }
}

export default TopBar;
