import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";

import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import RoleEnum from "../../enums/role";
import UserDto from "../../dtos/user";
import { getUser, createUser, updateUser } from "../../services/users";

import Router from "../../routing/router";

import styles from "./index.module.scss";

const emailValidationErrorMessage = "You should specify correct email";
const passwordValidationErrorMessage = "You should specify password";

interface IRouteParams {
  id: string;
}

interface IAddEditUserPageState {
  isPageLoading: boolean;
  isSaving: boolean;
  isEdit: boolean;
  showPasswordInput: boolean;
  errorMessages: any;
  generalErrorMessage: string;
  validated: boolean;
  user: UserDto;
}

class AddEditUserPage extends Component<
  RouteComponentProps<IRouteParams>,
  IAddEditUserPageState
> {
  constructor(props: any) {
    super(props);

    let id: string = this.props.match.params.id;
    let isEdit: boolean = !!id;

    this.state = {
      isPageLoading: true,
      isSaving: false,
      isEdit: isEdit,
      showPasswordInput: !isEdit,
      errorMessages: {},
      generalErrorMessage: "",
      validated: false,
      user: {
        id: id,
        email: "",
        password: "",
        roles: []
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    if (this.state.isEdit) {
      let user = await getUser(this.state.user.id);
      this.setState({
        user: user
      });
    }

    this.setState({
      isPageLoading: false
    });
  };

  async handleSubmit(event): Promise<void> {
    if (!this.state.isSaving) {
      this.setState({
        isSaving: true,
        generalErrorMessage: "",
        errorMessages: {}
      });
      event.preventDefault();
      event.stopPropagation();

      const form = event.currentTarget;
      if (form.checkValidity() === true && this.checkCheckBoxValidity()) {
        this.setState({ validated: false });

        try {
          this.setState({
            isSaving: true
          });

          if (this.state.isEdit) {
            await updateUser(this.state.user);
          } else {
            await createUser(this.state.user);
          }

          return Router.routes.users.go();
        } catch (e) {
          this.setInvalidState(e);
        }

        this.setState({ isSaving: false });
      } else {
        this.setState({ validated: true, isSaving: false });
      }
    }
  }

  checkCheckBoxValidity = (): boolean => {
    debugger;
    if (this.state.user.roles.length == 0) {
      this.setState({
        errorMessages: {
          ...this.state.errorMessages,
          roles: "You should set at least one role"
        }
      });
      return false;
    }
    return true;
  };

  setInvalidState(data) {
    if (data.errors && data.errors.length > 0) {
      data.errors.map(e => {
        let newErrorMessages = { ...this.state.errorMessages };
        newErrorMessages[e.fieldName] = e.message;
        this.setState({ errorMessages: newErrorMessages });
      });
    } else if (data.message) {
      this.setState({ generalErrorMessage: data.message });
    }
  }

  handleInput = e => {
    const { name, value } = e.target;

    this.setState(state => ({
      user: {
        ...state.user,
        [name]: value
      }
    }));
  };

  handleRolesChange = (role: RoleEnum) => {
    let { roles } = this.state.user;
    if (roles.includes(role)) {
      roles = roles.filter(r => r !== role);
    } else {
      roles.push(role);
    }

    this.setState(state => {
      return { user: { ...state.user, roles: roles } };
    });
  };

  render() {
    const userRoles = [
      {
        value: RoleEnum.User,
        label: "User"
      },
      {
        value: RoleEnum.Manager,
        label: "Manager"
      },
      {
        value: RoleEnum.Administrator,
        label: "Administrator"
      }
    ];

    return (
      <div className={styles.container}>
        <h2>{this.state.isEdit ? "Edit" : "Add"} user</h2>
        {this.state.isEdit && this.state.isPageLoading ? (
          <Spinner animation="border" role="status" variant="success">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.handleSubmit}
            >
              <div className={styles.generalErrorMessage}>
                {this.state.generalErrorMessage}
              </div>
              <Form.Row>
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email..."
                    value={this.state.user.email}
                    onChange={this.handleInput}
                    required
                    isInvalid={this.state.errorMessages["email"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {(this.state.errorMessages &&
                      this.state.errorMessages["email"]) ||
                      emailValidationErrorMessage}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} xs={12} md={6}>
                  {this.state.showPasswordInput ? (
                    <>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        autoComplete="off"
                        placeholder="Password..."
                        value={this.state.user.password || ""}
                        onChange={this.handleInput}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {(this.state.errorMessages &&
                          this.state.errorMessages["password"]) ||
                          passwordValidationErrorMessage}
                      </Form.Control.Feedback>
                    </>
                  ) : (
                    <Button
                      variant="outline-secondary"
                      onClick={() => this.setState({ showPasswordInput: true })}
                    >
                      Change password
                    </Button>
                  )}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label>Roles</Form.Label>
                  {userRoles.map((role, index) => {
                    return (
                      <Form.Check
                        id={role.value.toString()}
                        key={index}
                        type="checkbox"
                        label={role.label}
                        checked={this.state.user.roles.includes(role.value)}
                        onChange={() => this.handleRolesChange(role.value)}
                        isInvalid={this.state.errorMessages["roles"]}
                      ></Form.Check>
                    );
                  })}
                  <div className={styles.errorMessage}>
                    {this.state.errorMessages["roles"]}
                  </div>
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
          </>
        )}
      </div>
    );
  }
}

export default withRouter(AddEditUserPage);
