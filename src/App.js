import {Routes, Route} from "react-router-dom"
import Navber from "./components/Navber";
import Footer from "./components/Footer";
import Home from "./pages/home";

function App() {
  return <div className="app">
    <Navber/>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
    <Footer/>
  </div>;
}

export default App;
