import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import { configs } from "./config/configs";
import { swaggerSpec } from "./config/swagger";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";
import { orderRouter } from "./routers/orders.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3001",
  }),
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/orders", orderRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err?.status || 500).json({
      message: err?.message,
      status: err?.status,
    });
  },
);

const PORT = 3000;
app.listen(PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${PORT}`);
});
