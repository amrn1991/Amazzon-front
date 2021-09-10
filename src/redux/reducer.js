import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "productList",
  initialState: { products: [] },
  reducers: {
    productListRequest: (state) => {
      state.loading = true;
    },
    productListSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    productListError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const listProducts = () => async (dispatch) => {
  try {
    dispatch(productListRequest());
    const {data} = await axios.get("/api/products");
    dispatch(productListSuccess(data));
  } catch (error) {
    dispatch(productListError(error));
  }
};

export const { productListError, productListRequest, productListSuccess } =
  productSlice.actions;
export default productSlice.reducer;
