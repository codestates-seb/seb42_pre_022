import GlobalStyle from "./Styles/GlobalStyle";
import Questions from "./Pages/Questions";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
// import Aside from "./Components/Aside";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Askquestion from "./Pages/Askquestion";
import { Routes, Route, useLocation } from "react-router-dom";
import Question from "./Pages/Question";

function App() {

  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className="app-wrap">
      <GlobalStyle />
      <Header />
      <div className="wrap">
        {/* {(String(window.location.href).slice(21) === "/") ? <Nav /> : null} */}
        <div className="container">
        {(pathname === "/users/login" || pathname === "/users/signup" || pathname === "/askquestion") ? null : <Nav />}
          <Routes>
            <Route path="/" element={<Questions />}/>
            <Route path="/askquestion" element={<Askquestion />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Signup />} />
            <Route path="/questions/:question_id" element={<Question />} />
          </Routes>
        </div>
      {/*배포 이후 배포한 주소 길이에 맞게 slice 변경*/}
      {(pathname === "/users/login" || pathname === "/users/signup") ? null : <Footer />}
      </div>
    </div>
  );
}

export default App;