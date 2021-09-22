import { combineReducers } from "redux";
import productReducer from "./productReducer";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import usersReducer from "./usersReducer";
import registerReducer from "./registerReducer";
import productSaveReducer from "./productSaveReducer";
import productDeleteReducer from "./productDeleteReducer";

export default combineReducers({
  productsList: productsReducer,
  productDetail: productReducer,
  cartList: cartReducer,
  usersList: usersReducer,
  registerList: registerReducer,
  savedProduct: productSaveReducer,
  deleteProduct: productDeleteReducer
});
