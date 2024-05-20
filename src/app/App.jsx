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
import Author from "../pages/Author";

// Atoms
import { authAtom, isLoggedInAtom } from "./atoms";
import { useAtomValue } from "jotai";

function App() {
  const auth = useAtomValue(authAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/author/:id" element={<Author />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
