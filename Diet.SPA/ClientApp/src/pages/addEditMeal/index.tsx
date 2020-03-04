import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
//import Button from "react-bootstrap/Button";

import styles from "./index.module.scss";

class MealsPage extends Component<RouteComponentProps> {
  render() {
    return <div className={styles.container}>Add edit meal</div>;
  }
}

export default withRouter(MealsPage);
