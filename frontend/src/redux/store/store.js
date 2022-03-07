import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  addToCartReducers,
  productDetailsReducers,
  productReducers,
} from "../reducers/productReducers";
import {
  userLoginReducers,
  userSignUpReducers,
  userDetailsReducers,
} from "../reducers/userReducers";

const rootReducer = combineReducers({
  productList: productReducers,
  productDetails: productDetailsReducers,
  cart: addToCartReducers,
  userSignUp: userSignUpReducers,
  userLogIn: userLoginReducers,
  userDetails: userDetailsReducers,
});

const getCartItemsFromStorage = localStorage.getItem("InCart")
  ? JSON.parse(localStorage.getItem("InCart"))
  : [];
const getUserInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: getCartItemsFromStorage },
  userLogIn: { userInfo: getUserInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
