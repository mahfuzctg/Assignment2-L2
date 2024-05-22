import { Request, Response } from "express";
import { ProductController } from "./product.controller";
import { Router } from "express";

// Create an instance of Router
const router: Router = Router();

// Create an instance of ProductController
const productController: ProductController = new ProductController();

// Define routes
router.post("/create-product", async (req: Request, res: Response) => {
  await productController.createProduct(req, res);
});

router.get("/", async (req: Request, res: Response) => {
  await productController.getAllProducts(req, res);
});

router.get("/:productId", async (req: Request, res: Response) => {
  await productController.getProductById(req, res);
});

router.put("/:productId", async (req: Request, res: Response) => {
  await productController.updateProductById(req, res);
});

router.delete("/:productId", async (req: Request, res: Response) => {
  await productController.deleteProductById(req, res);
});

// Export the router
export const ProductRoutes: Router = router;
