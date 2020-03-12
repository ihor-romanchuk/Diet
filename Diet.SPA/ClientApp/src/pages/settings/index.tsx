import React, { Component } from "react";

import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import ModificationState from "../../enums/modificationState";
import SettingType from "../../enums/settingType";
import {
  getSettings,
  createSetting,
  updateSetting
} from "../../services/settings";

import Router from "../../routing/router";

import styles from "./index.module.scss";

interface ISettingModel {
  type: SettingType;
  value: string;
  modificationState: ModificationState;
}

interface ISettingsPageState {
  isPageLoading: boolean;
  isSaving: boolean;
  validated: boolean;
  errorMessages: any;
  settings: ISettingModel[];
}

class SettingsPage extends Component<any, ISettingsPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isPageLoading: true,
      isSaving: false,
      validated: false,
      errorMessages: {},
      settings: [
        {
          type: SettingType.CaloriesPerDay,
          value: null,
          modificationState: ModificationState.Created
        }
      ]
    };
  }

  componentDidMount() {
    this.loadSettings();
  }

  loadSettings = async () => {
    try {
      let userSettings = await getSettings();
      this.setState(state => {
        return {
          settings: state.settings.map(s => {
            let setting = { ...s };
            let userSetting = userSettings.find(us => us.type === setting.type);
            if (userSetting) {
              setting.value = userSetting.value;
              setting.modificationState = ModificationState.Unmodified;
            }

            return setting;
          })
        };
      });
    } finally {
      this.setState({
        isPageLoading: false
      });
    }
  };

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

  handleSettingChange = (type: SettingType, e) => {
    const { value } = e.target;

    this.setState(state => ({
      settings: state.settings.map(s => {
        if (s.type === type) {
          s.value = value;
          if (s.modificationState === ModificationState.Unmodified) {
            s.modificationState = ModificationState.Modified;
          }
        }
        return s;
      })
    }));
  };

  handleSubmit = async (event): Promise<void> => {
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

          await Promise.all(
            this.state.settings
              .filter(
                s =>
                  s.modificationState === ModificationState.Created &&
                  s.value != null
              )
              .map(s => createSetting({ type: s.type, value: s.value }))
              .concat(
                this.state.settings
                  .filter(
                    s =>
                      s.modificationState === ModificationState.Modified &&
                      s.value != null
                  )
                  .map(s => updateSetting({ type: s.type, value: s.value }))
              )
          );

          Router.routes.meals.go();
        } catch (e) {
          this.setInvalidState(e);
        }

        this.setState({ isSaving: false });
      } else {
        this.setState({ validated: true, isSaving: false });
      }
    }
  };

  render() {
    const caloriesPerDaySetting = this.state.settings.find(
      s => s.type === SettingType.CaloriesPerDay
    );

    return (
      <div className={styles.container}>
        <h2>Settings</h2>
        {this.state.isPageLoading ? (
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
                <Form.Label>Calories per day:</Form.Label>
                <Form.Control
                  name="caloriesPerDay"
                  type="number"
                  placeholder="Calories per day..."
                  value={caloriesPerDaySetting.value}
                  onChange={e =>
                    this.handleSettingChange(SettingType.CaloriesPerDay, e)
                  }
                  required
                />
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

export default SettingsPage;
