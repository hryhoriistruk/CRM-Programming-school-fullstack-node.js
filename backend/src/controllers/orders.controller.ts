import { NextFunction, Request, Response } from "express";

import { orderServices } from "../services/orders.services";
import {IQuery} from "../types/pagination.type";

class OrdersController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderServices.getAll();
      return res.json({ data: orders });
    } catch (e) {
      next(e);
    }
  }
  public async getAllPaginate(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const ordersPagination = await orderServices.getMany(query as IQuery);
      return res.json(ordersPagination);
    } catch (e) {
      next(e);
      console.log(e);
    }
  }
}
export const ordersController = new OrdersController();
