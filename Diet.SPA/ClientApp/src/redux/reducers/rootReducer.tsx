import { combineReducers } from "redux";
import userReducer from "./userReducer";
import mealReducer from "./mealReducer";

export enum EReduxActionTypes {
  RestoreAuthentication = "RestoreAuthentication",
  Login = "Login",
  Logout = "Logout",
  SetMealFilters = "SetMealFilters"
}

export interface IReduxBaseAction {
  type: EReduxActionTypes;
}

const rootReducer = combineReducers({
  userReducer,
  mealReducer
});

export type AppState = ReturnType<typeof rootReducer> &
  ReturnType<typeof mealReducer>;

export default rootReducer;
