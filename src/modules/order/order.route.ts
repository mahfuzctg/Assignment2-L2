// order.route.ts
import express, { Request, Response } from "express";
import { orderCreationSchema } from "./order.model"; // Import the Order model

const router = express.Router();

// POST endpoint to create a new order
router.post("/api/orders", async (req: Request, res: Response) => {
  try {
    const { error } = orderCreationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, productId, price, quantity } = req.body;
    console.log("Email:", email);
    console.log("Product ID:", productId);
    console.log("Price:", price);
    console.log("Quantity:", quantity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export { router as orderRoutes };
