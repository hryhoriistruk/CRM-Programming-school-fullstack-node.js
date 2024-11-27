import { Document } from "mongoose";

import { ERole } from "../enum/role.enums";

export interface IUser extends Document {
  name: string;
  email: string;
  role: ERole;
  password: string;
}
