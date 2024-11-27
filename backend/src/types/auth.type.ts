import { ERole } from "../enum/role.enums";

export interface IEmail {
  email: string;
}

export interface ILogin extends IEmail {
  password: string;
  role: ERole;
}
