import React, { Component } from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { AppState } from "../../redux/reducers/rootReducer";
import { logout } from "../../redux/actions/userActions";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Router from "../../routing/router";
import Images from "../../assets/images/images";

import styles from "./index.module.scss";

interface IHeaderComponentState {
  selectedTab: string;
}

type THeaderComponentProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class HeaderComponent extends Component<
  THeaderComponentProps,
  IHeaderComponentState
> {
  constructor(props: THeaderComponentProps) {
    super(props);

    this.state = { selectedTab: "" };
  }

  handleSelect = eventKey => {
    switch (eventKey) {
      case "logout": {
        this.props.logout();
        break;
      }
      default: {
        Router.routes[eventKey].go();
        break;
      }
    }
  };

  renderLink(key: string, text: string) {
    return Router.routes[key].props.allowedRoles.some(r =>
      this.props.roles.includes(r)
    ) ? (
      <Nav.Link eventKey={key}>{text}</Nav.Link>
    ) : null;
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.navigationContainer}>
          <Navbar bg="light" variant="light" expand="md">
            <Navbar.Brand onClick={() => Router.routes.meals.go()}>
              <img src={Images.logo} className={styles.logo} alt="Diet" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto" onSelect={this.handleSelect}>
                {this.props.isAuthenticated ? (
                  <>
                    {this.renderLink("meals", "Meals")}
                    {this.renderLink("settings", "Settings")}
                    {this.renderLink("users", "Manage Users")}
                    {this.renderLink("account", "Account")}
                    <Nav.Link eventKey="logout">Sign out</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link eventKey="login">Sign in</Nav.Link>
                    <Nav.Link eventKey="register">Register</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
  roles: state.userReducer.roles
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
