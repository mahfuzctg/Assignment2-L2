import cors from "cors";
import express, { Application, Request, Response } from "express";
import { ProductRoutes } from "./modules/product/product.route";
import { ProductController } from "./modules/product/product.controller"; // Import ProductController

const app: Application = express();
const productController: ProductController = new ProductController(); // Create an instance of ProductController

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/products", ProductRoutes);

// ====== delete a product by ID ========
app.delete("/api/products/:productId", async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);

  res.send("Product deletion logic goes here");
});

// Search endpoint to search products by name, description, and category
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const searchTerm: string = req.query.searchTerm as string; // Extract the search term from query parameters
    const products = await productController.searchProducts(searchTerm); // Call the searchProducts method in ProductController

    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: products,
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
