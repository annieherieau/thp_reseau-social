// external
import { Routes, Route } from "react-router-dom";

// App components
import Header from "../components/Header";
import Footer from "../components/Footer";

// App pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import User from "../pages/User";

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
