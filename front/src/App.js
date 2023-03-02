import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyle";
import Questions from "./Pages/Questions";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Askquestion from "./Pages/Askquestion";
import Question from "./Pages/Question";
import Users from "./Pages/Users";
import EditPost from "./Pages/EditPost";
import Mypage from "./Pages/Mypage";
import Token from "./Pages/Token";
import HelmetTitle from "./Components/HelmetTitle";
import { useSelector } from "react-redux";
import { loginInfoActions } from "./Reducers/loginInfoReducer";
import getUserInfo from "./util/getUserInfo";
import ErrorPage from "./Pages/ErrorPage";
import Tags from "./Pages/Tags";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.loginInfoReducer);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !userInfo?.userId) {
      getUserInfo()
      .then(userInfo => {
        const actions = {}
        if (userInfo) {
          actions.login = true
          actions.userInfo = userInfo
          dispatch(loginInfoActions.changeLoginInfo(actions))
        } else {
          localStorage.removeItem("accessToken");
        }
      })
    }
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app-wrap">
      <GlobalStyle />
      <HelmetTitle title="Stack Overflow - Where Developers Learn, Share, & Build Careers" />
      <Header />
      <div className="wrap">
        <div className="container">
          {(pathname === "/users/login" || pathname === "/users/signup" || pathname === "/askquestion") ? null : <Nav />}
          <Routes>
            <Route path="/" element={<Questions />} />
            <Route path="/questions/:question_id" element={<Question />} />
            <Route path="/questions/:id/edit" element={<EditPost />} />
            <Route path="/answers/:id/edit" element={<EditPost />} />
            <Route path="/askquestion" element={<Askquestion />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Signup />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/mypage" element={<Mypage />} />
            <Route path="/users/:userid" element={<Mypage />} />
            <Route path="/token" element={<Token />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </div>
        {(pathname === "/users/login" || pathname === "/users/signup") ? null : <Footer />}
      </div>
    </div>
  );
}

export default App;