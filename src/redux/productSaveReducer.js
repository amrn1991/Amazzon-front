import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSaveSlice = createSlice({
  name: "productSave",
  initialState: { product: {} },
  reducers: {
    productSaveRequest: (state) => {
      state.loading = true;
      state.success = false;
    },
    productSaveSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.success = true;
    },
    productSaveError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(productSaveRequest());
    const {
      usersList: { usersInfo },
    } = getState();

    if (!product._id) {
      const { data } = await axios.post("/api/products", product, {
        headers: { Authorization: "Bearer" + usersInfo.token },
      });
      dispatch(productSaveSuccess(data));
    } else {
      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        {
          headers: { Authorization: "Bearer" + usersInfo.token },
        }
      );
      dispatch(productSaveSuccess(data));
    }
  } catch (error) {
    dispatch(productSaveError(error.message));
  }
};

export const { productSaveError, productSaveRequest, productSaveSuccess } =
  productSaveSlice.actions;
export default productSaveSlice.reducer;
