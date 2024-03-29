import { RouteProps } from "react-router-dom";
import { formatRoute } from "react-router-named-routes";
import history from "../history";

import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import MealsPage from "../pages/meals";
import AddEditMealPage from "../pages/addEditMeal";
import SettingsPage from "../pages/settings";
import UsersPage from "../pages/users";
import AddEditUserPage from "../pages/addEditUser";
import AccountPage from "../pages/account";

import RoleEnum from "../enums/role";

interface CustomRouteProps extends RouteProps {
  allowAnonymous?: boolean;
  allowedRoles?: RoleEnum[];
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
      meals: new ParameterlessRoute({
        path: "/",
        exact: true,
        component: MealsPage,
        allowAnonymous: false,
        allowedRoles: [RoleEnum.Administrator, RoleEnum.User]
      }),
      addMeal: new ParameterlessRoute({
        path: "/meals/add",
        exact: true,
        component: AddEditMealPage,
        allowAnonymous: false,
        allowedRoles: [RoleEnum.Administrator, RoleEnum.User]
      }),
      editMeal: new ParameterizedRoute<{ id: number }>({
        path: "/meals/edit/:id",
        exact: true,
        component: AddEditMealPage,
        allowAnonymous: false,
        allowedRoles: [RoleEnum.Administrator, RoleEnum.User]
      }),
      settings: new ParameterlessRoute({
        path: "/settings",
        exact: true,
        component: SettingsPage,
        allowAnonymous: false,
        allowedRoles: [RoleEnum.Administrator, RoleEnum.User]
      }),
      users: new ParameterlessRoute({
        path: "/users",
        exact: true,
        component: UsersPage,
        allowAnonymous: false,
        allowedRoles: [RoleEnum.Administrator, RoleEnum.Manager]
      }),
      addUser: new ParameterlessRoute({
        path: "/users/add",
        exact: true,
        component: AddEditUserPage,
        allowAnonymous: false,
        allowedRoles: [RoleEnum.Administrator, RoleEnum.Manager]
      }),
      editUser: new ParameterizedRoute<{ id: string }>({
        path: "/users/edit/:id",
        exact: true,
        component: AddEditUserPage,
        allowAnonymous: false,
        allowedRoles: [RoleEnum.Administrator, RoleEnum.Manager]
      }),
      login: new ParameterlessRoute({
        path: "/login",
        exact: true,
        component: LoginPage,
        allowAnonymous: true
      }),
      register: new ParameterlessRoute({
        path: "/register",
        exact: true,
        component: RegisterPage,
        allowAnonymous: true
      }),
      account: new ParameterlessRoute({
        path: "/account",
        exact: true,
        component: AccountPage,
        allowAnonymous: false,
        allowedRoles: [RoleEnum.Administrator, RoleEnum.Manager, RoleEnum.User]
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
