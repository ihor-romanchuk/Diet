import { get, post, put, del } from "../middlewares/apiMiddleware";
import MealDto from "../dtos/meal";

const url = "meals";

export async function getMeals(): Promise<MealDto[]> {
  let meals: MealDto[] = await get(url);
  meals.forEach(meal => {
    meal.dateTimeCreated = new Date(`${meal.dateTimeCreated}Z`);
  });
  return meals;
}

export async function getMeal(id: number): Promise<MealDto> {
  let meal: MealDto = await get(`${url}/${id}`);
  meal.dateTimeCreated = new Date(`${meal.dateTimeCreated}Z`);
  return meal;
}

export async function createMeal(meal: MealDto): Promise<void> {
  return post(url, meal);
}

export async function updateMeal(meal: MealDto): Promise<void> {
  return put(`${url}/${meal.id}`, meal);
}

export async function deleteMeal(id: number): Promise<void> {
  return del(`${url}/${id}`, {});
}
