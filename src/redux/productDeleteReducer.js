import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const deleteSlice = createSlice({
  name: "deleteProducts",
  initialState: {product:{}},
  reducers: {
    productDelRequest: (state) => {
      state.loading = true;
      state.success = false;
    },
    productDelSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.success = true;
    },
    productDelError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const {
      usersList: { usersInfo },
    } = getState();
    dispatch(productDelRequest());
    const { data } = await axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: "Bearer" + usersInfo.token },
    });
    dispatch(productDelSuccess(data));
  } catch (error) {
    dispatch(productDelSuccess(error.message));
  }
};

export const { productDelError, productDelRequest, productDelSuccess } =
  deleteSlice.actions;
export default deleteSlice.reducer;
