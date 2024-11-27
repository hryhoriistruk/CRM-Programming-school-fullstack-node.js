import { ordersRepository } from "../repositories/orders.repository";
import { IOrder } from "../types/orders.type";
import { IQuery } from "../types/pagination.type";

class OrdersServices {
  public async getAll(): Promise<IOrder[]> {
    return await ordersRepository.updateAllWithId();
  }
  public async getMany(query: IQuery) {
    const queryString = JSON.stringify(query);
    const queryObject = JSON.parse(
      queryString.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    );
    const OrderPagination = await ordersRepository.getMany(queryObject);

    return OrderPagination;
  }
}
export const orderServices = new OrdersServices();
