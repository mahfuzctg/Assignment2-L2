import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderValidationSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const { error, value } = orderValidationSchema.validate(order);
    const result = await OrderServices.createOrderIntoDb(value);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      // error: error.message,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await OrderServices.getAllOrdersFromDb(email as string);

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (email) {
      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
