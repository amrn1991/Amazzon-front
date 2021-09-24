import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// const cartItems = Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [];

const ShippingSlice = createSlice({
  name: "shipping",
  initialState: { },
  reducers: {
    itemAdded: (state, action) => {
      const index = state.cart.findIndex(
        (x) => x.product === action.payload.product
      );

      if (index >= 0) {
        state.cart[index] = action.payload;
      } else {
        state.cart.push(action.payload);
      }
    },
    itemRemoved: (state, action) => {
      state.cart = state.cart.filter((x) => x.product !== action.payload);
    },
    cartError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const addCartItem = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch(
      itemAdded({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      })
    );
    const {
      cartList: { cart },
    } = getState();
    Cookies.set("cartItems", JSON.stringify(cart), { secure: true });
  } catch (error) {
    dispatch(cartError(error.message));
  }
};

export const { itemAdded, itemRemoved, cartError } = cartSlice.actions;
export default cartSlice.reducer;
