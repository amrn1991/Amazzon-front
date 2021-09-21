import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"


const loggedInUser = Cookies.get("usersInfo")
  ? JSON.parse(Cookies.get("usersInfo"))
  : null ;

const registerSlice = createSlice({
  name: "register",
  initialState: {usersInfo: loggedInUser},
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.usersInfo = action.payload;
      state.loading = false;
    },
    registerFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const { data } = await axios.post("/api/users/register", {
      name: name,
      email: email,
      password: password,
    });
    dispatch(registerSuccess(data));
    Cookies.set("usersInfo", JSON.stringify(data), {
      secure: true,
      expires: 0.5,
    });
  } catch (error) {
    dispatch(registerFail(error.message));
  }
};

export const { registerFail, registerRequest, registerSuccess } =
  registerSlice.actions;
export default registerSlice.reducer;
