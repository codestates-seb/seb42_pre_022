import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  userId:null,
  email:null,
  displayName:null,
  profileImage:null,
  reputation:null,
};

const UserInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      state.userId= action.payload.userId
      state.email= action.payload.email
      state.displayName= action.payload.displayName
      state.profileImage= action.payload.profileImage
      state.reputation= action.payload.reputation
    },
  }
})

export const {saveUserInfo} = UserInfoSlice.actions
export default UserInfoSlice.reducer