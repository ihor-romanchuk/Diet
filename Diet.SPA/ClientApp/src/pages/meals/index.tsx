import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import Router from "../../routing/router";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

import { getMeals } from "../../services/meals";
import MealDto from "../../dtos/meal";

import MealTileComponent from "../../components/mealTile";

import styles from "./index.module.scss";

interface IMealsPageState {
  isPageLoading: boolean;
  meals: MealDto[];
}

class MealsPage extends Component<RouteComponentProps, IMealsPageState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      isPageLoading: true,
      meals: []
    };
  }

  componentDidMount() {
    this.loadMeals();
  }

  async loadMeals() {
    let meals = await getMeals();
    this.setState({
      meals: meals,
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
          <>
            <Button
              variant="success"
              onClick={() => Router.routes.addMeal.go()}
            >
              Add meal
            </Button>
            <div>Date: </div>
            <div>Time: </div>
            <Row>
              <Col xs={12} md={6}>
                {this.state.meals.length ? (
                  <Card className="text-center">
                    <Card.Header>Day with meals</Card.Header>
                    <Card.Body>
                      {this.state.meals.map(meal => (
                        <MealTileComponent
                          meal={meal}
                          onDelete={() =>
                            this.setState(state => {
                              return {
                                meals: state.meals.filter(m => m !== meal)
                              };
                            })
                          }
                        ></MealTileComponent>
                      ))}
                    </Card.Body>
                  </Card>
                ) : null}
              </Col>
            </Row>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(MealsPage);
