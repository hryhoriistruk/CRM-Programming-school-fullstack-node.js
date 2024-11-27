import { IOrder } from "../types/orders.type";

export class OrdersPressenter {
  public static orderToResponse(order: IOrder) {
    return {
      name: order.name,
      surname: order.surname,
      email: order.email,
      phone: order.phone,
      age: order.age,
      course: order.course,
      course_format: order.course_format,
      course_type: order.course_type,
      sum: order.sum,
      already_paid: order.already_paid,
      created_at: order.created_at,
      utm: order.utm,
      msg: order.msg,
      status: order.status,
    };
  }
}
