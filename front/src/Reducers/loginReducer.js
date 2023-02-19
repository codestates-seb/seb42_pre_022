import { createSlice } from "@reduxjs/toolkit";
let initialState = {login : false};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeLogin: (state, action) => {
      state.login = !state.login
    },
  }
})

export const loginActions = loginSlice.actions
export default loginSlice.reducer