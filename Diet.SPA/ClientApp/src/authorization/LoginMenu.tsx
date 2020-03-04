import React, { Component, Fragment } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

interface LoginMenuState {
  isAuthenticated: boolean;
  userName: string;
}

export class LoginMenu extends Component<any, LoginMenuState> {
  _subscription: number;

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
    this.setState({
      isAuthenticated,
      userName: user && user.name
    });
  }

  render() {
    const { isAuthenticated, userName } = this.state;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
      return this.authenticatedView(userName, profilePath, logoutPath);
    }
  }

  authenticatedView(userName, profilePath, logoutPath) {
    return (
      <Fragment>
        <Nav.Link href={profilePath}>Привіт {userName}</Nav.Link>
        <Link to={logoutPath} className="nav-link">
          Вийти
        </Link>
      </Fragment>
    );
  }

  anonymousView(registerPath, loginPath) {
    return (
      <Fragment>
        <Nav.Link href={registerPath}>Зареєструватися</Nav.Link>
        <Nav.Link href={loginPath}>Увійти</Nav.Link>
      </Fragment>
    );
  }
}
