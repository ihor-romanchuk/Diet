import { RouteProps } from "react-router-dom";
import { formatRoute } from "react-router-named-routes";
import history from "../history";

import MealsPage from "../pages/meals";
import AddEditMealsPage from "../pages/addEditMeal";

import { Login } from "../authorization/Login";
import { Logout } from "../authorization/Logout";
import {
  ApplicationPaths,
  LoginActions,
  LogoutActions
} from "../authorization/ApiAuthorizationConstants";

interface CustomRouteProps extends RouteProps {
  allowAnonymous?: boolean;
  componentProps?: any;
}

class CustomRoute {
  public props: CustomRouteProps;

  constructor(props: CustomRouteProps) {
    this.props = props;
  }
}

class ParameterlessRoute extends CustomRoute {
  go(): void {
    history.push(this.props.path as string);
  }
}

class ParameterizedRoute<T> extends CustomRoute {
  go(
    params: T = null,
    queryParams?: any,
    rewriteHistory?: boolean,
    smartReloadEnabled: boolean = true
  ): void {
    let url: string = formatRoute(this.props.path, params);
    let needReload: boolean = url === window.location.pathname;
    if (queryParams) {
      url += `?${Object.keys(queryParams)
        .filter(
          key =>
            queryParams[key] != null &&
            (!Array.isArray(queryParams[key]) || queryParams[key].length > 0)
        )
        .map(key =>
          Array.isArray(queryParams[key])
            ? `${key}=${queryParams[key].join(",")}`
            : `${key}=${queryParams[key]}`
        )
        .join("&")}`;
    }

    if (rewriteHistory) {
      history.replace(url);
    } else {
      history.push(url);
    }

    if (smartReloadEnabled && needReload) {
      window.location.reload();
    }
  }
}

class Router {
  static get routes() {
    return {
      home: new ParameterizedRoute<{}>({
        path: "/",
        exact: true,
        component: MealsPage,
        allowAnonymous: true
      }),
      addMeal: new ParameterlessRoute({
        path: "/meals/add",
        exact: true,
        component: AddEditMealsPage
      }),
      editSneakers: new ParameterizedRoute<{ id: number }>({
        path: "/meals/edit/:id",
        exact: true,
        component: AddEditMealsPage
      }),
      login: new ParameterlessRoute({
        path: ApplicationPaths.Login,
        exact: true,
        component: Login,
        componentProps: {
          action: LoginActions.Login
        },
        allowAnonymous: true
      }),
      loginFailed: new ParameterlessRoute({
        path: ApplicationPaths.LoginFailed,
        exact: true,
        component: Login,
        componentProps: {
          action: LoginActions.LoginFailed
        },
        allowAnonymous: true
      }),
      loginCallback: new ParameterlessRoute({
        path: ApplicationPaths.LoginCallback,
        exact: true,
        component: Login,
        componentProps: {
          action: LoginActions.LoginCallback
        },
        allowAnonymous: true
      }),
      profile: new ParameterlessRoute({
        path: ApplicationPaths.Profile,
        exact: true,
        component: Login,
        componentProps: {
          action: LoginActions.Profile
        }
      }),
      register: new ParameterlessRoute({
        path: ApplicationPaths.Register,
        exact: true,
        component: Login,
        componentProps: {
          action: LoginActions.Register
        },
        allowAnonymous: true
      }),
      logOut: new ParameterlessRoute({
        path: ApplicationPaths.LogOut,
        exact: true,
        component: Logout,
        componentProps: {
          action: LogoutActions.Logout
        },
        allowAnonymous: true
      }),
      logOutCallback: new ParameterlessRoute({
        path: ApplicationPaths.LogOutCallback,
        exact: true,
        component: Logout,
        componentProps: {
          action: LogoutActions.LogoutCallback
        },
        allowAnonymous: true
      }),
      loggedOut: new ParameterlessRoute({
        path: ApplicationPaths.LoggedOut,
        exact: true,
        component: Logout,
        componentProps: {
          action: LogoutActions.LoggedOut
        },
        allowAnonymous: true
      })
    };
  }

  static goBack(): void {
    history.goBack();
  }

  static replace(url: string): void {
    history.replace(url);
  }

  static reload(): void {
    window.location.reload();
  }
}

export default Router;
