import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { LoginMenu } from '../../authorization/LoginMenu';

import Router from '../../routing/router';
import Images from '../../assets/images/images';

import styles from './index.module.scss';

interface HeaderComponentState {
  selectedTab: string;
}
class HeaderComponent extends Component<ReturnType<typeof mapStateToProps>, HeaderComponentState> {
  constructor(props: ReturnType<typeof mapStateToProps>) {
    super(props);

    this.state = { selectedTab: '' };
  }

  componentDidMount() {}

  handleSelect = eventKey => {
    switch (eventKey) {
      case 'sneakers': {
        Router.routes.meals.go();
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
                <Nav.Link eventKey="sneakers">Meals</Nav.Link>
                {this.props.isAuthenticated ? (
                  <>
                    <Nav.Link eventKey="sold">Продані</Nav.Link>
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
