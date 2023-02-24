import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Reducers/loginReducer";
import askquestionReducer from "../Reducers/askquestionReducer";
import filterquestionReducer from "../Reducers/filterquestionReducer";
import signupReducer from "../Reducers/signupReducer";
import editPostReducer from "../Reducers/editPostReducer";
import paginationReducer from "../Reducers/paginationReducer";


const store = configureStore({
  reducer: {
    loginReducer,
    askquestionReducer,
    filter: filterquestionReducer,
    signupReducer,
    editPostReducer,
    pages: paginationReducer,
    
  }
})

export default store;