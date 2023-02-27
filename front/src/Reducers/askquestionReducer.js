import { createSlice } from "@reduxjs/toolkit";
// 이렇게 설정하면 tag빼고는 보존이 가능
let initialState = {
  titleValue: JSON.parse(sessionStorage.getItem("titleValue")) === null ? "" : JSON.parse(sessionStorage.getItem("titleValue")),
  questionValue: JSON.parse(sessionStorage.getItem("questionValue")) === null ? "" : JSON.parse(sessionStorage.getItem("questionValue")),
  tags: [],
};

const askquestionSlice = createSlice({
  name: 'askquestion',
  initialState,
  reducers: {
    changeTitleValue: (state, action) => {
      sessionStorage.setItem("titleValue", JSON.stringify(action.payload.data));
      state.titleValue = JSON.parse(sessionStorage.getItem("titleValue"));
    },
    changeQuestionValue: (state, action) => {
      sessionStorage.setItem("questionValue", JSON.stringify(action.payload.data));
      state.questionValue = JSON.parse(sessionStorage.getItem("questionValue"));
    },
    addTag: (state, action) => {
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