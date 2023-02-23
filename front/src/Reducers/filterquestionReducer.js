import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  newest: true,
  highestscore: false,
  unanswered: false,
  tag: 0,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filteringBy: (state, action) => {
      state.newest=false
      state.unanswered=false
      state[action.payload]= true
    },
    customfilter: (state, action) => {
      if(action.payload === 'newest' || action.payload === 'highestscore'){
        state.newest = false
        state.highestscore = false
      }
      state[action.payload] = !state[action.payload]
    }
  }

})

export const { filteringBy, customfilter } = filterSlice.actions
export default filterSlice.reducer
