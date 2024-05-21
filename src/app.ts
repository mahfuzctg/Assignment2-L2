import cors from "cors";
import express, { Application, Request, Response } from "express";
import { ProductRoutes } from "./modules/product/product.route";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/products", ProductRoutes);

// DELETE endpoint to delete a product by ID
app.delete("/api/products/:productId", async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);
  // Add your logic here to delete the product by its ID
  res.send("Product deletion logic goes here");
});

// Example controller for root route
const getAController = (req: Request, res: Response) => {
  res.send("Helloooo");
};

// Route for root URL
app.get("/", getAController);

export default app;
