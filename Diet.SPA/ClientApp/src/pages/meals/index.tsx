import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import Router from "../../routing/router";
import Button from "react-bootstrap/Button";

import styles from "./index.module.scss";

class MealsPage extends Component<RouteComponentProps> {
  render() {
    return (
      <div className={styles.container}>
        <Button variant="success" onClick={() => Router.routes.addMeal.go()}>
          Add meal
        </Button>
        <div>Date: </div>
        <div>Time: </div>
        <div>
          <div>
            Day with meals
            <div>Meal1</div>
            <div>Meal2</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MealsPage);
