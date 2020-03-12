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

interface IRouteParams {
  id: string;
}

interface IAddEditUserPageState {
  isPageLoading: boolean;
  isSaving: boolean;
  isEdit: boolean;
  errorMessages: any;
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

    this.state = {
      isPageLoading: true,
      isSaving: false,
      isEdit: !!id,
      errorMessages: {},
      validated: false,
      user: {
        id: id,
        email: "",
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
      this.setState({ isSaving: true });
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
            await updateUser(this.state.user);
          } else {
            await createUser(this.state.user);
          }

          Router.routes.users.go();
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
                  />
                </Form.Group>
              </Form.Row>
              {!this.state.isEdit ? (
                <Form.Row>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Password..."
                      value={this.state.user.password}
                      onChange={this.handleInput}
                      required
                    />
                  </Form.Group>
                </Form.Row>
              ) : null}
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
                      ></Form.Check>
                    );
                  })}
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
