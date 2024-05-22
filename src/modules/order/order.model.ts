import mongoose, { Schema, Document } from "mongoose";

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
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Define the Order model based on the Order interface and schema
const OrderModel = mongoose.model<Order & Document>("Order", OrderSchema);

export { Order, OrderModel };
