import GlobalStyle from "./Styles/GlobalStyle";
import Questions from "./Pages/Questions";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import Aside from "./Components/Aside";

function App() {
  return (
    <>
    <GlobalStyle />
    <Header />
    <Nav />
    <Questions />
    <Aside />
    <Footer />
    </>
  );
}

export default App;
