import { createSlice } from "@reduxjs/toolkit";
let initialState = {login : false, userInfo : null, accessToken: null};

const loginInfoSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeLoginInfo: (state, action) => {
      state.login = action.payload.login;
      state.userInfo = action.payload.userInfo;
    },
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload
    }
  }
})

export const loginInfoActions = loginInfoSlice.actions
export default loginInfoSlice.reducer