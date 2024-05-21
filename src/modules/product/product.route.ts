import express, { Router } from "express";
import { ProductController } from "./product.controller";
import { Request } from "express";
const router: Router = express.Router();

const productController: ProductController = new ProductController();

// Define routes
router.post("/create-product", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);
router.put("/:productId", (req: Request, res) => {
  productController.updateProductById(req, res);
});
export const ProductRoutes: Router = router;
