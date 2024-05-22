import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";

// Define the interface for the Order entity
interface Order {
  email: string;
  productId: mongoose.Types.ObjectId;
  price: number;
  quantity: number;
}

// Define the schema for the Order entity
const OrderSchema: Schema = new Schema({
  email: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Define the Order model based on the Order interface and schema
const OrderModel = mongoose.model<Order & Document>("Order", OrderSchema);

// Define Joi schema for order creation
const orderCreationSchema = Joi.object({
  email: Joi.string().email().required(),
  productId: Joi.string().required(), // Assuming productId is a string for simplicity
  price: Joi.number().required(),
  quantity: Joi.number().integer().min(1).required(),
});

export { Order, OrderModel, orderCreationSchema };
