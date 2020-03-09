import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers/rootReducer";
import { Route } from "react-router-dom";
import Router from "../routing/router";

class AuthorizeRoute extends Component<
  ReturnType<typeof mapStateToProps> | any,
  {}
> {
  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    if (isAuthenticated) {
      return (
        <Route
          {...rest}
          render={props => {
            return <Component {...props} />;
          }}
        />
      );
    } else {
      Router.routes.login.go();
      return null;
    }
  }
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.userReducer.isAuthenticated
});

export default connect(mapStateToProps)(AuthorizeRoute);
