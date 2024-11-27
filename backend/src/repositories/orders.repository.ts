import { Orders } from "../models/orders.models";
import { IOrder } from "../types/orders.type";
import { IPaginationResponse, IQuery } from "../types/pagination.type";
class OrdersRepository {
  public async updateAllWithId(): Promise<any> {
    const orders = await Orders.find({});

    await Promise.all(
      orders.map(async (order, index) => {
        order.id = index + 1;
        await order.save();
      }),
    );
  }

  public async getMany(query: IQuery): Promise<IPaginationResponse<IOrder>> {
    const {
      page = 1,
      limit = 25,
      sortedBy = "id",
      order = "asc",
      ...searchObject
    } = query;
    const skip = +limit * (+page - 1);

    //  сортування  ASC/DESC
    const sortOrder = order === "desc" ? -1 : 1;

    const orders = (await Orders.find(searchObject)
      .limit(limit)
      .sort({ [sortedBy]: sortOrder })
      .skip(skip)
      .lean()) as unknown as IOrder;

    const itemsFound = await Orders.countDocuments(searchObject);

    return {
      page: +page,
      limit: +limit,
      itemsFound,
      data: orders,
    };
  }
}
export const ordersRepository = new OrdersRepository();
