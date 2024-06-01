import { ObjectId } from "mongoose";

export type TOrder = {
  email: string;
  productId: ObjectId;
  price: number;
  quantity: number;
};
