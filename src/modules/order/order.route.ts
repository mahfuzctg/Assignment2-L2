import express, { Request, Response } from "express";
import { orderCreationSchema } from "./order.model";
import { ProductModel } from "../product/product.model";
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

    try {
      // Retrieve product from database
      const product = await ProductModel.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Check if the product has enough quantity
      if (quantity > product.inventory.quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient quantity available in inventory",
        });
      }

      // Update inventory
      const updatedQuantity = product.inventory.quantity - quantity;
      const inStock = updatedQuantity > 0;

      await ProductModel.findByIdAndUpdate(productId, {
        inventory: { quantity: updatedQuantity, inStock },
      });

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
  } catch (error) {
    console.error("Error while processing order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
