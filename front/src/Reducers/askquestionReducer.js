import { createSlice } from "@reduxjs/toolkit";
// 이렇게 설정하면 tag빼고는 보존이 가능
let initialState = {
  titleValue: JSON.parse(localStorage.getItem("titleValue")) === null ? "" : JSON.parse(localStorage.getItem("titleValue")),
  questionValue: JSON.parse(localStorage.getItem("questionValue")) === null ? "" : JSON.parse(localStorage.getItem("questionValue")),
  tagList: [],
};

const askquestionSlice = createSlice({
  name: 'askquestion',
  initialState,
  reducers: {
    changeTitleValue: (state, action) => {
      localStorage.setItem("titleValue", JSON.stringify(action.payload.data));
      state.titleValue = JSON.parse(localStorage.getItem("titleValue"));
    },
    changeQuestionValue: (state, action) => {
      localStorage.setItem("questionValue", JSON.stringify(action.payload.data));
      state.questionValue = JSON.parse(localStorage.getItem("questionValue"));
    },
    addTag: (state, action) => {
      const tagValue = action.payload.data;
      if(tagValue !== "" && !state.tagList.includes(tagValue) && state.tagList.length < 5) {
        state.tagList.push(tagValue);
      }
    },
    removeTag: (state, action) => {
      state.tagList = state.tagList.filter((el, idx) => idx !== action.payload.indexToRemove)
    },
    changeTag: (state, action) => {
      state.tagList = action.payload.tagData;
    }
  }
})

export const askquestionActions = askquestionSlice.actions
export default askquestionSlice.reducer