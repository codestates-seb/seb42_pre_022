import { createSlice } from "@reduxjs/toolkit";
let initialState = {login : false, userInfo : null, accessToken: null};

const loginInfoSlice = createSlice({
  name: 'loginInfo',
  initialState,
  reducers: {
    changeLoginInfo: (state, action) => {
      state.login = action.payload.login;
      state.userInfo = action.payload.userInfo;
    },
  }
})

export const loginInfoActions = loginInfoSlice.actions
export default loginInfoSlice.reducer