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


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/profile/:authorId" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
      </>
  );
}

export default App;
