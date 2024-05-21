import { Request, Response } from "express";
import { ProductController } from "./product.controller";
import { Router } from "express";

const router: Router = Router();
const productController: ProductController = new ProductController();

// Define routes
router.post("/create-product", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);
router.put(
  "/:productId",
  (req: Request<{ productId: string }, any, any, any>, res: Response) => {
    productController.updateProductById(req, res);
  }
);
router.delete(
  "/:productId",
  (req: Request<{ productId: string }, any, any, any>, res: Response) => {
    productController.deleteProductById(req, res);
  }
);

export const ProductRoutes: Router = router;
