import PRODUCT from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import ApiFeatures from "../utils/ApiFeatures.js";

export const getAllProducts = expressAsyncHandler(async (req, res) => {
  const totalProducts = await PRODUCT.countDocuments();
  const resultPerPage = 10,
    productsFeatures = new ApiFeatures(PRODUCT.find(), req.query)
      .search()
      .filter()
      .paginate(resultPerPage);

  const products = await productsFeatures.query;
  const result = await products.length;

  if (products.length > 0) {
    return res
      .status(200)
      .json({ totalProducts, resultPerPage, result, products });
  } else {
    return res.status(404).json({ message: "Product Not Found" });
  }
});

export const getProductId = expressAsyncHandler(async (req, res) => {
  const product = await PRODUCT.findById(req.params.id);
  if (product) {
    return res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
