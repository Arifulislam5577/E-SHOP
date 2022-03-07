import express from "express";
import {
  getAllProducts,
  getProductId,
} from "../controllers/productControllers.js";
const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:id").get(getProductId);

export default router;
