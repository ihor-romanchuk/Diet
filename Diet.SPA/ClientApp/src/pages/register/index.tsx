import React, { Component } from "react";

import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { login as loginRedux } from "../../redux/actions/userActions";

import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Router from "../../routing/router";

import { register } from "../../services/account";

import styles from "./index.module.scss";

interface IRegisterPageState {
  isLoading: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  errorMessages: any;
  validated: boolean;
}

type TRegisterPageProps = ReturnType<typeof mapDispatchToProps>;

class RegisterPage extends Component<TRegisterPageProps, IRegisterPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      errorMessages: {},
      validated: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event): Promise<void> {
    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
      event.preventDefault();
      event.stopPropagation();

      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        this.setState({ validated: false });

        try {
          let jwtDto = await register({
            email: this.state.email,
            password: this.state.password
          });

          this.props.loginRedux(jwtDto);
          Router.routes.meals.go();
        } catch (e) {
          this.setInvalidState(e);
        }

        this.setState({ isLoading: false });
      } else {
        this.setState({ validated: true, isLoading: false });
      }
    }
  }

  setInvalidState(data) {
    //todo: handle validation
    if (data.errors && data.errors.length > 0) {
      data.errors.map(e => {
        let newErrorMessages = { ...this.state.errorMessages };
        newErrorMessages[e.fieldName] = e.message;
        this.setState({ errorMessages: newErrorMessages });
      });
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Register</h1>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.handleSubmit}
        >
          <Form.Group as={Col} md={6}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={this.state.email}
              onChange={event =>
                this.setState({
                  email: event.target.value
                })
              }
              placeholder="Email..."
              required={true}
              isInvalid={this.state.errorMessages["Email"]}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errorMessages && this.state.errorMessages["Email"]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password..."
              value={this.state.password}
              onChange={event =>
                this.setState({
                  password: event.target.value
                })
              }
              required
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password..."
              value={this.state.password}
              onChange={event =>
                this.setState({
                  confirmPassword: event.target.value
                })
              }
              required
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Button
              disabled={this.state.isLoading}
              variant="success"
              type="submit"
            >
              Register
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      loginRedux
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(RegisterPage);
