import { EReduxActionTypes } from "./rootReducer";
import { IReduxSetMealFiltersAction } from "../actions/mealActions";
import { IReduxLoginAction } from "../actions/userActions";

export interface IFilters {
  startDate?: Date;
  endDate?: Date;
  startTime?: Date;
  endTime?: Date;
}

export interface IReduxMealState {
  filters: IFilters;
}

const initialState: IReduxMealState = {
  filters: null
};

type TMealReducerActions = IReduxSetMealFiltersAction | IReduxLoginAction;

export default function(
  state: IReduxMealState = initialState,
  action: TMealReducerActions
) {
  switch (action.type) {
    case EReduxActionTypes.SetMealFilters:
      return {
        ...state,
        filters: action.filters
      };
    case EReduxActionTypes.Login:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
}
