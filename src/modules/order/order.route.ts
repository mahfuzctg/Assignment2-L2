import express, { Request, Response } from "express";
import { orderCreationSchema } from "./order.model";
import Inventory from "./inventory.model";

const router = express.Router();

router.post("/api/orders", async (req: Request, res: Response) => {
  try {
    // Validate request body against schema
    const { error } = orderCreationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Extract order details from request body
    const { productId, quantity } = req.body;

    // Retrieve available quantity from inventory
    const availableQuantity = await Inventory.getAvailableQuantity(productId);

    // Check if the order can be fulfilled
    if (quantity > availableQuantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    // Update the inventory
    const updatedQuantity = availableQuantity - quantity;
    const inStock = updatedQuantity > 0;

    await Inventory.updateInventory(productId, updatedQuantity, inStock);

    // Proceed with creating the order (e.g., saving order to database)

    res.status(201).json({
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Error while processing order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
