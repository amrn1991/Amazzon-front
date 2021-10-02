import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const cartItems = Cookies.get("cartItems")
  ? JSON.parse(Cookies.get("cartItems"))
  : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: cartItems, shipping: {} },
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
    cartEmpty: (state) => {
      state.cart = [];
      state.shipping = {};
      state.payment = null;
    },
    shippingSuccess: (state, action) => {
      state.shipping = action.payload;
    },
    paymentSuccess: (state, action) => {
      state.payment = action.payload;
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

export const saveShipping = (info) => (dispatch) => {
  dispatch(shippingSuccess(info));
};

export const savePayment = (info) => (dispatch) => {
  dispatch(paymentSuccess(info));
};

export const emptyCart = () => (dispatch) => {
  Cookies.remove("cartItems");
  dispatch(cartEmpty());
};

export const {
  itemAdded,
  itemRemoved,
  cartError,
  cartEmpty,
  shippingSuccess,
  paymentSuccess,
} = cartSlice.actions;

export default cartSlice.reducer;
