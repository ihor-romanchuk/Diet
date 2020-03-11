import { EReduxActionTypes } from "./rootReducer";
import {
  IReduxRestoreAuthenticationAction,
  IReduxLoginAction,
  IReduxLogoutAction
} from "../actions/userActions";

export interface IReduxUserState {
  isAuthenticated: boolean;
  token: string;
}

const initialState: IReduxUserState = {
  isAuthenticated: false,
  token: null
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
        token: action.token
      };
    case EReduxActionTypes.Login:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        token: action.token
      };
    case EReduxActionTypes.Logout:
      return {
        ...state,
        isAuthenticated: false,
        token: null
      };
    default:
      return state;
  }
}
