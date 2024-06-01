import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDb = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getProductsFromDb = async (searchTerm: string) => {
  if (searchTerm) {
    const regex = new RegExp(searchTerm as string, "i");
    const result = await ProductModel.find({
      $or: [{ name: regex }, { description: regex }, { category: regex }],
    });
    return result;
  }
  return await ProductModel.find();
};

const getProductByIdFromDb = async (id: string) => {
  const result = await ProductModel.findById({ _id: id });
  return result;
};

const updateProductFromDbById = async (id: string, product: TProduct) => {
  const result = await ProductModel.findByIdAndUpdate(id, product, {
    new: true,
  });
  return result;
};

const deleteProductByIdFromDb = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

export const productServices = {
  createProductIntoDb,
  getProductsFromDb,
  getProductByIdFromDb,
  updateProductFromDbById,
  deleteProductByIdFromDb,
};
