import { EReduxActionTypes } from "./rootReducer";
import {
  IReduxRestoreAuthenticationAction,
  IReduxLoginAction
} from "../actions/userActions";

export interface IReduxUserState {
  isAuthenticated: boolean;
  token: string;
}

const initialState: IReduxUserState = {
  isAuthenticated: false,
  token: null
};

type TUserReducerActions = IReduxRestoreAuthenticationAction &
  IReduxLoginAction;

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
    default:
      return state;
  }
}
