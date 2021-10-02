import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ordersSlice = createSlice({
  name: "order",
  initialState: {},
  reducers: {
    orderRequest: (state) => {
      state.loading = true;
    },
    orderSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    orderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderEmpty: (state) => {
      state.success = false;
      state.loading = false;
      state.order = {};
    },
  },
});

export const createOrder = (ordered) => async (dispatch, getState) => {
  dispatch(orderRequest());
  try {
    const {
      usersList: { usersInfo },
    } = getState();

    const { data } = await axios.post("/api/orders", ordered, {
      headers: {
        Authorization: `Bearer${usersInfo.token}`,
      },
    });

    dispatch(orderSuccess(data.data));
    //dispatch(orderEmpty());
  } catch (error) {
    const log =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(orderFail(log));
  }
};

export const { orderFail, orderRequest, orderSuccess, orderEmpty } =
  ordersSlice.actions;
export default ordersSlice.reducer;
