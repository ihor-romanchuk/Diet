import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IReduxBaseAction, EReduxActionTypes } from "../reducers/rootReducer";
import { IReduxUserState } from "../reducers/userReducer";
import authService from "../../authorization/AuthorizeService";

export interface IReduxSetIsAuthenticatedAction extends IReduxBaseAction {
  type: EReduxActionTypes.SetIsAuthenticated;
  isAuthenticated: boolean;
}

export function setIsAuthenticated(): ThunkAction<
  Promise<IReduxSetIsAuthenticatedAction>,
  IReduxUserState,
  undefined,
  IReduxSetIsAuthenticatedAction
> {
  return async (dispatch: ThunkDispatch<IReduxUserState, undefined, IReduxSetIsAuthenticatedAction>) => {
    const isAuthenticated = await authService.isAuthenticated();

    return dispatch({
      type: EReduxActionTypes.SetIsAuthenticated,
      isAuthenticated: isAuthenticated
    });
  };
}
