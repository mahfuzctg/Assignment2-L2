import { Request, Response } from "express";
import { ProductModel, Product } from "./product.model";

type CreateProductResponse = Response<{
  success: boolean;
  message: string;
  data?: Product;
}>;

export class ProductController {
  // ===== Create Product
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, price, category, tags, variants, inventory } =
        req.body;

      const newProduct: Product = new ProductModel({
        name,
        description,
        price,
        category,
        tags,
        variants,
        inventory,
      });

      const savedProduct: Product = await newProduct.save();

      res.status(201).json({
        success: true,
        message: "Product created successfully!",
        data: savedProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create product",
      });
    }
  }

  // ========= Get All Products ============
  async getAllProducts(
    req: Request,
    res: Response<{ success: boolean; message: string; data?: Product[] }>
  ): Promise<void> {
    try {
      const products: Product[] = await ProductModel.find();

      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: products,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
      });
    }
  }

  // ======= Get Product By ID ===========
  async getProductById(
    req: Request<{ productId: string }, any, any>,
    res: Response<{
      success: boolean;
      message: string;
      data?: Product | undefined;
      error?: string;
    }>
  ): Promise<void> {
    try {
      const productId = req.params.productId;

      const product: Product | null = await ProductModel.findById(productId);

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: product,
      });
    } catch (error) {
      const errorMessage = error as string;

      res.status(500).json({
        success: false,
        message: "Failed to fetch product",
        error: errorMessage,
      });
    }
  }
  //==== Update Product Information by ID

  async updateProductById(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId;
      const updatedProductData: Product = req.body;

      const updatedProduct: Product | null =
        await ProductModel.findByIdAndUpdate(productId, updatedProductData, {
          new: true,
        });

      if (!updatedProduct) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: updatedProduct,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to update product",
        error: error.message,
      });
    }
  }
  // ===== Delete Product by ID ========
  async deleteProductById(
    req: Request<{ productId: string }, any, any>,
    res: Response<{
      success: boolean;
      message: string;
      data?: Product | undefined;
    }>
  ): Promise<void> {
    try {
      const productId = req.params.productId;

      const deletedProduct: Product | null =
        await ProductModel.findByIdAndDelete(productId);

      if (!deletedProduct) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: deletedProduct,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to delete product",
        error: error.message,
      });
    }
  }
}
