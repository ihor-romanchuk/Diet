import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import _ from "lodash";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

import Router from "../../routing/router";

import { getMeals } from "../../services/meals";
import { getSetting } from "../../services/settings";
import MealDto from "../../dtos/meal";
import SettingTypeEnum from "../../enums/settingType";

import MealTileComponent from "../../components/mealTile";

import styles from "./index.module.scss";

interface IMealsPageState {
  isPageLoading: boolean;
  meals: MealDto[];
  caloriesPerDay: number;
}

class MealsPage extends Component<RouteComponentProps, IMealsPageState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      isPageLoading: true,
      meals: [],
      caloriesPerDay: null
    };
  }

  componentDidMount() {
    this.loadPageData();
  }

  loadPageData = async () => {
    await Promise.all([this.loadMeals(), this.loadSettings()]);
    this.setState({ isPageLoading: false });
  };

  async loadMeals(): Promise<void> {
    let meals = await getMeals();
    this.setState({
      meals: meals
    });
  }

  async loadSettings(): Promise<void> {
    let caloriesPerDaySetting = await getSetting(
      SettingTypeEnum.CaloriesPerDay
    );
    let caloriesPerDay = null;
    try {
      caloriesPerDay = parseInt(caloriesPerDaySetting.value);

      this.setState({
        caloriesPerDay: caloriesPerDay
      });
    } catch (e) {}
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
                    .map((value, key) => {
                      let doesFitCaloriesLimit: boolean =
                        _.chain(value)
                          .sumBy(v => v.calories)
                          .value() <= this.state.caloriesPerDay;
                      let border: "success" | "danger" | null = this.state
                        .caloriesPerDay
                        ? doesFitCaloriesLimit
                          ? "success"
                          : "danger"
                        : null;
                      return {
                        key: key,
                        content: (
                          <Col key={key} className="mb-4" xs={12} md={6}>
                            <Card className="text-center" border={border}>
                              <Card.Header>{key}</Card.Header>
                              <Card.Body>
                                {_.chain(value)
                                  .orderBy(meal =>
                                    meal.dateTimeCreated.getTime()
                                  )
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
                      };
                    })
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
