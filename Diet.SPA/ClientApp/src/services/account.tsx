import { post } from "../middlewares/apiMiddleware";
import JwtDto from "../dtos/jwt";
import LoginDto from "../dtos/login";
import RegisterDto from "../dtos/register";

const url = "account";

export async function login(loginData: LoginDto): Promise<JwtDto> {
  let actionUrl = `${url}/login`;
  return post(actionUrl, loginData);
}

export async function register(registerData: RegisterDto): Promise<JwtDto> {
  let actionUrl = `${url}/register`;
  return post(actionUrl, registerData);
}
