import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";

import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-US";

import MealDto from "../../dtos/meal";
import { getMeal, createMeal, updateMeal } from "../../services/meals";

import Router from "../../routing/router";

import styles from "./index.module.scss";
registerLocale("en-US", en);

const nameValidationErrorMessage = "Meal name can't be empty";
const caloriesValidationErrorMessage = "You should specify number of calories";

interface IRouteParams {
  id: string;
}

interface IAddEditMealPageState {
  isPageLoading: boolean;
  isSaving: boolean;
  isEdit: boolean;
  errorMessages: any;
  validated: boolean;
  meal: MealDto;
}

class AddEditMealPage extends Component<
  RouteComponentProps<IRouteParams>,
  IAddEditMealPageState
> {
  constructor(props: any) {
    super(props);

    let id: number = 0;
    try {
      id = parseInt(this.props.match.params.id) || 0;
    } catch (e) {}

    this.state = {
      isPageLoading: true,
      isSaving: false,
      isEdit: !!id,
      errorMessages: {},
      validated: false,
      meal: {
        id: id,
        name: "",
        calories: 0,
        dateTimeCreated: new Date()
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadMeal();
  }

  loadMeal = async () => {
    if (this.state.isEdit) {
      let meal = await getMeal(this.state.meal.id);
      this.setState({
        meal: meal
      });
    }

    this.setState({
      isPageLoading: false
    });
  };

  async handleSubmit(event): Promise<void> {
    if (!this.state.isSaving) {
      this.setState({ isSaving: true });
      this.setState({ errorMessages: [] });
      event.preventDefault();
      event.stopPropagation();
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        this.setState({ validated: false });

        try {
          this.setState({
            isSaving: true
          });

          if (this.state.isEdit) {
            await updateMeal(this.state.meal);
          } else {
            await createMeal(this.state.meal);
          }

          return Router.routes.meals.go();
        } catch (e) {
          this.setInvalidState(e);
        }

        this.setState({ isSaving: false });
      } else {
        this.setState({ validated: true, isSaving: false });
      }
    }
  }

  setInvalidState(data) {
    //todo
    if (data.errors && data.errors.length > 0) {
      data.errors.map(e => {
        let newErrorMessages = { ...this.state.errorMessages };
        newErrorMessages[e.fieldName] = e.message;
        this.setState({ errorMessages: newErrorMessages });
      });
    }
  }

  handleInput = e => {
    const { name, value } = e.target;

    this.setState(state => ({
      meal: {
        ...state.meal,
        [name]: value
      }
    }));
  };

  render() {
    return (
      <div className={styles.container}>
        {this.state.isEdit && this.state.isPageLoading ? (
          <Spinner animation="border" role="status" variant="success">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Form
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleSubmit}
          >
            <Form.Row>
              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Name..."
                  value={this.state.meal.name}
                  onChange={this.handleInput}
                  required
                  isInvalid={this.state.errorMessages["Name"]}
                />
                <Form.Control.Feedback type="invalid">
                  {nameValidationErrorMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label>Calories</Form.Label>
                <Form.Control
                  type="number"
                  name="calories"
                  min="0"
                  pattern="[0-9]*"
                  placeholder="Calories..."
                  value={(this.state.meal.calories || "").toString()}
                  onChange={this.handleInput}
                  required
                  isInvalid={this.state.errorMessages["Calories"]}
                />
                <Form.Control.Feedback type="invalid">
                  {(this.state.errorMessages &&
                    this.state.errorMessages["Calories"]) ||
                    caloriesValidationErrorMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label>Date {"&"} Time</Form.Label>
                <DatePicker
                  locale="en-US"
                  showTimeSelect
                  timeFormat="p"
                  timeIntervals={15}
                  dateFormat="Pp"
                  timeCaption="time"
                  className="form-control"
                  wrapperClassName={styles.calendar}
                  selected={this.state.meal.dateTimeCreated}
                  onChange={date => {
                    this.setState(state => {
                      return { meal: { ...state.meal, dateTimeCreated: date } };
                    });
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {(this.state.errorMessages &&
                    this.state.errorMessages["DateTimeCreated"]) ||
                    "You should dpecify date"}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={6}>
                {this.state.isSaving ? (
                  <Spinner
                    variant="success"
                    animation="border"
                    role="status"
                  ></Spinner>
                ) : null}
                <Button
                  disabled={this.state.isSaving}
                  variant="success"
                  type="submit"
                >
                  Save
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        )}
      </div>
    );
  }
}

export default withRouter(AddEditMealPage);
