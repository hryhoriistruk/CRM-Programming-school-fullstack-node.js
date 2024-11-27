import { Router } from "express";

import { ordersController } from "../controllers/orders.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders, including retrieving and updating order numbering.
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Отримати всі замовлення з пагінацією
 *     description: Повертає список замовлень з підтримкою пагінації
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Успішний запит. Повертає масив замовлень.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("", ordersController.getAllPaginate);

/**
 * @swagger
 * /orders/updatenumber:
 *   post:
 *     summary: Оновлення нумерації замовлень
 *     description: Оновлює дані всіх замовлень, включаючи нумерацію
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Успішне оновлення.
 *       400:
 *         description: Невірний запит.
 */
router.post("/updatenumber", ordersController.getAll);

export const orderRouter = router;
