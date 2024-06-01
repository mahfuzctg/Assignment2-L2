import { Request, Response } from "express";

import { productServices } from "./product.service";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const { error, value } = productValidationSchema.validate(product);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.details,
      });
    }

    const result = await productServices.createProductIntoDb(value);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await productServices.getProductsFromDb(
      searchTerm as string
    );
    if (searchTerm && result.length > 0) {
      return res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    } else if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Matching product not available!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getProductByIdFromDb(productId);
    if (!result) {
      res.status(200).json({
        success: false,
        message: "Product Not Found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = req.body;
    const { error, value } = productValidationSchema.validate(product);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.details,
      });
    }

    const result = await productServices.updateProductFromDbById(
      productId,
      value
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProductByIdFromDb(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
