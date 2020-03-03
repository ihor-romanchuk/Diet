import { EReduxActionTypes } from "./rootReducer";
import { IReduxSetIsAuthenticatedAction } from "../actions/userActions";

export interface IReduxUserState {
  isAuthenticated: boolean;
}

const initialState: IReduxUserState = {
  isAuthenticated: null
};

type TUserReducerActions = IReduxSetIsAuthenticatedAction;

export default function(state: IReduxUserState = initialState, action: TUserReducerActions) {
  switch (action.type) {
    case EReduxActionTypes.SetIsAuthenticated:
      return { ...state, isAuthenticated: action.isAuthenticated };
    default:
      return state;
  }
}
