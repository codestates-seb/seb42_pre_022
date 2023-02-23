import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Reducers/loginReducer";
import askquestionReducer from "../Reducers/askquestionReducer";
import filterquestionReducer from "../Reducers/filterquestionReducer";
import signupReducer from "../Reducers/signupReducer";

const store = configureStore({
  reducer: {
    loginReducer,
    askquestionReducer,
    filter: filterquestionReducer,
    signupReducer,
  }
})

export default store;