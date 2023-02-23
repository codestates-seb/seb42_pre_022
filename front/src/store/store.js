import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Reducers/loginReducer";
import askquestionReducer from "../Reducers/askquestionReducer";
import filterquestionReducer from "../Reducers/filterquestionReducer";
import editPostReducer from "../Reducers/editPostReducer";

const store = configureStore({
  reducer: {
    loginReducer,
    askquestionReducer,
    filter: filterquestionReducer,
    editPostReducer,
  }
})

export default store;