import * as jwt from "jsonwebtoken";

import { configs } from "../config/configs";
import { ERole } from "../enum/role.enums";
import { ApiError } from "../errors/api.error";
import { IUser } from "../types/users.types";

export interface ITokenPayload {
  userId: string;
  role: ERole;
}

export interface ITokensPair {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

class TokenService {
  public generateTokenPair(payload: ITokenPayload, user: IUser): ITokensPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "4h",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
  public checkToken(token: string, type: "refresh" | "access"): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case "access":
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case "refresh":
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
