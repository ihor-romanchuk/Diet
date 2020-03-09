import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IReduxBaseAction, EReduxActionTypes } from "../reducers/rootReducer";
import { IReduxUserState } from "../reducers/userReducer";
import JwtDto from "../../dtos/jwt";

export interface IReduxRestoreAuthenticationAction extends IReduxBaseAction {
  type: EReduxActionTypes.RestoreAuthentication;
  isAuthenticated: boolean;
  token: string;
}

export interface IReduxLoginAction extends IReduxBaseAction {
  type: EReduxActionTypes.Login;
  isAuthenticated: boolean;
  token: string;
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
      isAuthenticated: !!jwt.token
    });
  };
}
