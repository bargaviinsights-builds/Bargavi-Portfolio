import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return setError("Enter a valid email");
    if (password.length < 6) return setError("Password needs 6+ characters");
    navigate("/");                     // go to Home after login
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 10, maxWidth: 300, margin: "20px auto" }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button>Login</button>
    </form>
  );
}