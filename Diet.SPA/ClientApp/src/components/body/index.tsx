import React, { Component } from "react";

import styles from "./index.module.scss";

interface BodyComponentState {}

class BodyComponent extends Component<any, BodyComponentState> {
  render() {
    return <div className={styles.body}>{this.props.children}</div>;
  }
}

export default BodyComponent;
