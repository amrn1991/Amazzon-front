import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {order: {} ,loading: true},
  reducers: {
    orderDetailRequest: (state) => {
      state.loading = true;
    },
    orderDetailSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    orderDetailError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const orderDetails = (orderId) => async (dispatch, getState) => {
  dispatch(orderDetailRequest());
  const {
    usersList: { usersInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer${usersInfo.token}`,
      },
    });
    dispatch(orderDetailSuccess(data));
  } catch (error) {
    const log =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(orderDetailError(log));
  }
};

export const { orderDetailRequest, orderDetailSuccess, orderDetailError } =
  orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
