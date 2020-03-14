import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { AppState } from "../../redux/reducers/rootReducer";
import _ from "lodash";

import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import DatePicker from "react-datepicker";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

import { setMealFilters } from "../../redux/actions/mealActions";
import { IFilters } from "../../redux/reducers/mealReducer";

import Router from "../../routing/router";

import { getMeals } from "../../services/meals";
import { getSetting } from "../../services/settings";
import MealDto from "../../dtos/meal";
import SettingTypeEnum from "../../enums/settingType";

import MealTileComponent from "../../components/mealTile";

import { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-US";

import Images from "../../assets/images/images";
import styles from "./index.module.scss";

registerLocale("en-US", en);

interface IMealsPageState {
  isPageLoading: boolean;
  filters: IFilters;
  meals: MealDto[];
  caloriesPerDay: number;
  validated: boolean;
}

type TMealsPageProps = RouteComponentProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class MealsPage extends Component<TMealsPageProps, IMealsPageState> {
  constructor(props: TMealsPageProps) {
    super(props);

    this.state = {
      isPageLoading: true,
      filters: this.props.filters || this.getDefaultFilters(),
      meals: [],
      caloriesPerDay: null,
      validated: false
    };
  }

  componentDidMount() {
    this.loadPageData();
  }

  componentWillUnmount() {
    this.props.setMealFilters(this.state.filters);
  }

  getDefaultFilters = (): IFilters => {
    let lastMidnight = new Date();
    lastMidnight.setHours(0, 0, 0, 0);
    let nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);
    nextMidnight.setMilliseconds(-1);

    return {
      startDate: lastMidnight,
      endDate: nextMidnight,
      startTime: lastMidnight,
      endTime: lastMidnight
    };
  };

  loadPageData = async () => {
    await Promise.all([this.loadMeals(), this.loadSettings()]);
    this.setState({ isPageLoading: false });
  };

  loadMeals = async (): Promise<void> => {
    let meals = await getMeals(
      this.state.filters.startDate,
      this.state.filters.endDate,
      this.state.filters.startTime,
      this.state.filters.endTime
    );
    this.setState({
      meals: meals
    });
  };

  loadSettings = async (): Promise<void> => {
    try {
      let caloriesPerDaySetting = await getSetting(
        SettingTypeEnum.CaloriesPerDay
      );
      let caloriesPerDay = null;

      caloriesPerDay = parseInt(caloriesPerDaySetting.value);

      this.setState({
        caloriesPerDay: caloriesPerDay
      });
    } catch (e) {}
  };

  applyFilters = async event => {
    if (!this.state.isPageLoading) {
      this.setState({ isPageLoading: true });
      event.preventDefault();
      event.stopPropagation();

      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        this.setState({ validated: false });

        try {
          await this.loadMeals();
        } catch (e) {}
      } else {
        this.setState({ validated: true });
      }

      this.setState({ isPageLoading: false });
    }
  };

  resetFilters = () => {
    this.setState(
      {
        filters: this.getDefaultFilters()
      },
      async () => {
        this.setState({
          isPageLoading: true
        });
        await this.loadMeals();
        this.setState({
          isPageLoading: false
        });
      }
    );
  };

  render() {
    var maxTime = new Date();
    maxTime.setHours(24, 0, 0, 0);
    maxTime.setMilliseconds(-1);

    return (
      <div className={styles.container}>
        <Accordion>
          <Card className={styles.filters}>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <div className={styles.filtersToggle}>
                <span>Filters</span>
                <Images.ArrowBottom
                  className={styles.arrowBottom}
                ></Images.ArrowBottom>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form
                  noValidate
                  validated={this.state.validated}
                  onSubmit={this.applyFilters}
                >
                  <Form.Row>
                    <Form.Group as={Col} xs={12} md={6}>
                      <Form.Label>Start date:</Form.Label>
                      <DatePicker
                        locale="en-US"
                        dateFormat="P"
                        className="form-control"
                        wrapperClassName={styles.calendar}
                        selected={this.state.filters.startDate}
                        onChange={date => {
                          this.setState(state => {
                            return {
                              filters: {
                                ...state.filters,
                                startDate: date || state.filters.startDate,
                                endDate:
                                  _.max([date, state.filters.endDate]) ||
                                  state.filters.endDate
                              }
                            };
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6}>
                      <Form.Label>End date:</Form.Label>
                      <DatePicker
                        locale="en-US"
                        dateFormat="P"
                        className="form-control"
                        minDate={this.state.filters.startDate}
                        wrapperClassName={styles.calendar}
                        selected={this.state.filters.endDate}
                        onChange={date => {
                          this.setState(state => {
                            return {
                              filters: {
                                ...state.filters,
                                endDate: date || state.filters.endDate
                              }
                            };
                          });
                        }}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} xs={12} md={6}>
                      <Form.Label>Start time:</Form.Label>
                      <DatePicker
                        locale="en-US"
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeFormat="p"
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="form-control"
                        wrapperClassName={styles.calendar}
                        selected={this.state.filters.startTime}
                        onChange={time => {
                          this.setState(state => {
                            return {
                              filters: {
                                ...state.filters,
                                startTime: time || state.filters.startTime,
                                endTime:
                                  _.max([time, state.filters.endTime]) ||
                                  state.filters.endTime
                              }
                            };
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6}>
                      <Form.Label>End time:</Form.Label>
                      <DatePicker
                        locale="en-US"
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeFormat="p"
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="form-control"
                        minTime={this.state.filters.startTime}
                        maxTime={maxTime}
                        wrapperClassName={styles.calendar}
                        selected={this.state.filters.endTime}
                        onChange={time => {
                          this.setState(state => {
                            return {
                              filters: {
                                ...state.filters,
                                endTime: time || state.filters.endTime
                              }
                            };
                          });
                        }}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md={6}>
                      {this.state.isPageLoading ? (
                        <Spinner
                          variant="success"
                          animation="border"
                          role="status"
                        ></Spinner>
                      ) : null}
                      <Button
                        disabled={this.state.isPageLoading}
                        variant="success"
                        type="submit"
                      >
                        Apply
                      </Button>
                      <Button
                        onClick={this.resetFilters}
                        disabled={this.state.isPageLoading}
                        variant="secondary"
                        className="ml-2"
                      >
                        Reset
                      </Button>
                    </Form.Group>
                  </Form.Row>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        {this.state.isPageLoading ? (
          <Spinner animation="border" role="status" variant="success">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <>
            <Row>
              <Form.Group as={Col} md={6}>
                <Button
                  className="mt-4"
                  variant="success"
                  onClick={() => Router.routes.addMeal.go()}
                >
                  Add meal
                </Button>
              </Form.Group>
            </Row>
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

const mapStateToProps = (state: AppState) => ({
  filters: state.mealReducer.filters
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    setMealFilters: (filters: IFilters) => dispatch(setMealFilters(filters))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MealsPage));
