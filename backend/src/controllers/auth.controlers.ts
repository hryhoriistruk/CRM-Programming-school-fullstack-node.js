import { NextFunction, Request, Response } from "express";

import { authservice } from "../services/auth.services";
import { ITokenPayload } from "../services/tokken.service";
import { ILogin } from "../types/auth.type";
import { IUser } from "../types/users.types";

class AuthController {
  public async signUpAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const createdUser = await authservice.signUpAdmin();

      return res.json({ data: createdUser });
    } catch (e) {
      next(e);
    }
  }
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as IUser;
      const createdUser = await authservice.signUp(body);

      return res.json({ data: createdUser });
    } catch (e) {
      next(e);
    }
  }
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as ILogin;
      const jwtTokens = await authservice.signIn(body);

      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }
  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const refreshToken = req.res.locals.refreshToken as string;

      const jwtTokens = await authservice.refresh(jwtPayload, refreshToken);

      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
