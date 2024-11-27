import { model, Schema, Types } from "mongoose";

const OrdersModels = new Schema({
  _id: {
    type: Types.ObjectId,
    required: false,
  },
  id: {
    type: Number,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  surname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },

  course: {
    type: String,
    required: false,
  },

  course_format: {
    type: String,
    required: false,
  },
  course_type: {
    type: String,
    required: false,
  },
  sum: {
    type: Boolean,
    default: null,
    required: false,
  },
  already_paid: {
    type: Boolean,
    default: null,
    required: false,
  },
  created_at: {
    type: String,
    required: false,
  },
  utm: {
    type: String,
    required: false,
  },
  msg: {
    type: String,
    default: null,
    required: false,
  },
  status: {
    type: Boolean,
    default: null,
    required: false,
  },
});
export const Orders = model("orders", OrdersModels);
