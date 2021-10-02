import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const loggedInUser = Cookies.get("usersInfo")
  ? JSON.parse(Cookies.get("usersInfo"))
  : null;

const usersSlice = createSlice({
  name: "users",
  initialState: { usersInfo: loggedInUser },
  reducers: {
    usersRequest: (state) => {
      state.loading = true;
    },
    usersSuccess: (state, action) => {
      state.usersInfo = action.payload;
      state.loading = false;
    },
    usersFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    userSignout: (state) => {
      state.usersInfo = null;
    },
  },
});

export const signinHandle = (email, password) => async (dispatch) => {
  try {
    dispatch(usersRequest());
    const { data } = await axios.post("/api/users/signin", {
      email: email,
      password: password,
    });
    dispatch(usersSuccess(data));
    Cookies.set("usersInfo", JSON.stringify(data), {
      secure: true,
      expires: 0.5,
    });
  } catch (error) {
    const log =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    dispatch(usersFail(log));
  }
};

export const signoutHandle = () => (dispatch) => {
  Cookies.remove("usersInfo");
  dispatch(userSignout());
};

export const { usersRequest, usersSuccess, usersFail, userSignout } =
  usersSlice.actions;
export default usersSlice.reducer;
