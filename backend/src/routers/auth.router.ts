import { Router } from "express";

import { authController } from "../controllers/auth.controlers";
import { authMiddleware } from "../middlewares/auth.middlewares";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authorization
 *   description: User authorization and authentication endpoints
 */

/**
 * @swagger
 * /auth/admin/sign-up:
 *   post:
 *     summary: Sign up as admin
 *     description: Реєстрація адміністратора.
 *     tags: [Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminCredentials'
 *     responses:
 *       200:
 *         description: Авторизація пройшла успішно.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin signed in successfully"
 */
router.post("/admin/sin-up", authController.signUpAdmin);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User registration
 *     description: Реєстрація нового користувача.
 *     tags: [Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCredentials'
 *     responses:
 *       201:
 *         description: Користувач зареєстрований успішно.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 */
router.post("/signup", authController.signUp);

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: User login
 *     description: Авторизація користувача.
 *     tags: [Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCredentials'
 *     responses:
 *       200:
 *         description: Авторизація пройшла успішно.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User signed in successfully"
 */
router.post("/sign-in", authController.signIn);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh token
 *     description: Оновлення токена користувача.
 *     tags: [Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         description: Токен оновлено успішно.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                    $ref: '#/components/schemas/Token'
 *                   example: "newAccessTokenExample"
 */
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

export const authRouter = router;
