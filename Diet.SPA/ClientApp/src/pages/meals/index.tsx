import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import _ from "lodash";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

import Router from "../../routing/router";

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
            <div>Date range: </div>
            <div>Time range: </div>
            <Row>
              {this.state.meals.length
                ? _.chain(this.state.meals)
                    .groupBy(m => m.dateTimeCreated.toLocaleDateString())
                    .map((value, key) => ({
                      key: key,
                      content: (
                        <Col key={key} className="mb-4" xs={12} md={6}>
                          <Card className="text-center">
                            <Card.Header>{key}</Card.Header>
                            <Card.Body>
                              {_.chain(value)
                                .orderBy(meal => meal.dateTimeCreated.getTime())
                                .map((meal, index) => (
                                  <MealTileComponent
                                    key={index}
                                    meal={meal}
                                    onDelete={() =>
                                      this.setState(state => {
                                        return {
                                          meals: state.meals.filter(
                                            m => m !== meal
                                          )
                                        };
                                      })
                                    }
                                  ></MealTileComponent>
                                ))
                                .value()}
                            </Card.Body>
                          </Card>
                        </Col>
                      )
                    }))
                    .orderBy(p => p.key)
                    .map(p => p.content)
                    .value()
                : null}
            </Row>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(MealsPage);
