import { Routes, Route } from "react-router-dom";
import Navbar from "./Maincontent/Navbar";
import Home from "./Maincontent/Home";
import About from "./Maincontent/About";
import Contact from "./Maincontent/Contact";
import Login from "./Maincontent/Login";
import NotFound from "./Maincontent/NotFound";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}