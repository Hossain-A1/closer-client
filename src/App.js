import { Routes, Route, Navigate } from "react-router-dom";
import Navber from "./components/Navber";
import Footer from "./components/Footer";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { useUserContext } from "./hooks/useUserContext";

function App() {
  const { user } = useUserContext();
  return (
    <div className="app">
      <Navber />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
