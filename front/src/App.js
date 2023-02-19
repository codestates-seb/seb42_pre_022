import GlobalStyle from "./Styles/GlobalStyle";
import Questions from "./Pages/Questions";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import Aside from "./Components/Aside";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="app-wrap">
      <GlobalStyle />
      <Header />
      <div className="wrap">
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
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
