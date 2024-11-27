import { Types } from "mongoose";

import { adminConfig } from "../config/admin.config";
import { ERole } from "../enum/role.enums";
import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/tokken.repository";
import { userRepository } from "../repositories/user.repositorie";
import { ILogin } from "../types/auth.type";
import { IUser } from "../types/users.types";
import { passwordService } from "./password.services";
import { ITokenPayload, ITokensPair, tokenService } from "./tokken.service";

class AuthServices {
  public async signUpAdmin(): Promise<IUser> {
    const adminUser = await userRepository.getOneByParams({
      role: adminConfig.ADMIN_ROLE,
    });

    if (adminUser) {
      return adminUser;
    }
    const dto = {
      name: adminConfig.ADMIN_NAME,
      email: adminConfig.ADMIN_EMAIL,
      password: adminConfig.ADMIN_PASSWORD,
    };

    const userFromDb = await userRepository.getOneByParams({
      email: dto.email,
    });
    if (userFromDb) {
      throw new ApiError("User with provided email already exists", 400);
    }

    const hashedPassword = await passwordService.hash(dto.password);

    return await userRepository.create({
      ...dto,
      password: hashedPassword,
      role: ERole.ADMIN,
    });
  }

  public async signUp(dto: Partial<IUser>): Promise<IUser> {
    const hashedPassword = await passwordService.hash(dto.password);
    return await userRepository.create({
      ...dto,
      password: hashedPassword,
      role: ERole.USER,
    });
  }

  public async signIn(dto: ILogin): Promise<ITokensPair> {
    const user = await userRepository.getOneByParams({ email: dto.email });
    if (!user) throw new ApiError("Not valid email or password", 401);

    const isMatch = await passwordService.compare(dto.password, user.password);
    if (!isMatch) throw new ApiError("Not valid email or password", 401);

    const jwtTokens = tokenService.generateTokenPair(
      {
        userId: user.id,
        role: user.role,
      },
      user,
    );
    await tokenRepository.create({ ...jwtTokens, _userId: user.id });
    return jwtTokens;
  }

  public async refresh(
    jwtPayload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokensPair> {
    await tokenRepository.deleteOneByParams({ refreshToken });

    // Знайдемо користувача за userId
    const user = await userRepository.getOneByParams({ id: jwtPayload.userId });
    if (!user) throw new ApiError("User not found", 404); // Перевірка на наявність користувача

    const jwtTokens = tokenService.generateTokenPair(
      {
        userId: jwtPayload.userId,
        role: jwtPayload.role,
      },
      user, // Додаємо користувача в якості другого аргументу
    );

    await tokenRepository.create({
      ...jwtTokens,
      _userId: new Types.ObjectId(jwtPayload.userId),
    });

    return jwtTokens;
  }
}

export const authservice = new AuthServices();
