import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/header";
import Body from "../components/body";
import NotFound from "../pages/notFound";
import Router from "./router";

import AuthorizeRoute from "../authentication/authorizeRoute";

const DefaultLayoutComponent = ({ component: Component, ...rest }) => {
  return (
    <>
      <Header></Header>
      <Body>
        <Component {...rest} />
      </Body>
    </>
  );
};

const DefaultLayoutRoute = ({
  component: Component,
  allowAnonymous,
  componentProps,
  ...rest
}) => {
  return allowAnonymous ? (
    <Route
      render={matchProps => (
        <DefaultLayoutComponent
          component={Component}
          {...componentProps}
          {...matchProps}
        ></DefaultLayoutComponent>
      )}
      {...rest}
    ></Route>
  ) : (
    <AuthorizeRoute
      component={matchProps => (
        <DefaultLayoutComponent
          component={Component}
          {...componentProps}
          {...matchProps}
        ></DefaultLayoutComponent>
      )}
      {...rest}
    />
  );
};

class Routes extends React.Component {
  public render() {
    return (
      <>
        <Switch>
          {Object.keys(Router.routes).map(key => (
            <DefaultLayoutRoute key={key} {...Router.routes[key].props} />
          ))}
          <DefaultLayoutRoute
            allowAnonymous={true}
            componentProps={{}}
            component={NotFound}
          />
        </Switch>
      </>
    );
  }
}

export default Routes;
