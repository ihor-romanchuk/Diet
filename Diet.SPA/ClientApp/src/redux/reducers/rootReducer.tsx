import { combineReducers } from "redux";
import userReducer from "./userReducer";

export enum EReduxActionTypes {
  SetIsAuthenticated = "SetIsAuthenticated"
}

export interface IReduxBaseAction {
  type: EReduxActionTypes;
}

const rootReducer = combineReducers({
  userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
