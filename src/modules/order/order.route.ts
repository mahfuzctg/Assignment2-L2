import express, { Request, Response } from "express";
import { OrderModel } from "./order.model"; // Import the Order model

const router = express.Router();

// POST endpoint to create a new order
router.post("/api/orders", async (req: Request, res: Response) => {
  try {
    const { email, productId, price, quantity } = req.body;

    // Validate request body
    if (!email || !productId || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields in request body",
      });
    }

    // Create a new order
    const newOrder = new OrderModel({ email, productId, price, quantity });
    const savedOrder = await newOrder.save();

    // Respond with success message and the created order
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: savedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export { router as orderRoutes };
