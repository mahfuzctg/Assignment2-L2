import cors from "cors";
import express, { Application, Request, Response } from "express";
import { OrderRoutes } from "./modules/order/order.route";
import { ProductRoutes } from "./modules/product/product.route";

const app: Application = express();

// ===== parser ======
app.use(express.json());
app.use(cors());

// ======== application routes =======
app.use("/api", ProductRoutes);
app.use("/api", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running properly!");
});

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
