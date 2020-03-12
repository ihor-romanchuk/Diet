import { ThunkAction, ThunkDispatch } from "redux-thunk";
import JwtDecode from "jwt-decode";
import { IReduxBaseAction, EReduxActionTypes } from "../reducers/rootReducer";
import { IReduxUserState } from "../reducers/userReducer";
import JwtDto from "../../dtos/jwt";
import RoleEnum from "../../enums/role";

export interface IReduxRestoreAuthenticationAction extends IReduxBaseAction {
  type: EReduxActionTypes.RestoreAuthentication;
  isAuthenticated: boolean;
  token: string;
  roles: RoleEnum[];
}

export interface IReduxLoginAction extends IReduxBaseAction {
  type: EReduxActionTypes.Login;
  isAuthenticated: boolean;
  token: string;
  roles: RoleEnum[];
}

export interface IReduxLogoutAction extends IReduxBaseAction {
  type: EReduxActionTypes.Logout;
}

export function restoreAuthentication(): ThunkAction<
  Promise<IReduxRestoreAuthenticationAction>,
  IReduxUserState,
  undefined,
  IReduxRestoreAuthenticationAction
> {
  return async (
    dispatch: ThunkDispatch<
      IReduxUserState,
      undefined,
      IReduxRestoreAuthenticationAction
    >
  ) => {
    const token: string = sessionStorage.getItem("token");

    return dispatch({
      type: EReduxActionTypes.RestoreAuthentication,
      token: token,
      roles: getRolesFromJwt(token),
      isAuthenticated: !!token
    });
  };
}

export function login(
  jwt: JwtDto
): ThunkAction<
  Promise<IReduxLoginAction>,
  IReduxUserState,
  undefined,
  IReduxLoginAction
> {
  return async (
    dispatch: ThunkDispatch<IReduxUserState, undefined, IReduxLoginAction>
  ) => {
    sessionStorage.setItem("token", jwt.token);

    return dispatch({
      type: EReduxActionTypes.Login,
      token: jwt.token,
      roles: getRolesFromJwt(jwt.token),
      isAuthenticated: !!jwt.token
    });
  };
}

export function logout(): IReduxLogoutAction {
  //todo: call to logout on API
  sessionStorage.removeItem("token");
  return {
    type: EReduxActionTypes.Logout
  };
}

function getRolesFromJwt(token: string): RoleEnum[] {
  let roles = [];
  try {
    const jwtDecoded: any = JwtDecode(token);
    roles =
      jwtDecoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] || [];
    if (typeof roles === "string") {
      roles = [roles];
    }
  } catch (e) {}

  return roles;
}
