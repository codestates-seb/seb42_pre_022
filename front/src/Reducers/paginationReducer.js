import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  currentpage : 1,
  pagesize : 3,
  totalpage : 30,
  totalposts: 1,
}


const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers : {
    selectPagesize : (state, action) => {
      state.pagesize = action.payload
      state.totalpage = Math.ceil(state.totalposts/action.payload)
      state.currentpage = 1
    },
    selectPage : (state, action) => {
      state.currentpage = action.payload
    },
    gotoNext : (state) => {
      state.currentpage += 1
    },
    gotoPrev : (state) => {
      state.currentpage -= 1
    },
    setTotalposts: (state, action) => {
      console.log('전체포스트수')
      console.log(action.payload)
      state.totalposts = action.payload
      console.log('페이지사이즈')
      console.log(state.pagesize)
      console.log('전체 페이지수')
      console.log(action.payload/state.pagesize)
      console.log(Math.ceil(action.payload/state.pagesize))
      state.totalpage = Math.ceil(action.payload/state.pagesize)
    }
  }
})

export const {selectPage, selectPagesize, gotoNext, gotoPrev, setTotalposts} = pageSlice.actions
export default pageSlice.reducer

