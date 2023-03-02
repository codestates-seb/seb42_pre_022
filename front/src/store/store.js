import { configureStore } from "@reduxjs/toolkit";
import loginInfoReducer from "../Reducers/loginInfoReducer";
import askquestionReducer from "../Reducers/askquestionReducer";
import filterquestionReducer from "../Reducers/filterquestionReducer";
import signupReducer from "../Reducers/signupReducer";
import editPostReducer from "../Reducers/editPostReducer";
import paginationReducer from "../Reducers/paginationReducer";
import otheruserReducer from "../Reducers/otheruserReducer";



const store = configureStore({
  reducer: {
    loginInfoReducer,
    askquestionReducer,
    filter: filterquestionReducer,
    signupReducer,
    editPostReducer,
    pages: paginationReducer,
    otheruser: otheruserReducer,
  }
})

export default store;