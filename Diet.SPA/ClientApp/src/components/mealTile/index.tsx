import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import ConfirmationComponent from "../confirmation";
import Images from "../../assets/images/images";
import MealDto from "../../dtos/meal";

import { deleteMeal } from "../../services/meals";

import Router from "../../routing/router";

import styles from "./index.module.scss";

interface IMealTileComponentProps {
  meal: MealDto;
  onDelete: () => void;
}

interface IMealTileComponentState {
  isOptionsModalVisible: boolean;
  isConfirmationVisible: boolean;
}

class MealTileComponent extends Component<
  IMealTileComponentProps,
  IMealTileComponentState
> {
  constructor(props: IMealTileComponentProps) {
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
    Router.routes.editMeal.go({ id: this.props.meal.id });
  };

  handleDeleteClick = () => {
    this.setState({ isConfirmationVisible: true });
  };

  delete = async () => {
    await deleteMeal(this.props.meal.id);
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
                {this.props.meal.name}
              </Card.Title>
              <div className={styles.details}>
                <b>{this.props.meal.calories} kkal</b>
                <span>
                  {this.props.meal.dateTimeCreated.toLocaleTimeString("en-US")}
                </span>
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
                Edit meal
              </ListGroup.Item>
              <ListGroup.Item action variant="danger" className={styles.option}>
                <div onClick={this.handleDeleteClick}>Delete meal</div>
                <ConfirmationComponent
                  show={this.state.isConfirmationVisible}
                  onHide={() => this.setState({ isConfirmationVisible: false })}
                  message="Are you sure to delete this meal?"
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

export default MealTileComponent;
