import { combineReducers } from "redux";
import userReducer from "./userReducer";

export enum EReduxActionTypes {
  RestoreAuthentication = "RestoreAuthentication",
  Login = "Login",
  Logout = "Logout"
}

export interface IReduxBaseAction {
  type: EReduxActionTypes;
}

const rootReducer = combineReducers({
  userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
