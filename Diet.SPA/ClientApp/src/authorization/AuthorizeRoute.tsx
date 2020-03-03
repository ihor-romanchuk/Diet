import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { AppState } from "../redux/reducers/rootReducer";
import { setIsAuthenticated } from "../redux/actions/userActions";
import { Route, Redirect } from "react-router-dom";
import { ApplicationPaths, QueryParameterNames } from "./ApiAuthorizationConstants";
import authService from "./AuthorizeService";

class AuthorizeRoute extends Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> | any,
  {}
> {
  _subscription: number;

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.authenticationChanged());
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  render() {
    const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURI(window.location.href)}`;

    const { component: Component, isAuthenticated, ...rest } = this.props;
    if (isAuthenticated == null) {
      return <div></div>;
    }
    return (
      <Route
        {...rest}
        render={props => {
          if (isAuthenticated) {
            return <Component {...props} />;
          } else {
            return <Redirect to={redirectUrl} />;
          }
        }}
      />
    );
  }

  async populateAuthenticationState() {
    this.props.setIsAuthenticated();
  }

  async authenticationChanged() {
    await this.populateAuthenticationState();
  }
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.userReducer.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setIsAuthenticated
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorizeRoute);
