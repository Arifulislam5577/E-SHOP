import {
  FEATCH_PRODUCT_SUCCESS,
  FEATCH_PRODUCT_REQUEST,
  FEATCH_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../constants/constants";
import axios from "axios";

export const productAction =
  (category = "", keyword = "", page = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: FEATCH_PRODUCT_REQUEST });
      let api = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${page}`;
      if (category) {
        api = `http://localhost:5000/api/v1/products?category=${category}`;
      }
      const { data } = await axios.get(api);
      dispatch({ type: FEATCH_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FEATCH_PRODUCT_FAIL,
        payload: (error.message = "product not found"),
      });
    }
  };

export const ProductDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/products/${id}`
    );

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: (error.message = "product not found"),
    });
  }
};

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/v1/products/${id}`
  );

  dispatch({
    type: ADD_TO_CART,
    payload: {
      _id: data._id,
      name: data.name,
      price: data.price,
      img: data.img,
      stock: data.stock,
      star: data.star,
      starCount: data.starCount,
      features: data.features,
      category: data.category,
      qty,
    },
  });

  localStorage.setItem("InCart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: id });
  localStorage.setItem("InCart", JSON.stringify(getState().cart.cartItems));
};
