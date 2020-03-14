import { IReduxBaseAction, EReduxActionTypes } from "../reducers/rootReducer";
import { IFilters } from "../reducers/mealReducer";

export interface IReduxSetMealFiltersAction extends IReduxBaseAction {
  type: EReduxActionTypes.SetMealFilters;
  filters: IFilters;
}

export function setMealFilters(filters: IFilters): IReduxSetMealFiltersAction {
  return {
    type: EReduxActionTypes.SetMealFilters,
    filters: filters
  };
}
