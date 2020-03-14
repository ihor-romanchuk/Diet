import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers/rootReducer";
import { Route } from "react-router-dom";
import Router from "../routing/router";

import RoleEnum from "../enums/role";

class AuthorizeRoute extends Component<
  ReturnType<typeof mapStateToProps> | any,
  {}
> {
  render() {
    const {
      component: Component,
      isAuthenticated,
      allowedRoles,
      ...rest
    } = this.props;

    if (isAuthenticated) {
      if (allowedRoles.some(r => this.props.roles.includes(r))) {
        return (
          <Route
            {...rest}
            render={props => {
              return <Component {...props} />;
            }}
          />
        );
      } else {
        if (
          this.props.roles.some(r =>
            [RoleEnum.Administrator, RoleEnum.User].includes(r)
          )
        ) {
          return (
            <Redirect to={Router.routes.meals.props.path as string}></Redirect>
          );
        } else {
          return (
            <Redirect to={Router.routes.users.props.path as string}></Redirect>
          );
        }
      }
    } else {
      return (
        <Redirect to={Router.routes.login.props.path as string}></Redirect>
      );
    }
  }
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
  roles: state.userReducer.roles
});

export default connect(mapStateToProps)(AuthorizeRoute);
