import { Request, Response } from "express";
import { ProductModel, Product } from "./product.model";
import { ParamsDictionary } from "express-serve-static-core";

export class ProductController {
  // ===== Create Product
  async createProduct(
    req: Request<any, any, Partial<Product>>,
    res: Response
  ): Promise<void> {
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
  async getAllProducts(req: Request, res: Response): Promise<void> {
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
    req: Request<ParamsDictionary, any, any>,
    res: Response<{
      success: boolean;
      message: string;
      data?: Product | undefined;
      error?: string;
    }>
  ): Promise<void> {
    try {
      const productId: string = req.params["productId"];

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
      const errorMessage: string = (error as Error).message;

      res.status(500).json({
        success: false,
        message: "Failed to fetch product",
        error: errorMessage,
      });
    }
  }
  //==== Update Product Information by ID

  async updateProductById(
    req: Request<ParamsDictionary, any, Partial<Product>>,
    res: Response
  ): Promise<void> {
    try {
      const productId: string = req.params["productId"];
      const updatedProductData: Partial<Product> = req.body;

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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update product",
        error: (error as Error).message,
      });
    }
  }
  // ===== Delete Product by ID ========
  async deleteProductById(
    req: Request<ParamsDictionary, any, any>,
    res: Response
  ): Promise<void> {
    try {
      const productId: string = req.params["productId"];

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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete product",
        error: (error as Error).message,
      });
    }
  }
  // ========= Search Products ==========
  async searchProducts(searchTerm: string): Promise<Product[]> {
    // Search for products with the exact name matching the searchTerm
    const products: Product[] = await ProductModel.find({
      name: { $regex: new RegExp(`^${searchTerm}$`, "i") },
    });

    if (products.length === 0) {
      throw new Error(`No product with name '${searchTerm}' found.`);
    }

    return products;
  }
}
