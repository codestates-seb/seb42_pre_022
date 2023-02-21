import GlobalStyle from "./Styles/GlobalStyle";
import Questions from "./Pages/Questions";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import Aside from "./Components/Aside";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Askquestion from "./Pages/Askquestion";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="app-wrap">
      <GlobalStyle />
      <Header />
      <div className="container">
        {/* {(String(window.location.href).slice(21) === "/") ? <Nav /> : null} */}
        <Routes>
          <Route path="/"
            element={<>
            <Nav />
            <div className="content">
              <Questions />
            </div>
            </>}
          />
          <Route path="/askquestion" element={<Askquestion />}/>
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/signup" element={<Signup />} />
        </Routes>
      </div>
      {/*배포 이후 배포한 주소 길이에 맞게 slice 변경*/}
      {(String(window.location.href).slice(21) === "/users/login" || String(window.location.href).slice(21) === "/users/signup") ? null : <Footer />}
    </div>
  );
}

export default App;
