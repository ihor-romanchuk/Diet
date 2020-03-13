import React, { Component } from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { AppState } from "../../redux/reducers/rootReducer";
import { logout } from "../../redux/actions/userActions";

import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import IAccountDto from "../../dtos/account";
import { update } from "../../services/account";

import styles from "./index.module.scss";

interface IAccountPageState {
  isPageLoading: boolean;
  isSaving: boolean;
  showPasswordInput: boolean;
  errorMessages: any;
  validated: boolean;
  account: IAccountDto;
}

type TAccountPageProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class AccountPage extends Component<TAccountPageProps, IAccountPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isPageLoading: true,
      isSaving: false,
      showPasswordInput: false,
      errorMessages: {},
      validated: false,
      account: {
        email: this.props.email,
        password: ""
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      isPageLoading: false
    });
  }

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

          await update(this.state.account);

          this.props.logout();
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
      data.errors.foreach(e => {
        let newErrorMessages = { ...this.state.errorMessages };
        newErrorMessages[e.fieldName] = e.message;
        this.setState({ errorMessages: newErrorMessages });
      });
    }
  }

  handleInput = e => {
    const { name, value } = e.target;

    this.setState(state => ({
      account: {
        ...state.account,
        [name]: value
      }
    }));
  };

  render() {
    return (
      <div className={styles.container}>
        <h2>Manage account</h2>
        {this.state.isPageLoading ? (
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
                    value={this.state.account.email}
                    onChange={this.handleInput}
                    required
                  />
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
                        value={this.state.account.password}
                        onChange={this.handleInput}
                        required
                      />
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

const mapStateToProps = (state: AppState) => ({
  email: state.userReducer.email
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
