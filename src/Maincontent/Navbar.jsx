import { NavLink } from "react-router-dom";

export default function Navbar() {
  const style = ({ isActive }) => ({
    color: isActive ? "#d9622b" : "black",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
  });

  return (
    <nav style={{ display: "flex", gap: 15, padding: 12 }}>
      <NavLink to="/" style={style}>Home</NavLink>
      <NavLink to="/about" style={style}>About</NavLink>
      <NavLink to="/contact" style={style}>Contact</NavLink>
      <NavLink to="/login" style={style}>Login</NavLink>
    </nav>
  );
}