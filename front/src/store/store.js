import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Reducers/loginReducer";
import askquestionReducer from "../Reducers/askquestionReducer";

const store = configureStore({
  reducer: {
    loginReducer,
    askquestionReducer,
  }
})

export default store;