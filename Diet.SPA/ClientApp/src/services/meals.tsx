import { get, post, put, del } from "../middlewares/apiMiddleware";
import MealDto from "../dtos/meal";

const url = "meals";

export async function getMeals(): Promise<MealDto[]> {
  return get(url);
}

export async function getMeal(id: number): Promise<MealDto> {
  return get(`${url}/id=${id}`);
}

export async function createMeal(meal: MealDto): Promise<void> {
  return post(url, meal);
}

export async function updateMeal(meal: MealDto): Promise<void> {
  return put(`${url}/id=${meal.id}`, meal);
}

export async function deleteMeal(id: number): Promise<void> {
  return del(`${url}/id=${id}`, {});
}
