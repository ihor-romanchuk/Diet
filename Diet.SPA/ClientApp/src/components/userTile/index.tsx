import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import ConfirmationComponent from "../confirmation";
import Images from "../../assets/images/images";
import UserDto from "../../dtos/user";

import { deleteUser } from "../../services/users";

import Router from "../../routing/router";

import styles from "./index.module.scss";

interface IUserTileComponentProps {
  user: UserDto;
  onDelete: () => void;
}

interface IUserTileComponentState {
  isOptionsModalVisible: boolean;
  isConfirmationVisible: boolean;
}

class UserTileComponent extends Component<
  IUserTileComponentProps,
  IUserTileComponentState
> {
  constructor(props: IUserTileComponentProps) {
    super(props);

    this.state = {
      isOptionsModalVisible: false,
      isConfirmationVisible: false
    };
  }

  hideOptionsModal = () => {
    this.setState({ isOptionsModalVisible: false });
  };

  handleEditClick = () => {
    Router.routes.editUser.go({ id: this.props.user.id });
  };

  handleDeleteClick = () => {
    this.setState({ isConfirmationVisible: true });
  };

  delete = async () => {
    await deleteUser(this.props.user.id);
    this.hideOptionsModal();
    this.props.onDelete();
  };

  render() {
    return (
      <>
        <Card className={styles.container}>
          <div className={styles.info}>
            <Card.Body>
              <Card.Title className={styles.title}>
                {this.props.user.email}
              </Card.Title>
              <div className={styles.details}>
                {this.props.user.roles ? (
                  <>
                    <span>Roles:</span>
                    <span>{this.props.user.roles.join(", ")}</span>
                  </>
                ) : null}
              </div>
            </Card.Body>
          </div>
          <div className={styles.actions}>
            <Images.Options
              onClick={() =>
                this.setState({
                  isOptionsModalVisible: true
                })
              }
            ></Images.Options>
          </div>
        </Card>
        <Modal
          show={this.state.isOptionsModalVisible}
          className={styles.optionsModal}
          size="sm"
          centered
          onHide={this.hideOptionsModal}
        >
          <Modal.Body>
            <ListGroup>
              <ListGroup.Item
                action
                variant="light"
                className={styles.option}
                onClick={this.handleEditClick}
              >
                Edit user
              </ListGroup.Item>
              <ListGroup.Item action variant="danger" className={styles.option}>
                <div onClick={this.handleDeleteClick}>Delete user</div>
                <ConfirmationComponent
                  show={this.state.isConfirmationVisible}
                  onHide={() => this.setState({ isConfirmationVisible: false })}
                  message="Are you sure to delete this user?"
                  action={this.delete}
                ></ConfirmationComponent>
              </ListGroup.Item>
            </ListGroup>
          </Modal.Body>
          <Modal.Footer onClick={this.hideOptionsModal}>
            <Button variant="secondary">Cancel</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default UserTileComponent;
