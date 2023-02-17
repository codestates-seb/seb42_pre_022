import GlobalStyle from "./Styles/GlobalStyle";
import Questions from "./Pages/Questions";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import Aside from "./Components/Aside";

function App() {
  return (
    <div className="app-wrap">
      <GlobalStyle />
      <Header />
      <div className="wrap">
        <Nav />
        <div className="content">
          <Questions />
          <Aside />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
