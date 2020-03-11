import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";

import styles from "./index.module.scss";

interface ISettingsPageState {
  isPageLoading: boolean;
}

class SettingsPage extends Component<any, ISettingsPageState> {
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
          <div>Settings</div>
        )}
      </div>
    );
  }
}

export default SettingsPage;
