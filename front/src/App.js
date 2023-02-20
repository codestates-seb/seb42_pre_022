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
      <div className="wrap">
        {/* {(String(window.location.href).slice(21) === "/") ? <Nav /> : null} */}
        <Routes>
          <Route path="/"
            element={<>
            <Nav />
            <div className="content">
              <Questions />
              <Aside />
            </div>
            </>}
          />
          <Route path="/askquestion" element={<Askquestion />}/>
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/signup" element={<Signup />} />
        </Routes>
      <Footer />
      </div>
    </div>
  );
}

export default App;
