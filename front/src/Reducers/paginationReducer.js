import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  currentpage : 1,
  pagesize : 3,
  totalpage : 30,
}


const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers : {
    selectPagesize : (state, action) => {
      state.pagesize = action.payload
    },
    selectPage : (state, action) => {
      state.currentpage = action.payload
    },
    setTotalPage : (state, action) => {
      state.totalpage = action.payload
    },
    gotoNext : (state) => {
      state.currentpage += 1
    },
    gotoPrev : (state) => {
      state.currentpage -= 1
    }
  }
})

export const {selectPage, selectPagesize, setTotalPage, gotoNext, gotoPrev} = pageSlice.actions
export default pageSlice.reducer

