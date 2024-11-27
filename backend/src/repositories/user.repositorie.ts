import { FilterQuery } from "mongoose";

import { User } from "../models/users.models";
import { IUser } from "../types/users.types";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find({});
  }

  public async create(body: Partial<IUser>): Promise<any> {
    return await User.create(body);
  }

  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }
  public async getById(id: string): Promise<IUser> {
    return await User.findOne({ _id: id });
  }
  public async updateById(id: string, body: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(id, body, { returnDocument: "after" });
  }
  public async deleteById(id: string): Promise<void> {
    await User.deleteOne({ _id: id });
  }
}
export const userRepository = new UserRepository();
