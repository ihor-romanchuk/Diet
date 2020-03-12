import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import UserTile from "../../components/userTile";

import UserDto from "../../dtos/user";
import { getUsers } from "../../services/users";

import Router from "../../routing/router";

import styles from "./index.module.scss";

interface IUsersPageState {
  isPageLoading: boolean;
  users: UserDto[];
}

class UsersPage extends Component<any, IUsersPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isPageLoading: true,
      users: []
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    try {
      let users = await getUsers();

      this.setState({
        users: users
      });
    } catch (e) {
      //todo
    } finally {
      this.setState({
        isPageLoading: false
      });
    }
  };

  render() {
    return (
      <div className={styles.container}>
        {this.state.isPageLoading ? (
          <Spinner animation="border" role="status" variant="success">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <>
            <h1>Users</h1>
            <Button
              variant="success"
              onClick={() => Router.routes.addUser.go()}
            >
              Add user
            </Button>
            <Row className="mt-4">
              {this.state.users.map((user, index) => (
                <Col key={index} className="mb-4" xs={12} md={6}>
                  <UserTile
                    user={user}
                    onDelete={() =>
                      this.setState(state => {
                        return {
                          users: state.users.filter(u => u !== user)
                        };
                      })
                    }
                  ></UserTile>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    );
  }
}

export default UsersPage;
