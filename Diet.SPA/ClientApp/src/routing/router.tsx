import { RouteProps } from "react-router-dom";
import { formatRoute } from "react-router-named-routes";
import history from "../history";

import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import MealsPage from "../pages/meals";
import AddEditMealPage from "../pages/addEditMeal";

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
      meals: new ParameterlessRoute({
        path: "/",
        exact: true,
        component: MealsPage,
        allowAnonymous: false
      }),
      addMeal: new ParameterlessRoute({
        path: "/meals/add",
        exact: true,
        component: AddEditMealPage,
        allowAnonymous: false
      }),
      editMeal: new ParameterizedRoute<{ id: number }>({
        path: "/meals/edit/:id",
        exact: true,
        component: AddEditMealPage,
        allowAnonymous: false
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
