// inventory.model.ts
import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Inventory entity
export interface InventoryItem {
  productId: string;
  quantity: number;
  inStock: boolean;
}

// Define the schema for the Inventory entity
const InventorySchema: Schema = new Schema({
  productId: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// Define the Inventory model based on the Inventory interface and schema
const InventoryModel = mongoose.model<InventoryItem & Document>(
  "Inventory",
  InventorySchema
);

// Define the Inventory class with static methods
class Inventory {
  static async getAvailableQuantity(productId: string): Promise<number> {
    try {
      // Retrieve inventory document from the database
      const inventoryItem = await InventoryModel.findOne({ productId });

      // If inventory item not found, return 0
      if (!inventoryItem) return 0;

      return inventoryItem.quantity;
    } catch (error) {
      // Handle errors appropriately
      console.error("Error while fetching available quantity:", error);
      throw error; // Propagate error to caller
    }
  }

  static async updateInventory(
    productId: string,
    quantity: number,
    inStock: boolean
  ): Promise<void> {
    try {
      // Update inventory document in the database
      await InventoryModel.updateOne(
        { productId },
        { quantity, inStock },
        { upsert: true } // Create new document if not exists
      );

      console.log(
        `Inventory updated for product ${productId}: Quantity - ${quantity}, In stock - ${inStock}`
      );
    } catch (error) {
      // Handle errors appropriately
      console.error("Error while updating inventory:", error);
      throw error; // Propagate error to caller
    }
  }
}

export default Inventory; // Export the Inventory class
