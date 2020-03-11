import { get, post, put, del } from "../middlewares/apiMiddleware";
import UserDto from "../dtos/user";

const url = "users";

export async function getUsers(): Promise<UserDto[]> {
  return get(url);
}

export async function getUser(id: string): Promise<UserDto> {
  return get(`${url}/${id}`);
}

export async function createUser(user: UserDto): Promise<void> {
  return post(url, user);
}

export async function updateUser(user: UserDto): Promise<void> {
  return put(`${url}/${user.id}`, user);
}

export async function deleteUser(id: string): Promise<void> {
  return del(`${url}/${id}`, {});
}
