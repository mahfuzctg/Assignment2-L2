import express from "express";
import { productControllers } from "./product.controller";

const router = express.Router();
// ====== product creating route =======
router.post("/products", productControllers.createProduct);
// ========== all product and searching route =========
router.get("/products", productControllers.getAllProducts);
// ========  get product by id ==========
router.get("/products/:productId", productControllers.getProductById);
// ======== put/update product by id ========
router.put("/products/:productId", productControllers.updateProductById);
// ========= delete product by id ========
router.delete("/products/:productId", productControllers.deleteProductById);

export const ProductRoutes = router;
