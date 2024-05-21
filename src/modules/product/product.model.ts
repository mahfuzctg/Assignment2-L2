import { Schema, model, Document } from "mongoose";

// Define Variant interface
export interface Variant {
  type: string;
  value: string;
}

// Define Inventory interface
export interface Inventory {
  quantity: number;
  inStock: boolean;
}

// Define Product interface
export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Variant[];
  inventory: Inventory;
}

// Define Variant schema
const variantSchema = new Schema<Variant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

// Define Inventory schema
const inventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

// Define Product schema
const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [variantSchema],
    required: true,
  },
  inventory: {
    type: inventorySchema,
    required: true,
  },
});

// Create Product model
export const ProductModel = model<Product>("Product", productSchema);
