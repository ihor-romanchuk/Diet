import { EReduxActionTypes } from "./rootReducer";
import {
  IReduxRestoreAuthenticationAction,
  IReduxLoginAction,
  IReduxLogoutAction
} from "../actions/userActions";

import RoleEnum from "../../enums/role";

export interface IReduxUserState {
  isAuthenticated: boolean;
  token: string;
  email: string;
  roles: RoleEnum[];
}

const initialState: IReduxUserState = {
  isAuthenticated: false,
  token: null,
  email: "",
  roles: []
};

type TUserReducerActions =
  | IReduxRestoreAuthenticationAction
  | IReduxLoginAction
  | IReduxLogoutAction;

export default function(
  state: IReduxUserState = initialState,
  action: TUserReducerActions
) {
  switch (action.type) {
    case EReduxActionTypes.RestoreAuthentication:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        token: action.token,
        email: action.email,
        roles: action.roles
      };
    case EReduxActionTypes.Login:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        token: action.token,
        email: action.email,
        roles: action.roles
      };
    case EReduxActionTypes.Logout:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
}
