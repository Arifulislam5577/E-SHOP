import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  LOG_OUT_USER,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
} from "../constants/constants";

export const userSignUpReducers = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return { loading: true, userInfo: {} };
    case SIGN_UP_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case SIGN_UP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducers = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return { loading: true, userInfo: {} };
    case LOG_IN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case LOG_IN_FAIL:
      return { loading: false, error: action.payload };
    case LOG_OUT_USER:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducers = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
