import { createSlice } from "@reduxjs/toolkit";
// 이렇게 설정하면 tag빼고는 보존이 가능
let initialState = {displaynameValue: "", emailValue: "", passwordValue: "", loginEmail: "", loginPassword:""};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    changeDisplaynameValue: (state, action) => {
      state.displaynameValue = action.payload.data;
    },
    changeEmailValue: (state, action) => {
      state.emailValue = action.payload.data;
    },
    changePasswordValue: (state, action) => {
      state.passwordValue = action.payload.data;
    },
    changeLoginEmail: (state, action) => {
      state.loginEmail = action.payload.data;
    },
    changeLoginPassword: (state, action) => {
      state.loginPassword = action.payload.data;
    },
  }
})

export const signupActions = signupSlice.actions
export default signupSlice.reducer