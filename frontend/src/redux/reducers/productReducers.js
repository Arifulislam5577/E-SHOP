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

export const productReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case FEATCH_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case FEATCH_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        result: action.payload.result,
        resultPerPage: action.payload.resultPerPage,
        totalProduct: action.payload.totalProducts,
      };
    case FEATCH_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducers = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: {} };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addToCartReducers = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newProduct = action.payload;

      const exitProduct = state.cartItems.find(
        (pd) => pd._id === newProduct._id
      );
      if (exitProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((pd) =>
            pd._id === exitProduct._id ? newProduct : pd
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newProduct],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((pd) => pd._id !== action.payload),
      };

    default:
      return state;
  }
};
