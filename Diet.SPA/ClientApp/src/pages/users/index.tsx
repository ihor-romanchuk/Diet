import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";

import styles from "./index.module.scss";

interface IUsersPageState {
  isPageLoading: boolean;
}

class UsersPage extends Component<any, IUsersPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isPageLoading: true
    };
  }

  componentDidMount() {
    this.setState({
      isPageLoading: false
    });
  }

  render() {
    return (
      <div className={styles.container}>
        {this.state.isPageLoading ? (
          <Spinner animation="border" role="status" variant="success">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <div>Users</div>
        )}
      </div>
    );
  }
}

export default UsersPage;
