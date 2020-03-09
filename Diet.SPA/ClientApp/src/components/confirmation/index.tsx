import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import styles from "./index.module.scss";

interface ConfirmationComponentProps {
  show: boolean;
  message: string;
  action: () => Promise<any>;
  onHide: () => void;
}

interface ConfirmationComponentState {
  isLoading: boolean;
}

class ConfirmationComponent extends Component<
  ConfirmationComponentProps,
  ConfirmationComponentState
> {
  constructor(props: ConfirmationComponentProps) {
    super(props);

    this.state = {
      isLoading: false
    };

    this.handleAction = this.handleAction.bind(this);
  }

  handleAction() {
    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
      this.props.action().then(() => {
        this.setState({ isLoading: false });
        this.props.onHide();
      });
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Modal
          show={this.props.show}
          size="lg"
          centered
          onHide={this.props.onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.message}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            {this.state.isLoading ? (
              <Spinner
                variant="primary"
                animation="border"
                role="status"
              ></Spinner>
            ) : null}
            <Button
              variant="secondary"
              onClick={this.props.onHide}
              disabled={this.state.isLoading}
            >
              No
            </Button>
            <Button
              variant="primary"
              onClick={this.handleAction}
              disabled={this.state.isLoading}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ConfirmationComponent;
