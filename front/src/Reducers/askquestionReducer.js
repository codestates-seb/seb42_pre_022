import { createSlice } from "@reduxjs/toolkit";
let initialState = {titleValue: "", questionValue: "", tags: []};

const askquestionSlice = createSlice({
  name: 'askquestion',
  initialState,
  reducers: {
    changeTitleValue: (state, action) => {
      state.titleValue = action.payload.data;
    },
    changeQuestionValue: (state, action) => {
      state.questionValue = action.payload.data;
    },
    addTag: (state, action) => {
      console.log(action.payload.data);
      const tagValue = action.payload.data;
      if(tagValue !== "" && !state.tags.includes(tagValue)) {
        state.tags.push(tagValue);
      }
    },
    removeTag: (state, action) => {
      state.tags = state.tags.filter((el, idx) => idx !== action.payload.indexToRemove)
    }
  }
})

export const askquestionActions = askquestionSlice.actions
export default askquestionSlice.reducer