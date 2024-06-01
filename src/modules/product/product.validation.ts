import Joi from "joi";
import { TProduct } from "./product.interface";

const productValidationSchema = Joi.object<TProduct>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  variants: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().required(),
        value: Joi.string().required(),
      })
    )
    .required(),
  inventory: Joi.object({
    quantity: Joi.number().required(),
    inStock: Joi.boolean().required(),
  }).required(),
});

export default productValidationSchema;
