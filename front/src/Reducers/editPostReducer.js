import { createSlice } from "@reduxjs/toolkit";
let initialState = {editPost: {nowQ: null, nowA: null}};

const editPostSlice = createSlice({
  name: 'editPost',
  initialState,
  reducers: {
    changeNowQ: (state, action) => {
      state.editPost.nowQ = action.payload
    },
    changeNowA: (state, action) => {
      state.editPost.nowA = action.payload
    },
    deleteNowQA: (state, action) => {
      state.editPost.nowQ = null
      state.editPost.nowA = null
    },
  }
})

export const editPostActions = editPostSlice.actions
export default editPostSlice.reducer