import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: [true, "Please use your product image"],
  },
  category: {
    type: String,
    required: [true, "Please select a category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter stock product"],
  },
  star: {
    type: Number,
    default: 0,
  },
  starCount: {
    type: Number,
    default: 0,
  },
  features: [
    {
      description: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
});

const PRODUCT = model("product", productSchema);

export default PRODUCT;
