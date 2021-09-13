import { combineReducers } from "redux";
import productReducer from "./productReducer";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  productsList: productsReducer,
  productDetail: productReducer,
  cartList: cartReducer,
});
