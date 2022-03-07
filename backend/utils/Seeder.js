import PRODUCT from "../models/productModel.js";
import dotenv from "dotenv";
import connectDB from "../config/DB.js";
import { products } from "../data/products.js";
dotenv.config();
connectDB();

const seedProducts = async () => {
  try {
    await PRODUCT.deleteMany();
    console.log("Product deleted");
    await PRODUCT.insertMany(products);
    console.log("Product added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedProducts();
