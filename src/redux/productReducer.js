import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "product",
  initialState: { product: {} },
  reducers: {
    productRequest: (state) => {
      state.loading = true;
    },
    productSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
    },
    productError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const getSingleProduct = (productId) => async (dispatch) => {
  try {
    dispatch(productRequest(productId));
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch(productSuccess(data));
  } catch (error) {
    dispatch(productError(error.message));
  }
};

export const { productRequest, productSuccess, productError } =
  productSlice.actions;
export default productSlice.reducer;
