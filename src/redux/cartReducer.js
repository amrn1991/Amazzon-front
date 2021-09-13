import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
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

export const addCartItem = (productId, qty) => async (dispatch) => {
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
  } catch (error) {
    dispatch(cartError(error.message));
  }
};

export const { itemAdded, itemRemoved, cartError } = cartSlice.actions;
export default cartSlice.reducer;
