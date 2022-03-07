import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import ProductRouter from "./routes/productRouter.js";
import UserRouter from "./routes/userRouter.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();

// Middleware

app.use(express.json());
app.use(cors());
connectDB();

app.use(morgan("tiny"));
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/users", UserRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App running on port " + port);
});
