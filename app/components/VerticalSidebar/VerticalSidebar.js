import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Menu, Icon, Container, Image, Button } from 'semantic-ui-react';
import styled from 'styled-components';

const SidebarWrap = styled(Menu)`
  height: 100vh !important;
  position: fixed !important;
  bottom: 0 !important;
  top: 0 !important;
  flex-direction: column;
  display: flex !important;
  box-shadow: none !important;
  overflow-x: hidden;
`;
const TopBox = styled(Container)`
  height: 212px;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: row !important;
`;
const Avatar = styled(Image)`
  width: 60px;
  height: 60px;
  display: block;
  border-radius: 50%;
  margin-right: 24px;
`;
const Username = styled('div')`
  text-align: left;
  font-family: Roboto, Arial, sans-serif;
  font-weight: 500;
  font-size: 32px;
  line-height: 43px;
  letter-spacing: 0;
  color: #5fa1fc;
  opacity: 1;
`;
const Description = styled('div')`
  text-align: left;
  font-family: Roboto, Arial, sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 31px;
  letter-spacing: 0;
  color: #707070;
  opacity: 1;
`;
const MenuTitle = styled('div')`
  text-align: left;
  font-family: Lato, Arial, sans-serif;
  font-weight: 500;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0;
  color: #9ea0a5;
  height: 32px;
  padding-left: 24px;
`;
const MenuWrapper = styled('div')`
  border-right: 1px solid #959494;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;
const Actions = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px 48px 30px !important;
  border-right: 1px solid #959494;
  i {
    font-size: 35px !important;
    line-height: 35px;
    margin-left: 0 !important;
  }
`;
const Logout = styled(Button)`
  background: #ff7f00 !important;
  text-transform: uppercase !important;
  color: #fff !important;
`;

class VerticalSidebar extends PureComponent {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.any).isRequired,
    animation: PropTypes.string,
    direction: PropTypes.string,
    active: PropTypes.objectOf(PropTypes.any),
    visible: PropTypes.bool,
    onToggle: PropTypes.func,
    onSelect: PropTypes.func,
    onLogout: PropTypes.func,
    menu: PropTypes.arrayOf(PropTypes.any)
  };

  static defaultProps = {
    animation: 'push',
    direction: 'left',
    active: {},
    visible: true,
    onToggle: () => {},
    onLogout: () => {},
    onSelect: () => {},
    menu: []
  };

  render() {
    const { animation, direction, visible, onToggle, menu, user, onSelect, onLogout, active } = this.props; // eslint-disable-line no-shadow

    return (
      <Sidebar
        as={SidebarWrap}
        animation={animation}
        direction={direction}
        icon="labeled"
        inverted
        vertical
        visible
        width={visible ? 'wide' : 'very thin'}
        style={{ height: '100vh !important' }}
      >
        <TopBox>
          <Avatar src={user.photo} alt="" />
          {visible ? (
            <div>
              <Username>{user.name}</Username>
              <Description>{user.description}</Description>
            </div>
          ) : null}
        </TopBox>
        <MenuTitle>{visible ? 'Main Menu' : ''}</MenuTitle>
        <MenuWrapper>
          {menu.map(item => (
            <Menu.Item as="a" key={item.to} active={item.key === active.key} onClick={onSelect(item)}>
              <Icon name={item.icon} />
              {visible ? item.content : null}
            </Menu.Item>
          ))}
        </MenuWrapper>
        <Actions>
          <Icon name="arrow alternate circle right outline" onClick={onToggle} />
          {visible ? (
            <Logout size="big" onClick={onLogout}>
              Log Out
            </Logout>
          ) : null}
        </Actions>
      </Sidebar>
    );
  }
}

export default VerticalSidebar;
