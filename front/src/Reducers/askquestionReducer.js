import { createSlice } from "@reduxjs/toolkit";
// 이렇게 설정하면 tag빼고는 보존이 가능
let initialState = {
  titleValue: JSON.parse(localStorage.getItem("titleValue")),
  questionValue: JSON.parse(localStorage.getItem("questionValue")),
  tags: [],
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
      // const tagValue = action.payload.data;
      // if(tagValue !== "" && !state.tags.includes(tagValue)) {
      //   state.tags.push(tagValue);
      // }
      if(localStorage.getItem("tags") === null) {
        localStorage.setItem("tags", JSON.stringify(state.tags));
      }
      const tagValue = action.payload.data;
      if(tagValue !== "" && !state.tags.includes(tagValue)) {
        let storageTag = JSON.parse(localStorage.getItem("tags"));
        localStorage.setItem("tags", JSON.stringify([...storageTag, tagValue]));
        state.tags = JSON.parse(localStorage.getItem("tags"));
      }
    },
    removeTag: (state, action) => {
      state.tags = state.tags.filter((el, idx) => idx !== action.payload.indexToRemove)
    }
  }
})

export const askquestionActions = askquestionSlice.actions
export default askquestionSlice.reducer