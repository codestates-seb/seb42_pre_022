import { createSlice } from "@reduxjs/toolkit";
let initialState = {login : false, userInfo : {}};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeLogin: (state, action) => {
      state.login = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    }
  }
})

export const loginActions = loginSlice.actions
export default loginSlice.reducer