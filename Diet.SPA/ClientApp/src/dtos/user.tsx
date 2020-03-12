import RoleEnum from "../enums/role";

export default interface IUserDto {
  id?: string;
  email: string;
  password?: string;
  roles: RoleEnum[];
}
