import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  newest: true,
  highestscore: false,
  unanswered: false,
  tags: [],
  user: '',
  answerCount: null,
  isSearched:false,
  searchedBy: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filteringBy: (state, action) => {
      // state=initialState
      // 가 작동안하는 이유는 순수함수만 가능해서 ?
      state.isSearched=false
      state.newest= false
      state.highestscore= false
      state.unanswered= false
      state.tags= []
      state.user= ''
      state.answerCount= null
      state[action.payload]= true
    },
    customfilter: (state, action) => {
      //state = action.payload 로 통째로 바꿔버리면 작동 안함
      state.isSearched=false
      state.newest = action.payload.newest
      state.highestscore = action.payload.highestscore
      state.unanswered = action.payload.unanswered
      state.tags = action.payload.tags
    },
    searchBarfilter: (state,action) => {
      state.isSearched=true
      let text = action.payload
      console.log(text)
      if(text.slice(0,5) === "[tag]"){
        state.tags = [text.slice(5,text.length)]
        state.searchedBy = [text.slice(5,text.length)]
      } else if(text.slice(0,5) === "user:"){
        state.user = text.slice(5,text.length)
        state.searchedBy = text
      } else if(text.slice(0,8) === "answers:"){
        state.answerCount = Number(text.slice(8,text.length))
        state.searchedBy = "answers>="+Number(text.slice(8,text.length))
      }
    },
}})

export const { filteringBy, customfilter, searchBarfilter } = filterSlice.actions
export default filterSlice.reducer
