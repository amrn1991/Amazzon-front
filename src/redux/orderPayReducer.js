import { createSlice } from "@reduxjs/toolkit";
import { orderReset } from "./orderDetailsReducer";
import axios from "axios";

const orderPaySlice = createSlice({
  name: "orderPay",
  initialState: {},
  reducers: {
    orderPayRequest: (state) => {
      state.loading = true;
    },
    orderPaySuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    orderPayError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderPayReset: (state, action) => {
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },
});

export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch(orderPayRequest({ order, paymentResult }));
    const {
      usersList: { usersInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: {
            Authorization: `Bearer${usersInfo.token}`,
          },
        }
      );
      dispatch(orderPaySuccess(data));
    } catch (error) {
      const log =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(orderPayError(log));
    }
  };

export const {
  orderPayRequest,
  orderPaySuccess,
  orderPayError,
  orderPayReset,
} = orderPaySlice.actions;
export default orderPaySlice.reducer;
