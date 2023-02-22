import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  value : "newest"
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filteringBy: (state, action) => {
      state.value = action.payload
    }
  }

})

export const { filteringBy } = filterSlice.actions
export default filterSlice.reducer
