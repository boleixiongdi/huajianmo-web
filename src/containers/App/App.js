import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { InfoBar } from 'components';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log(nextProps);
    console.log(this.props);
    console.log(!this.props.user);
    if (!this.props.user && nextProps.user) {
      // login
      console.log(nextProps);
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <div className={styles.brand}/>
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar pullRight>
              <LinkContainer to="/home">
                <NavItem eventKey={1}>首页</NavItem>
              </LinkContainer>
              <LinkContainer to="/headline">
                <NavItem eventKey={1}>美食头条</NavItem>
              </LinkContainer>
              <LinkContainer to="/dynamic">
                <NavItem eventKey={2}>广场动态</NavItem>
              </LinkContainer>
              <LinkContainer to="/discovered">
                <NavItem eventKey={3}>发现</NavItem>
              </LinkContainer>
              <LinkContainer to="/about">
                <NavItem eventKey={4}>关于我们</NavItem>
              </LinkContainer>
              {user && <LinkContainer to="/chat">
                <NavItem eventKey={5}>聊天</NavItem>
              </LinkContainer>}
              {user && <LinkContainer to="/my">
                <NavItem eventKey={6}>个人中心</NavItem>
              </LinkContainer>}
              {!user &&
              <LinkContainer to="/login">
                <NavItem eventKey={7}>登录</NavItem>
              </LinkContainer>}
              {user &&
              <LinkContainer to="/logout">
                <NavItem eventKey={8} className="logout-link" onClick={this.handleLogout}>
                  退出
                </NavItem>
              </LinkContainer>}
              {user &&
              <p className={styles.loggedInMessage + ' navbar-text'}>用户名 <strong>{user.name}</strong>.</p>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <InfoBar/>

        <div className="well text-center">
        Copyright © 2011-2016<a
          href="http://www.huajianmo.com/"> 花尖墨</a>当前呈现版本 16.06.02
        </div>
      </div>
    );
  }
}
