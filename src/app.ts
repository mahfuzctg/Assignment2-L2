import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./modules/product/product.route";
import { ProductController } from "./modules/product/product.controller";
import { OrderModel } from "./modules/order/order.model";

const app: Application = express();
const productController: ProductController = new ProductController();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/products", ProductRoutes);

// Delete a product by ID
app.delete("/api/products/:productId", async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);
  // Add logic for deleting the product
  res.send("Product deletion logic goes here");
});

// Search endpoint to search products by name, description, and category
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const searchTerm: string = req.query.searchTerm as string; // Extract the search term from query parameters
    const products = await productController.searchProducts(searchTerm); // Call the searchProducts method in ProductController

    if (products.length === 0) {
      // No products found with the specified name
      return res.status(404).json({
        success: false,
        message: `No products matching search term '${searchTerm}' found.`,
        data: null,
      });
    }

    // Products found with the specified name
    res.status(200).json({
      success: true,
      message: `${searchTerm} fetched successfully!`,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ============== Create a new order ==============
app.post("/api/orders", async (req: Request, res: Response) => {
  try {
    // Extract order data from request body
    const { email, productId, price, quantity } = req.body;

    // Validate request body
    if (!email || !productId || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields in request body",
      });
    }

    // Create a new order document
    const newOrder = new OrderModel({ email, productId, price, quantity });

    // Save the order document to the database
    const savedOrder = await newOrder.save();

    // Return a success response
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

// Retrieve all orders
app.get("/api/orders", async (req: Request, res: Response) => {
  try {
    // Fetch all orders from the database
    const orders = await OrderModel.find({});

    // Send the response
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Retrieve Orders by User Email
app.get("/api/orders", async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email parameter is required",
      });
    }

    //========= Retrieve orders from MongoDB for the specified email
    const orders = await OrderModel.find({ email: email as string });

    res.status(200).json({
      success: true,
      message: `Orders fetched successfully for user ${email}!`,
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Example controller for root route
const getAController = (req: Request, res: Response) => {
  res.send("Helloooo");
};

// Route for root URL
app.get("/", getAController);

export default app;
