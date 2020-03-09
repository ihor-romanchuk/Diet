import React, { Component } from "react";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers/rootReducer";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Router from "../../routing/router";
import Images from "../../assets/images/images";

import styles from "./index.module.scss";

interface HeaderComponentState {
  selectedTab: string;
}
class HeaderComponent extends Component<
  ReturnType<typeof mapStateToProps>,
  HeaderComponentState
> {
  constructor(props: ReturnType<typeof mapStateToProps>) {
    super(props);

    this.state = { selectedTab: "" };
  }

  componentDidMount() {}

  handleSelect = eventKey => {
    switch (eventKey) {
      case "meals": {
        Router.routes.meals.go();
        break;
      }
      case "login": {
        Router.routes.login.go();
        break;
      }
      case "register": {
        Router.routes.register.go();
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  };

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
                    <Nav.Link eventKey="meals">Meals</Nav.Link>
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
  isAuthenticated: state.userReducer.isAuthenticated
});

export default connect(mapStateToProps)(HeaderComponent);
