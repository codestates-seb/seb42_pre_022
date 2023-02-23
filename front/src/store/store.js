import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Reducers/loginReducer";
import askquestionReducer from "../Reducers/askquestionReducer";
import filterquestionReducer from "../Reducers/filterquestionReducer";

const store = configureStore({
  reducer: {
    loginReducer,
    askquestionReducer,
    filter: filterquestionReducer,
  }
})

export default store;