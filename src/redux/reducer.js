import { combineReducers } from "redux";
import productReducer from "./productReducer";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  productsList: productsReducer,
  productDetail: productReducer,
  cartList: cartReducer,
  usersList: usersReducer
});
