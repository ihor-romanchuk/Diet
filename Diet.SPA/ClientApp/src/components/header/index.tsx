import React, { Component } from "react";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers/rootReducer";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { LoginMenu } from "../../authorization/LoginMenu";

import Router from "../../routing/router";
import Images from "../../assets/images/images";

import styles from "./index.module.scss";

interface HeaderComponentState {
  selectedTab: string;
}
class HeaderComponent extends Component<ReturnType<typeof mapStateToProps>, HeaderComponentState> {
  constructor(props: ReturnType<typeof mapStateToProps>) {
    super(props);

    this.state = { selectedTab: "" };
  }

  componentDidMount() {}

  handleSelect = eventKey => {
    switch (eventKey) {
      case "sneakers": {
        Router.routes.home.go();
        break;
      }
      case "sold": {
        Router.routes.salesHistory.go();
        break;
      }
      case "brands": {
        Router.routes.brands.go();
        break;
      }
      case "locations": {
        Router.routes.locations.go();
        break;
      }
      case "salePlaces": {
        Router.routes.salePlaces.go();
        break;
      }
      case "purchaseSources": {
        Router.routes.purchaseSources.go();
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
          <Navbar bg="dark" variant="dark" expand="md">
            <Navbar.Brand onClick={() => Router.routes.home.go()}>
              <img src={Images.logo} className={styles.logo} alt="CrosStreet" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto" onSelect={this.handleSelect}>
                <Nav.Link eventKey="sneakers">Кросівки</Nav.Link>
                {this.props.isAuthenticated ? (
                  <>
                    <Nav.Link eventKey="sold">Продані</Nav.Link>
                    <Nav.Link eventKey="brands">Бренди</Nav.Link>
                    <Nav.Link eventKey="locations">Місця знаходження</Nav.Link>
                    <Nav.Link eventKey="salePlaces">Місця продажу</Nav.Link>
                    <Nav.Link eventKey="purchaseSources">Походження</Nav.Link>
                  </>
                ) : null}
                <LoginMenu></LoginMenu>
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
